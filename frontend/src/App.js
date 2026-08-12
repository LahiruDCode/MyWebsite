import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 3D Design System
import './components/styles/3d-portfolio.css';

// Component imports
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import GlowOrbs from './components/GlowOrbs';
import CustomCursor from './components/CustomCursor';

// Page imports
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';

// Admin routes
import AdminRoutes from './AdminRoutes';

function App() {
  const [loading, setLoading] = useState(true);

  // Always force dark class for 3D design
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.classList.add('portfolio-3d');
    return () => {
      document.body.classList.remove('portfolio-3d');
    };
  }, []);

  return (
    <Router>
      {/* Global 3D visual elements */}
      <GlowOrbs />
      <CustomCursor />

      <AnimatePresence>
        {loading && <Loader setLoading={setLoading} />}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0b080c', color: '#eae5ec' }}>
        {!loading && (
          <>
            <Header />
            <motion.main
              className="flex-grow container mx-auto px-4 py-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
              </Routes>
            </motion.main>
            <Footer />
          </>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Router>
  );
}

export default App;
