// ...existing code...
import { MessageCircle, Sparkles, Users, Globe } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          {/* Updated logo and removed MitraSetu text */}
          <div className="flex items-center">
            <img
              src="/colored-logo.png"
              alt="MitraSetu Logo"
              width={300}
              height={100}
              className="h-20 w-auto max-w-[180px] md:h-24 md:max-w-[220px] lg:h-28 lg:max-w-[260px]"
            />
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-purple-700 hover:text-purple-900 transition-colors">
              Features
            </a>
            <a href="#about" className="text-purple-700 hover:text-purple-900 transition-colors">
              About
            </a>
            <button className="border border-purple-300 text-purple-700 hover:bg-purple-50 bg-white rounded-md px-4 py-2 font-medium transition-colors">
              Sign In
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center w-full flex flex-col items-center justify-center">
            <div className="space-y-4 w-full flex flex-col items-center justify-center">
              <h1 className="text-5xl lg:text-6xl font-bold text-purple-900 leading-tight">MitraSetu</h1>
              <p className="text-xl text-purple-700 font-medium">Your Friendly AI Bridge</p>
              <p className="text-lg text-purple-600 leading-relaxed max-w-lg mx-auto">
                Connecting cultures through intelligent conversation. Experience seamless communication that understands
                context, culture, and connection.
              </p>
            </div>

            <div className="flex justify-center items-center w-full my-6">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg px-10 py-4 text-lg shadow-lg transition-colors"
              >
                Get Started
              </button>
            </div>

          </div>

          {/* Right Illustration */}
          <div className="relative">
            <div className="relative flex justify-center items-center">
              {/* Floating icons for visual interest */}
              <div className="absolute left-[-40px] top-10 animate-float-slow text-3xl opacity-70 select-none">💬</div>
              <div className="absolute left-10 bottom-20 animate-float-fast text-2xl opacity-60 select-none">💜</div>
              <div className="absolute right-10 top-24 animate-float-mid text-2xl opacity-60 select-none">✨</div>
              <img
                src="/mitra.png"
                alt="MitraSetu AI Chat Interface"
                width={400}
                height={600}
                className="w-[320px] md:w-[380px] lg:w-[420px] h-auto drop-shadow-2xl"
              />
              <div className="absolute top-8 left-8 bg-purple-300 rounded-2xl rounded-bl-sm p-3 shadow-lg animate-pulse">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                </div>
              </div>
              <div
                className="absolute bottom-8 right-8 bg-pink-300 rounded-2xl rounded-br-sm p-3 shadow-lg animate-pulse"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-900 mb-4">Why Choose MitraSetu?</h2>
          <p className="text-lg text-purple-600 max-w-2xl mx-auto">
            Experience the power of AI that understands culture, context, and connection
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border border-purple-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-purple-900 mb-2">Cultural Bridge</h3>
            <p className="text-purple-600">
              Seamlessly connect across cultures with AI that understands context and nuance
            </p>
          </div>

          <div className="p-6 border border-purple-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-purple-900 mb-2">Smart Conversations</h3>
            <p className="text-purple-600">
              Engage in natural, intelligent conversations that feel human and authentic
            </p>
          </div>

          <div className="p-6 border border-purple-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-purple-900 mb-2">Community Focused</h3>
            <p className="text-purple-600">
              Built for communities, families, and friends to stay connected across distances
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Bridge the Gap?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who are already experiencing seamless, culturally-aware AI conversations
          </p>
          <button className="bg-white text-purple-700 hover:bg-purple-50 px-8 py-3 rounded-md text-lg font-semibold flex items-center justify-center gap-2 transition-colors">
            Get Started Today
            <Sparkles className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-purple-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Updated footer logo and removed MitraSetu text */}
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src="/colored-logo.png"
              alt="MitraSetu Logo"
              width={220}
              height={70}
              className="h-16 w-auto max-w-[140px] md:h-20 md:max-w-[180px]"
            />
          </div>
          <div className="flex space-x-6 text-sm text-purple-600">
            <a href="#" className="hover:text-purple-900 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-purple-900 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-purple-900 transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>

            <style>{`
              @keyframes float-slow {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-18px); }
              }
              .animate-float-slow { animation: float-slow 5s ease-in-out infinite; }
              @keyframes float-fast {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
              .animate-float-fast { animation: float-fast 2.5s ease-in-out infinite; }
              @keyframes float-mid {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-14px); }
              }
              .animate-float-mid { animation: float-mid 3.5s ease-in-out infinite; }
            `}</style>
    </div>
  )
}
