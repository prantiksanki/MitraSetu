import { useState } from 'react'
import {AnimatePresence, motion } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff, Router } from 'lucide-react'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";


function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '' 
  })
  const navigate = useNavigate();

  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user, isAuthenticated, isLoading) ; 

  if(isAuthenticated)
    {
      navigate('/home')
    }

  


    const { loginWithRedirect } = useAuth0();

    // Placeholder for anonymous login handler
    const handleAnonymousLogin = () => {
      // TODO: Implement anonymous login logic here
      alert('Logged in anonymously!');

    }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(isLogin ? 'Login' : 'Sign Up', formData)
  }

  const FloatingShape = ({ className, delay = 0 }) => (
    <motion.div
      className={`absolute rounded-full opacity-20 ${className}`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingShape 
          className="bg-purple-400 w-96 h-96 -top-20 -left-20 animate-float" 
          delay={0} 
        />
        <FloatingShape 
          className="bg-blue-400 w-80 h-80 top-10 right-10 animate-float-delayed" 
          delay={2} 
        />
        <FloatingShape 
          className="w-64 h-64 bg-purple-300 bottom-20 left-1/4 animate-float" 
          delay={4} 
        />
        <FloatingShape 
          className="bg-blue-300 w-72 h-72 -bottom-20 -right-20 animate-float-delayed" 
          delay={1} 
        />
        <FloatingShape 
          className="w-56 h-56 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-400 top-1/2 left-1/2 animate-float" 
          delay={3} 
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="flex min-h-screen">
        {/* Left Side - Hero Section */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 flex-col items-center justify-center hidden p-12 lg:flex lg:w-1/2 xl:w-3/5"
        >
          <div className="max-w-lg text-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="mb-6 text-6xl font-bold leading-tight text-white">
                Welcome to
                <span className="block text-transparent bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text">
                  Setu
                </span>
              </h1>
              <p className="text-xl leading-relaxed text-white/80">
                Experience the future of digital connectivity with our cutting-edge platform
              </p>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative"
            >
              <div className="flex items-center justify-center w-64 h-64 mx-auto border rounded-full bg-white/5 backdrop-blur-sm border-white/20">
                <div className="flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-tr from-purple-400/30 to-blue-400/30 animate-pulse-slow">
                  <div className="text-6xl">✨</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 flex items-center justify-center w-full p-6 lg:w-1/2 xl:w-2/5 lg:p-12"
        >
          <div className="w-full max-w-md">
            {/* Header */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8 text-center"
            >
              <div className="inline-block p-6 mb-8 border shadow-xl bg-white/10 backdrop-blur-md rounded-2xl border-white/20">
                <h1 className="text-3xl font-bold tracking-wide text-white">
                  MitraSetu
                </h1>
              </div>
            </motion.div>

            {/* Form Container */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative p-8 border shadow-2xl bg-white/10 backdrop-blur-xl rounded-3xl border-white/20"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                boxShadow: `
                  0 25px 50px -12px rgba(0, 0, 0, 0.25),
                  0 0 0 1px rgba(255, 255, 255, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `
              }}
            >
              {/* Glassmorphism Effect Overlay */}
              <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
              
              <div className="relative z-10">
                {/* Form Header */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8 text-center"
                >
                  <h2 className="mb-3 text-3xl font-semibold text-white">
                    {isLogin ? 'Log In' : 'Sign Up'}
                  </h2>
                  <p className="text-base text-white/70">
                    {isLogin ? 'Welcome back to your account' : 'Create your new account'}
                  </p>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatePresence mode="wait">
                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative group">
                          <User className="absolute w-5 h-5 transition-colors transform -translate-y-1/2 left-4 top-1/2 text-white/50 group-focus-within:text-purple-300" />
                          <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full py-4 pl-12 pr-4 text-white transition-all duration-300 border bg-white/10 backdrop-blur-md border-white/20 rounded-2xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-white/15 hover:bg-white/15"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <div className="relative group">
                      <Mail className="absolute w-5 h-5 transition-colors transform -translate-y-1/2 left-4 top-1/2 text-white/50 group-focus-within:text-purple-300" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full py-4 pl-12 pr-4 text-white transition-all duration-300 border bg-white/10 backdrop-blur-md border-white/20 rounded-2xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-white/15 hover:bg-white/15"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <div className="relative group">
                      <Lock className="absolute w-5 h-5 transition-colors transform -translate-y-1/2 left-4 top-1/2 text-white/50 group-focus-within:text-purple-300" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full py-4 pl-12 pr-12 text-white transition-all duration-300 border bg-white/10 backdrop-blur-md border-white/20 rounded-2xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-white/15 hover:bg-white/15"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute transition-colors transform -translate-y-1/2 right-4 top-1/2 text-white/50 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </motion.div>

                  {isLogin && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="flex items-center justify-between"
                    >
                      <label className="flex items-center text-sm cursor-pointer text-white/70">
                        <input type="checkbox" className="w-4 h-4 mr-2 text-purple-400 rounded border-white/20 bg-white/10 focus:ring-purple-400/50" />
                        Remember me
                      </label>
                      <button
                        type="button"
                        className="text-sm font-medium text-purple-300 transition-colors hover:text-white"
                      >
                        Forgot Password?
                      </button>
                    </motion.div>
                  )}

                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: "0 15px 40px rgba(139, 92, 246, 0.4)",
                      background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="relative w-full py-4 overflow-hidden font-semibold text-purple-800 transition-all duration-300 shadow-lg bg-gradient-to-r from-white to-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                  >
                    <span className="relative z-10">
                      {isLogin ? 'Log In' : 'Create Account'}
                    </span>
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 hover:opacity-100"></div>
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-6 bg-transparent text-white/70">Or continue with</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="grid grid-cols-2 gap-4 mb-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      className="flex items-center justify-center px-4 py-3 space-x-2 text-white transition-all duration-300 border bg-white/10 backdrop-blur-md border-white/20 rounded-2xl hover:bg-white/20"
                      onClick={() => loginWithRedirect()}
                    >
                      <span className="text-lg">🔗</span>
                      <span>Google</span>
                    </motion.button>
                  </motion.div>
                  {/* Anonymous Login Button */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.25 }}
                    className="mb-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      className="flex items-center justify-center w-full px-4 py-3 space-x-2 text-white transition-all duration-300 border bg-white/10 backdrop-blur-md border-white/20 rounded-2xl hover:bg-white/20"
                      onClick={handleAnonymousLogin}
                    >
                      <span className="text-lg">👤</span>
                      <span>Login Anonymously</span>
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                    className="text-center"
                  >
                    <p className="text-sm text-white/70">
                      {isLogin ? "Don't have an Account? " : "Already have an account? "}
                      <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="ml-1 font-medium text-purple-300 transition-colors hover:text-white"
                      >
                        {isLogin ? 'Sign Up' : 'Log In'}
                      </button>
                    </p>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            {/* Terms and Privacy */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="mt-6 text-center"
              >
                <p className="text-xs leading-relaxed text-white/60">
                  By signing up, you agree to our{' '}
                  <a href="#" className="text-purple-300 underline transition-colors hover:text-white">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-purple-300 underline transition-colors hover:text-white">
                    Privacy Policy
                  </a>
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
