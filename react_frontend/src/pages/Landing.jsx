import React from 'react'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Contact from '../components/Contact'

export default function Landing() {
  return (
    <div>
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Contact />
    </div>
  )
}
