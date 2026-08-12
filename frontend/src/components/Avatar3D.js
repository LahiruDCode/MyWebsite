import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, ContactShadows, useAnimations } from '@react-three/drei';

/* ─── Mouse tracking hook ─── */
function useMouse() {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      // Normalise to -1 … +1
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return mouse;
}

/* ─── The avatar model with head-tracking ─── */
function AvatarModel({ mouse }) {
  const group = useRef();
  const { scene, animations } = useGLTF('/avatar.glb');
  const { actions } = useAnimations(animations, group);

  // Play the built-in animation (idle pose) to fix the T-pose
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstActionName = Object.keys(actions)[0];
      actions[firstActionName].play();
    }
  }, [actions]);

  // Find head/neck bones for mouse tracking
  const headBone = useRef(null);
  const neckBone = useRef(null);
  const spineBone = useRef(null);

  useEffect(() => {
    scene.traverse((obj) => {
      if (!obj.isBone && !obj.isSkinnedMesh) return;
      const name = obj.name.toLowerCase();
      if (name.includes('head')) headBone.current = obj;
      if (name.includes('neck')) neckBone.current = obj;
      if (name.includes('spine') || name.includes('chest')) spineBone.current = obj;
    });

    // Apply dark-theme compatible materials
    scene.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        // Boost emissive slightly for glow effect
        if (obj.material.emissive !== undefined) {
          obj.material.emissiveIntensity = 0.05;
        }
      }
    });
  }, [scene]);

  // Smooth target refs
  const targetHead = useRef({ x: 0, y: 0 });
  const targetNeck = useRef({ x: 0, y: 0 });
  const currentHead = useRef({ x: 0, y: 0 });
  const currentNeck = useRef({ x: 0, y: 0 });

  // Idle float offset
  const clock = useRef(0);

  useFrame((state, delta) => {
    clock.current += delta;

    // ── Idle floating animation ──
    if (group.current) {
      group.current.position.y = Math.sin(clock.current * 0.8) * 0.04;
    }

    // ── Mouse look target ──
    const mx = mouse.current.x;
    const my = mouse.current.y;

    targetHead.current.x = -my * 0.25;  // pitch
    targetHead.current.y = mx * 0.35;   // yaw
    targetNeck.current.x = -my * 0.12;
    targetNeck.current.y = mx * 0.18;

    // ── Smooth lerp ──
    const lerpFactor = 0.06;
    currentHead.current.x += (targetHead.current.x - currentHead.current.x) * lerpFactor;
    currentHead.current.y += (targetHead.current.y - currentHead.current.y) * lerpFactor;
    currentNeck.current.x += (targetNeck.current.x - currentNeck.current.x) * lerpFactor;
    currentNeck.current.y += (targetNeck.current.y - currentNeck.current.y) * lerpFactor;

    // ── Apply rotations ──
    if (headBone.current) {
      headBone.current.rotation.x = currentHead.current.x;
      headBone.current.rotation.y = currentHead.current.y;
    }
    if (neckBone.current) {
      neckBone.current.rotation.x = currentNeck.current.x;
      neckBone.current.rotation.y = currentNeck.current.y;
    }
    if (spineBone.current) {
      spineBone.current.rotation.y = mx * 0.08;
    }
  });

  return (
    <group ref={group}>
      <primitive
        object={scene}
        scale={2.2}
        position={[0, -3.0, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

/* ─── Purple/lavender rim light to match portfolio theme ─── */
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      {/* Key light — soft white from front-left */}
      <directionalLight position={[3, 5, 3]} intensity={1.2} color="#ffffff" />
      {/* Rim light — lavender glow from behind */}
      <pointLight position={[-3, 2, -3]} intensity={1.5} color="#c2a4ff" />
      {/* Pink fill from right */}
      <pointLight position={[4, 0, 1]} intensity={0.8} color="#fb8dff" />
      {/* Subtle purple under-light */}
      <pointLight position={[0, -2, 2]} intensity={0.4} color="#6633ff" />
    </>
  );
}

/* ─── Loading fallback ─── */
function AvatarFallback() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '12px',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '2px solid rgba(194,164,255,0.2)',
        borderTopColor: 'var(--accent)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }} />
      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
        Loading avatar...
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ─── Main exported component ─── */
const Avatar3D = ({ height = '480px' }) => {
  const mouse = useMouse();

  return (
    <div
      style={{
        width: '100%',
        height,
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      {/* Glow backdrop */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 60%, rgba(194,164,255,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <Suspense fallback={<AvatarFallback />}>
        <Canvas
          camera={{ position: [0, 1.2, 2.9], fov: 45 }}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: true }}
          shadows
        >
          <SceneLights />
          <AvatarModel mouse={mouse} />
          <ContactShadows
            position={[0, -3.0, 0]}
            opacity={0.4}
            scale={3}
            blur={2}
            color="#4400aa"
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

// Preload the model
useGLTF.preload('/avatar.glb');

export default Avatar3D;
