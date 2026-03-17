import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { DataProvider } from './context/DataContext';

function ScrollSetup() {
  const location = useLocation();

  useEffect(() => {
    // Disable smooth scroll on admin panel
    if (location.pathname.startsWith('/admin')) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <DataProvider>
      <Router>
        <ScrollSetup />
        <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-purple-500/30">
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={
              <>
                <CustomCursor />
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                  </Routes>
                </main>
              </>
            } />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
