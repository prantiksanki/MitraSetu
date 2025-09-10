import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Lenis from '@studio-freight/lenis'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Contact from '../components/Contact'


// 3D Torus Knot that animates with scroll
function AnimatedTorusKnot({ scrollY }) {
  const mesh = useRef()
  useFrame(() => {
    if (mesh.current) {
      // Animate rotation and scale based on scrollY
      mesh.current.rotation.x = scrollY / 500
      mesh.current.rotation.y = scrollY / 300
      mesh.current.scale.set(1 + scrollY / 2000, 1 + scrollY / 2000, 1 + scrollY / 2000)
    }
  })
  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
      <meshPhysicalMaterial color="#7f5fff" roughness={0.2} metalness={0.8} clearcoat={1} clearcoatRoughness={0.1} />
    </mesh>
  )
}

// 3D Canvas Background
function ThreeBackground({ scrollY }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 60 }} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <AnimatedTorusKnot scrollY={scrollY} />
      <Environment preset="sunset" />
      {/* Optionally add controls for dev: <OrbitControls /> */}
    </Canvas>
  )
}

export default function Landing() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const lenisRef = useRef(null)

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
      direction: 'vertical',
    })
    lenisRef.current = lenis
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
          lenis.scrollTo(el, { offset: -20, duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 3) });
        }
      }
    };
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', handleAnchorClick);
    });

    // Listen to scroll
    function onScroll() {
      setScrollY(window.scrollY)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? window.scrollY / docHeight : 0)
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.removeEventListener('click', handleAnchorClick);
      });
      lenis.destroy()
    }
  }, [])

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Parallax SVG Gradient Background */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <svg width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="parallaxGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7f5fff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#5fffd7" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          <ellipse cx="960" cy="540" rx="900" ry="400" fill="url(#parallaxGradient)" style={{ transform: `translateY(${scrollY * 0.15}px)` }} />
          <ellipse cx="500" cy="900" rx="400" ry="120" fill="#7f5fff" opacity="0.08" style={{ transform: `translateY(${scrollY * 0.25}px)` }} />
          <ellipse cx="1600" cy="200" rx="300" ry="100" fill="#5fffd7" opacity="0.10" style={{ transform: `translateY(${scrollY * 0.18}px)` }} />
        </svg>
      </div>
      {/* Scroll Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollProgress * 100}%`,
        height: '4px',
        background: 'linear-gradient(90deg, #7f5fff 0%, #5fffd7 100%)',
        zIndex: 100,
        transition: 'width 0.2s cubic-bezier(0.4,0,0.2,1)'
      }} />
      <ThreeBackground scrollY={scrollY} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navigation />
        <Hero />
        <About scrollY={scrollY} />
        <Services scrollY={scrollY} />
        <Contact scrollY={scrollY} />
      </div>
    </div>
  )
}
