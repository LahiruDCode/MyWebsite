import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animFrame;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      animFrame = requestAnimationFrame(animateRing);
    };

    animFrame = requestAnimationFrame(animateRing);
    window.addEventListener('mousemove', onMouseMove);

    // Detect hoverable elements
    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select, .skill-tag, .project-card-3d');
      if (target) setIsHovering(true);
    };

    const onMouseOut = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select, .skill-tag, .project-card-3d');
      if (target) setIsHovering(false);
    };

    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? 'expanded' : ''}`}
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;
