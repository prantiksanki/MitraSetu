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

  const Logo = () => (
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="flex items-center justify-center rounded-full shadow-lg w-14 h-14 bg-gradient-to-tr from-green-300 to-blue-200">
        <span className="text-3xl font-bold text-green-700 drop-shadow-lg">💚</span>
      </div>
      <span className="mt-2 text-lg font-semibold tracking-wide text-green-900 drop-shadow-lg">MitraSetu</span>
      <span className="mt-1 text-sm text-green-700/80">Your well-being matters</span>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingShape 
          className="bg-gradient-to-br from-green-200 to-blue-100 w-96 h-96 -top-20 -left-20 animate-float" 
          delay={0} 
        />
        <FloatingShape 
          className="bg-gradient-to-br from-blue-200 to-green-100 w-80 h-80 top-10 right-10 animate-float-delayed" 
          delay={2} 
        />
        <FloatingShape 
          className="w-64 h-64 bg-gradient-to-br from-green-100 to-blue-50 bottom-20 left-1/4 animate-float" 
          delay={4} 
        />
        <FloatingShape 
          className="bg-gradient-to-br from-blue-100 to-green-50 w-72 h-72 -bottom-20 -right-20 animate-float-delayed" 
          delay={1} 
        />
        <FloatingShape 
          className="w-56 h-56 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-green-200 to-blue-100 top-1/2 left-1/2 animate-float" 
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
          <div className="flex flex-col items-center justify-center w-full h-full">
            {/* Mascot image, large and centered */}
            <img
              src="/public/mascot.png"
              alt="MitraSetu Mascot"
              className="object-contain mb-8 w-80 h-80 drop-shadow-2xl animate-float"
              style={{ maxWidth: '340px', maxHeight: '340px' }}
            />
            <h1 className="mt-2 text-4xl font-bold text-green-900">Welcome to MitraSetu</h1>
            <p className="mt-2 text-lg text-center text-green-800/80">A safe space for your mind and heart.<br />You’re not alone. We’re here for you.</p>
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
              <div className="inline-block p-6 mb-8 border shadow-xl bg-white/80 backdrop-blur-md rounded-2xl border-white/40">
                <h1 className="text-3xl font-bold tracking-wide text-green-900">
                  MitraSetu
                </h1>
              </div>
            </motion.div>

            {/* Form Container */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative p-8 border-4 border-transparent shadow-2xl bg-white/80 backdrop-blur-xl rounded-3xl border-white/40 animate-border-gradient"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.5) 100%)',
                boxShadow: `
                  0 25px 50px -12px rgba(0, 0, 0, 0.10),
                  0 0 0 1px rgba(0, 0, 0, 0.04),
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
                  <h2 className="mb-3 text-3xl font-semibold text-green-900">
                    {isLogin ? 'Log In' : 'Sign Up'}
                  </h2>
                  <p className="text-base text-green-700/80">
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
                          <User className="absolute w-5 h-5 transition-colors transform -translate-y-1/2 left-4 top-1/2 text-green-700/80 group-focus-within:text-purple-300" />
                          <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full py-4 pl-12 pr-4 text-green-900 transition-all duration-300 border border-green-200 bg-white/90 backdrop-blur-md rounded-2xl placeholder-green-700/80 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-white/15 hover:bg-white/15"
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
                      <Mail className="absolute w-5 h-5 transition-colors transform -translate-y-1/2 left-4 top-1/2 text-green-700/80 group-focus-within:text-purple-300" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full py-4 pl-12 pr-4 text-green-900 transition-all duration-300 border border-green-200 bg-white/90 backdrop-blur-md rounded-2xl placeholder-green-700/80 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-white/15 hover:bg-white/15"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <div className="relative group">
                      <Lock className="absolute w-5 h-5 transition-colors transform -translate-y-1/2 left-4 top-1/2 text-green-700/80 group-focus-within:text-purple-300" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full py-4 pl-12 pr-12 text-green-900 transition-all duration-300 border border-green-200 bg-white/90 backdrop-blur-md rounded-2xl placeholder-green-700/80 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-white/15 hover:bg-white/15"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute transition-colors transform -translate-y-1/2 right-4 top-1/2 text-green-700/80 hover:text-purple-300"
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
                      <label className="flex items-center text-sm cursor-pointer text-green-700/80">
                        <input type="checkbox" className="w-4 h-4 mr-2 text-purple-400 border-green-200 rounded bg-white/10 focus:ring-purple-400/50" />
                        Remember me
                      </label>
                      <button
                        type="button"
                        className="text-sm font-medium text-purple-300 transition-colors hover:text-purple-400"
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
                      scale: 1.04, 
                      boxShadow: "0 15px 40px 0px #6ee7b7, 0 0 16px 4px #38bdf8",
                      background: "linear-gradient(135deg, #6ee7b7 0%, #38bdf8 100%)",
                      color: "#fff"
                    }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="relative w-full py-4 overflow-hidden font-semibold text-green-900 transition-all duration-300 shadow-lg bg-gradient-to-r from-white to-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400/50"
                  >
                    <span className="relative z-10">
                      {isLogin ? 'Log In' : 'Create Account'}
                    </span>
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-green-200/20 to-blue-200/20 hover:opacity-100"></div>
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-green-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-6 bg-transparent text-green-700/80">Or continue with</span>
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
                      className="flex items-center justify-center px-4 py-3 space-x-2 text-green-900 transition-all duration-300 border border-green-200 bg-white/90 backdrop-blur-md rounded-2xl hover:bg-white/20"
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
                      className="flex items-center justify-center w-full px-4 py-3 space-x-2 text-green-900 transition-all duration-300 border border-green-200 bg-white/90 backdrop-blur-md rounded-2xl hover:bg-white/20"
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
                    <p className="text-sm text-green-700/80">
                      {isLogin ? "Don't have an Account? " : "Already have an account? "}
                      <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="ml-1 font-medium text-purple-300 transition-colors hover:text-purple-400"
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
                <p className="text-xs leading-relaxed text-green-700/80">
                  By signing up, you agree to our{' '}
                  <a href="#" className="text-purple-300 underline transition-colors hover:text-purple-400">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-purple-300 underline transition-colors hover:text-purple-400">
                    Privacy Policy
                  </a>
                </p>
              </motion.div>
            )}
            {/* Need help link */}
            <div className="mt-6 text-center">
              <a href="https://www.mhanational.org/get-involved/contact-us" target="_blank" rel="noopener noreferrer" className="text-sm text-green-700 underline transition-colors hover:text-green-900">Need help? Mental Health Resources</a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
