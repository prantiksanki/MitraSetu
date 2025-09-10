import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingShape 
          className="w-96 h-96 bg-purple-400 -top-20 -left-20 animate-float" 
          delay={0} 
        />
        <FloatingShape 
          className="w-80 h-80 bg-blue-400 top-10 right-10 animate-float-delayed" 
          delay={2} 
        />
        <FloatingShape 
          className="w-64 h-64 bg-purple-300 bottom-20 left-1/4 animate-float" 
          delay={4} 
        />
        <FloatingShape 
          className="w-72 h-72 bg-blue-300 -bottom-20 -right-20 animate-float-delayed" 
          delay={1} 
        />
        <FloatingShape 
          className="w-56 h-56 bg-indigo-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-float" 
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
          className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-center items-center p-12 relative z-10"
        >
          <div className="max-w-lg text-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                Welcome to
                <span className="block bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                  Setu
                </span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Experience the future of digital connectivity with our cutting-edge platform
              </p>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative"
            >
              <div className="w-64 h-64 mx-auto bg-white/5 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center">
                <div className="w-48 h-48 bg-gradient-to-tr from-purple-400/30 to-blue-400/30 rounded-full animate-pulse-slow flex items-center justify-center">
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
          className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-12 relative z-10"
        >
          <div className="w-full max-w-md">
            {/* Header */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 inline-block border border-white/20 shadow-xl">
                <h1 className="text-white text-3xl font-bold tracking-wide">
                  MitraSetu
                </h1>
              </div>
            </motion.div>

            {/* Form Container */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl relative"
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
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
              
              <div className="relative z-10">
                {/* Form Header */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-white text-3xl font-semibold mb-3">
                    {isLogin ? 'Log In' : 'Sign Up'}
                  </h2>
                  <p className="text-white/70 text-base">
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
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-purple-300 transition-colors" />
                          <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-white/15 transition-all duration-300 hover:bg-white/15"
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
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-purple-300 transition-colors" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-white/15 transition-all duration-300 hover:bg-white/15"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-purple-300 transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-4 pl-12 pr-12 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-white/15 transition-all duration-300 hover:bg-white/15"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
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
                      className="flex justify-between items-center"
                    >
                      <label className="flex items-center text-white/70 text-sm cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 mr-2 rounded border-white/20 bg-white/10 text-purple-400 focus:ring-purple-400/50" />
                        Remember me
                      </label>
                      <button
                        type="button"
                        className="text-purple-300 hover:text-white text-sm transition-colors font-medium"
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
                    className="w-full bg-gradient-to-r from-white to-gray-100 text-purple-800 font-semibold py-4 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400/50 shadow-lg relative overflow-hidden"
                  >
                    <span className="relative z-10">
                      {isLogin ? 'Log In' : 'Create Account'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
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
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-3 px-4 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
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
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-3 px-4 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
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
                    <p className="text-white/70 text-sm">
                      {isLogin ? "Don't have an Account? " : "Already have an account? "}
                      <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-purple-300 hover:text-white font-medium transition-colors ml-1"
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
                className="text-center mt-6"
              >
                <p className="text-white/60 text-xs leading-relaxed">
                  By signing up, you agree to our{' '}
                  <a href="#" className="text-purple-300 hover:text-white transition-colors underline">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-purple-300 hover:text-white transition-colors underline">
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
