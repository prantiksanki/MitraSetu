import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Nav } from './nav'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, Users, Heart, ChevronRight, Calendar, TrendingUp, Flame, Star } from 'lucide-react'

// Light palette
const colors = {
  bg: 'bg-white',
  text: 'text-gray-900',
  sub: 'text-gray-600',
  card: 'bg-white',
  border: 'border-gray-200',
  grad: 'bg-gradient-to-r from-[#A258FF] via-[#FF62C0] to-[#2EA8FF]'
}

// no sidebar here; global sidebar is rendered from nav.jsx on /home

export default function DuoHome() {
  const navigate = useNavigate()
  const [selectedMood, setSelectedMood] = useState(null)
  const [streak, setStreak] = useState(7)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [hoveredCard, setHoveredCard] = useState(null)
  const stories = [
    'A penguin walked into therapy and said: "I feel very ice-olated." The therapist smiled and said, "Let\'s warm up with a breath and talk about what\'s beneath the surface." The penguin nodded, realizing even the coldest days can soften with kindness.',
    'Your future self is already proud you showed up today. Imagine them sending you a note: "Thank you for choosing one kind action for us. Keep going, slowly and gently—this is how we change our lives."',
    'Two neurons met at a synapse. One said: "I feel a connection." The other replied, "Let\'s practice it daily." Our brains grow with small, repeated moments—one deep breath, one kind word, one more try.',
    'Tiny steps are still steps. A tortoise once whispered to a mountain: "I\'ll meet you at the top." The mountain didn\'t move—but the tortoise did, one calm step at a time.'
  ]
  const jokes = [
    'Why did the scarecrow become a great mentor? He was outstanding in his field.',
    'Parallel lines have so much in common. It’s a shame they’ll never meet.',
    'I used to play piano by ear, now I use my hands.',
    'I told my therapist I keep dreaming of a muffler. She said I’m exhausted.'
  ]
  const affirmations = [
    'I am allowed to move at my own pace.',
    'My feelings are valid and I can hold them with kindness.',
    'Small actions today create big changes over time.',
    'I choose progress over perfection.'
  ]
  const [storyIdx, setStoryIdx] = useState(0)
  const [jokeIdx, setJokeIdx] = useState(0)
  const [affirmIdx, setAffirmIdx] = useState(0)
  // Floating mascot
  const mascotImage = '/MitraSetu-Mascot.jpg'
  const [position, setPosition] = useState({ x: 200, y: 300 })
  const [isFloating, setIsFloating] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const floatMessages = [
    { emoji: '🌿', message: 'Every step counts on your wellness journey!' },
    { emoji: '💫', message: 'Progress over perfection. You are doing great.' },
    { emoji: '✨', message: 'One kind breath can change the moment.' },
  ]
  const [msgIdx, setMsgIdx] = useState(0)
  const currentMessage = floatMessages[msgIdx]

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const s = setInterval(() => setStoryIdx((i) => (i + 1) % stories.length), 7000)
    const j = setInterval(() => setJokeIdx((i) => (i + 1) % jokes.length), 9000)
    const a = setInterval(() => setAffirmIdx((i) => (i + 1) % affirmations.length), 6000)
    return () => { clearInterval(s); clearInterval(j); clearInterval(a) }
  }, [])

  // Random gentle movement for mascot
  useEffect(() => {
    const id = setInterval(() => {
      setPosition((prev) => ({
        x: Math.max(40, Math.min(window.innerWidth - 140, prev.x + (Math.random() * 200 - 100))),
        y: Math.max(120, Math.min(window.innerHeight - 140, prev.y + (Math.random() * 160 - 80)))
      }))
    }, 4000)
    return () => clearInterval(id)
  }, [])

  const handleMascotClick = () => {
    setShowMessage(true)
    setMsgIdx((i) => (i + 1) % floatMessages.length)
    setTimeout(() => setShowMessage(false), 3500)
  }

  const moods = [
    { emoji: '😊', label: 'Excellent', color: 'bg-emerald-500' },
    { emoji: '🙂', label: 'Good', color: 'bg-blue-500' },
    { emoji: '😐', label: 'Okay', color: 'bg-yellow-500' },
    { emoji: '😔', label: 'Low', color: 'bg-purple-500' },
    { emoji: '😢', label: 'Struggling', color: 'bg-rose-500' }
  ]

  const moodData = [
    { day: 'Mon', mood: 10, color: 'bg-blue-400' },
    { day: 'Tue', mood: 7, color: 'bg-emerald-400' },
    { day: 'Wed', mood: 4, color: 'bg-yellow-400' },
    { day: 'Thu', mood: 8, color: 'bg-emerald-500' },
    { day: 'Fri', mood: 6, color: 'bg-blue-400' },
    { day: 'Sat', mood: 9, color: 'bg-emerald-500' },
    { day: 'Sun', mood: 7, color: 'bg-blue-500' }
  ]

  // simple local feed state
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('mitrasetu_posts')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })

  const addPost = (text) => {
    const newPost = { id: Date.now(), text }
    const next = [newPost, ...posts]
    setPosts(next)
    localStorage.setItem('mitrasetu_posts', JSON.stringify(next))
  }

  return (
    <div className={`${colors.bg} ${colors.text} min-h-screen`}>
      <Nav />
      <DashboardMascotOverlay position={position} isFloating={isFloating} showMessage={showMessage} currentMessage={currentMessage} handleMascotClick={handleMascotClick} mascotImage={mascotImage} />
      <main className="pt-6 px-6 md:pl-64 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Center content - all features from MentalHealthHome with new skin */}
          <section className={`rounded-2xl ${colors.card} border ${colors.border} p-6 relative overflow-hidden`}>
            {/* Mascot image floating in the background */}
            <img src="/mascot.png" alt="MitraSetu mascot" className="hidden md:block absolute -right-16 -top-20 w-64 opacity-10 pointer-events-none select-none" />

            {/* Welcome strip (Duolingo-like pill) */}
            <div className="mb-6">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${colors.grad} text-[#0E1117] font-semibold`}>Good {currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 18 ? 'Afternoon' : 'Evening'}! 👋</div>
              <h2 className="mt-3 text-xl font-semibold">How are you feeling today?</h2>
            </div>

            {/* Today's check-in (moods) */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2"><Calendar size={18} className="text-[#7FB3FF]" /><span className="font-semibold">Today's Check-in</span></div>
                <span className={`text-sm ${colors.sub}`}>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {moods.map((m, i) => (
                  <button key={i} onClick={() => setSelectedMood(m)} className={`group relative p-4 rounded-xl border ${colors.border} ${selectedMood?.label===m.label? m.color+' text-white':'hover:bg-[#161C28]'} transition`}> 
                    <div className="text-2xl mb-1">{m.emoji}</div>
                    <div className={`text-xs ${selectedMood?.label===m.label?'text-white':colors.sub}`}>{m.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Instagram-like post feed */}
            <div id="post-tip" className="mb-6 space-y-6">
              <PostComposer onPost={addPost} />
              {posts.map(p => (
                <FeedCard key={p.id} title="Community Tip" content={p.text} />
              ))}
              <FeedCard title="Daily Affirmation" content={affirmations[affirmIdx]} />
              <FeedCard title="Daily Joke" content={jokes[jokeIdx]} />
              <FeedCard title="Daily Story" content={stories[storyIdx]} />
            </div>

            {/* Live media controls (simple, rich but clean) */}
            <div id="live" className="mb-6">
              <SimpleLiveStarter />
            </div>

            {/* Progress moved to right rail */}
          </section>

          {/* Right rail: Weekly Progress + Achievements + Coins */}
          <aside className={`rounded-2xl ${colors.card} h-fit sticky top-6 space-y-4`}> 
            <div className={`p-5 rounded-2xl border ${colors.border} ${colors.card}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2"><TrendingUp size={18} className="text-[#7FB3FF]" /><span className="font-semibold">Weekly Progress</span></div>
                <span className={`text-sm ${colors.sub}`}>Last 7 days</span>
              </div>
              <div className="grid grid-cols-7 gap-2 h-40 items-end">
                {moodData.map((d, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-6 ${d.color} rounded-t`} style={{ height: `${d.mood * 10}px` }}></div>
                    <span className={`text-[10px] mt-1 ${colors.sub}`}>{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`p-5 rounded-2xl border ${colors.border} ${colors.card}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2"><Flame size={18} className="text-orange-400" /><span className="font-semibold">Achievements</span></div>
              </div>
              <div className="text-center mb-4">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full shadow-lg bg-gradient-to-r from-orange-400 to-red-500">
                  <span className="text-2xl text-white font-bold">{streak}</span>
                  <div className="absolute rounded-full -inset-1 bg-gradient-to-r from-orange-400 to-red-500 opacity-20 animate-pulse"></div>
                </div>
                <p className={`text-sm mt-2 ${colors.sub}`}>Day streak! Keep it up! 🔥</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center p-3 gap-3 rounded-xl bg-gray-50">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center"><Star size={16} className="text-white" /></div>
                  <div>
                    <div className="text-sm font-medium">Week Warrior</div>
                    <div className={`text-xs ${colors.sub}`}>7 days of consistent check-ins</div>
                  </div>
                </div>
                <div className="flex items-center p-3 gap-3 rounded-xl bg-emerald-50">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center"><Heart size={16} className="text-white" /></div>
                  <div>
                    <div className="text-sm font-medium">Self-Care Champion</div>
                    <div className={`text-xs ${colors.sub}`}>Completed mindfulness exercise</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border ${colors.border} ${colors.card}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">Coins</div>
                <span className="text-xs text-gray-500">Today</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400" />
                <div>
                  <div className="text-xl font-bold">500</div>
                  <div className="text-xs text-gray-500">Keep collecting by completing tips</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

// Instagram-like feed components
function FeedCard({ title, content }) {
  return (
    <div className="p-6 border border-gray-200 rounded-2xl bg-white">
      <div className="mb-3 text-lg font-semibold">{title}</div>
      <p className="text-xl leading-relaxed text-gray-700">{content}</p>
    </div>
  )
}

// Floating mascot overlay for dashboard
export function DashboardMascotOverlay({ position, isFloating, showMessage, currentMessage, handleMascotClick, mascotImage }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[60] opacity-85">
      <motion.div
        className="absolute pointer-events-auto cursor-pointer"
        animate={{ x: position.x, y: position.y, rotate: isFloating ? [0, 2, -2, 0] : 0 }}
        transition={{ x: { type: 'spring', stiffness: 50, damping: 15, duration: 3 }, y: { type: 'spring', stiffness: 50, damping: 15, duration: 3 }, rotate: { duration: 4, ease: 'easeInOut', repeat: Infinity } }}
        style={{ width: 100, height: 100 }}
        onClick={handleMascotClick}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-xl opacity-30"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="relative z-10"
          animate={{ scale: showMessage ? [1, 1.15, 1.05] : [1, 1.05, 1], y: [0, -5, 0] }}
          transition={{ scale: { duration: 0.6, ease: 'easeInOut', repeat: showMessage ? 2 : Infinity }, y: { duration: 2.5, ease: 'easeInOut', repeat: Infinity } }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={mascotImage} alt="MitraSetu Mascot" className="w-24 h-24 drop-shadow-2xl" />
          <motion.div className="absolute -top-2 -right-2 text-yellow-400" animate={{ scale: [0, 1, 0], rotate: [0, 180, 360] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>✨</motion.div>
          <motion.div className="absolute -bottom-1 -left-2 text-pink-400" animate={{ scale: [0, 1, 0], rotate: [0, -180, -360] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>💫</motion.div>
        </motion.div>
        <AnimatePresence>
          {showMessage && currentMessage && (
            <motion.div initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 20 }} className="absolute -top-20 left-1/2 transform -translate-x-1/2 min-w-64 max-w-80">
              <div className="relative bg-gradient-to-br from-white/95 to-purple-50/95 backdrop-blur-md border-2 border-purple-200/50 rounded-3xl p-4 shadow-2xl">
                <div className="flex items-start gap-2">
                  <span className="text-lg">{currentMessage.emoji}</span>
                  <p className="text-sm text-purple-800 leading-relaxed">{currentMessage.message}</p>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <div className="w-4 h-4 bg-gradient-to-br from-white/95 to-purple-50/95 border-r-2 border-b-2 border-purple-200/50 rotate-45" />
                </div>
                <motion.div className="absolute -top-2 -right-2 text-pink-400" animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>💖</motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function PostComposer({ onPost }) {
  const [text, setText] = React.useState('')
  return (
    <div className="p-4 border border-gray-200 rounded-2xl bg-white">
      <div className="mb-2 font-semibold">Share a health tip</div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a short, helpful tip..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        rows={3}
      />
      <div className="mt-2 text-right">
        <button
          onClick={() => { if (text.trim()) { onPost?.(text.trim()); setText('') } }}
          className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Post Tip
        </button>
      </div>
    </div>
  )
}

function SimpleLiveStarter() {
  const [open, setOpen] = React.useState(false)
  const videoRef = React.useRef(null)
  const [mic, setMic] = React.useState(false)
  const [cam, setCam] = React.useState(false)
  const [scr, setScr] = React.useState(false)
  return (
    <div className="p-6 border border-gray-200 rounded-2xl bg-white">
      <div className="mb-3 text-lg font-semibold">Live with AI Mitra</div>
      <p className="text-sm text-gray-600 mb-4">Start a simple live session. You can enable audio, video, or screen share. Opens a clean preview modal.</p>
      <div className="flex gap-3">
        <button onClick={()=>setMic(v=>!v)} className={`px-3 py-2 text-sm rounded ${mic? 'bg-green-600 text-white':'bg-gray-100 text-gray-800'}`}>{mic? 'Mic On':'Mic Off'}</button>
        <button onClick={()=>setCam(v=>!v)} className={`px-3 py-2 text-sm rounded ${cam? 'bg-green-600 text-white':'bg-gray-100 text-gray-800'}`}>{cam? 'Camera On':'Camera Off'}</button>
        <button onClick={()=>setScr(v=>!v)} className={`px-3 py-2 text-sm rounded ${scr? 'bg-green-600 text-white':'bg-gray-100 text-gray-800'}`}>{scr? 'Sharing':'Share Screen'}</button>
        <button onClick={()=>setOpen(true)} className="ml-auto px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Open Preview</button>
      </div>
      {/* Minimal inline modal */}
      {open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setOpen(false)} />
          <div className="relative bg-white border border-gray-200 rounded-2xl shadow-xl w-full max-w-3xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold">Live Session Preview</div>
              <button onClick={()=>setOpen(false)} className="text-gray-500 hover:text-gray-800">Close</button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                {!cam && !scr && <span className="text-xs text-gray-500">Camera / Screen feed</span>}
              </div>
              <div className="text-sm text-gray-600">
                <p className="mb-2">Session settings:</p>
                <ul className="space-y-1">
                  <li>Microphone: {mic? 'On':'Off'}</li>
                  <li>Camera: {cam? 'On':'Off'}</li>
                  <li>Screen share: {scr? 'On':'Off'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}