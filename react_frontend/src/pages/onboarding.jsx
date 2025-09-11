"use client"

import { useState, useEffect, useRef } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
]

const LANGUAGES = [
  "English",
  "Hindi",
  "Bengali",
  "Telugu",
  "Marathi",
  "Tamil",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Odia",
  "Assamese",
  "Other",
]

const OBJECTIVE_QUESTIONS = [
  {
    id: 1,
    text: "Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: 2,
    text: "Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: 3,
    text: "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: 4,
    text: "Over the last 2 weeks, how often have you been bothered by not being able to stop or control worrying?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: 5,
    text: "Over the last 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: 6,
    text: "Over the last 2 weeks, how often have you been bothered by poor appetite or overeating?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
]

const SUBJECTIVE_PROMPTS = [
  "How would you describe your current emotional state?",
  "What has been your biggest challenge lately?",
  "What brings you joy or makes you feel peaceful?",
  "How do you typically cope with stress or difficult emotions?",
  "What would you like to work on or improve about your mental wellbeing?",
  "Is there anything specific you'd like support with today?",
]

const MOOD_OPTIONS = [
  { emoji: "😄", label: "Excellent", value: "excellent" },
  { emoji: "😊", label: "Good", value: "good" },
  { emoji: "😐", label: "Okay", value: "okay" },
  { emoji: "😔", label: "Not Great", value: "not-great" },
  { emoji: "😰", label: "Struggling", value: "struggling" },
]

const GENDER_OPTIONS = ["Male", "Female", "Non-binary", "Prefer not to say"]

function calculateScores(answers) {
  const depressionScore = answers.slice(0, 2).reduce((sum, val) => sum + val, 0)
  const anxietyScore = answers.slice(2, 4).reduce((sum, val) => sum + val, 0)
  const totalScore = answers.reduce((sum, val) => sum + val, 0)
  return { depressionScore, anxietyScore, totalScore }
}

function getScoreLabel(score, maxScore) {
  const percentage = (score / maxScore) * 100
  if (percentage <= 25) return "Minimal"
  if (percentage <= 50) return "Mild"
  if (percentage <= 75) return "Moderate"
  return "Severe"
}

function MascotWithAnimation({ className = "", staticImageSrc, alt, lottieData }) {
  const containerRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [lottieInstance, setLottieInstance] = useState(null)
  const [imageError, setImageError] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    let lottie = null

    const loadLottie = async () => {
      if (typeof window !== "undefined" && lottieData) {
        try {
          const lottieWeb = await import("lottie-web")
          lottie = lottieWeb.default

          if (containerRef.current) {
            const animation = lottie.loadAnimation({
              container: containerRef.current,
              renderer: "svg",
              loop: true,
              autoplay: false,
              animationData: lottieData,
            })

            setLottieInstance(animation)
          }
        } catch (error) {
          console.log("[v0] Lottie loading failed, using CSS fallback:", error)
        }
      }
    }

    loadLottie()

    return () => {
      if (lottieInstance) {
        lottieInstance.destroy()
      }
    }
  }, [lottieData])

  useEffect(() => {
    if (lottieInstance) {
      if (isHovered || showAnimation) {
        lottieInstance.play()
      } else {
        lottieInstance.stop()
      }
    }
  }, [isHovered, lottieInstance, showAnimation])

  useEffect(() => {
    if (lottieInstance) {
      const timer = setTimeout(() => setShowAnimation(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [lottieInstance])

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!imageError ? (
        <img
          src="/mascot.png"
          alt={alt}
          width={208}
          height={208}
          className={`w-52 h-52 object-contain drop-shadow-lg transition-all duration-300 ${
            !lottieData || !lottieInstance
              ? isHovered
                ? "animate-bounce scale-105"
                : "animate-pulse"
              : (isHovered || showAnimation)
                ? "opacity-0"
                : "opacity-100"
          }`}
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className={`w-52 h-52 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-full flex items-center justify-center drop-shadow-lg transition-all duration-300 ${
            isHovered ? "animate-bounce scale-105" : "animate-pulse"
          }`}
        >
          <div className="w-24 h-16 bg-white rounded-lg flex items-center justify-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
            </div>
            <div className="w-6 h-1 bg-gray-800 rounded-full mt-2 ml-2"></div>
          </div>
        </div>
      )}

      {lottieData && (
        <div
          ref={containerRef}
          className={`absolute inset-0 w-52 h-52 transition-opacity duration-300 ${
            (isHovered || showAnimation) && lottieInstance ? "opacity-100" : "opacity-0"
          }`}
          style={{ pointerEvents: "none" }}
        />
      )}
    </div>
  )
}

export default function OnboardingFlow({ lottieAnimationData, onComplete, redirectPath = "/dashboard" }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)
  const [profile, setProfile] = useState({})
  const [objectiveAnswers, setObjectiveAnswers] = useState([])
  const [subjectiveAnswers, setSubjectiveAnswers] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [lottieData, setLottieData] = useState(null)

  const totalSteps = 12

  useEffect(() => {
    const placeholderLottieData = {
      v: "5.7.4",
      fr: 30,
      ip: 0,
      op: 60,
      w: 200,
      h: 200,
      nm: "Mascot Animation",
      ddd: 0,
      assets: [],
      layers: [
        {
          ddd: 0,
          ind: 1,
          ty: 4,
          nm: "Placeholder",
          sr: 1,
          ks: {
            o: { a: 0, k: 100 },
            r: {
              a: 1,
              k: [
                { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] },
                { t: 60, s: [360] },
              ],
            },
            p: { a: 0, k: [100, 100, 0] },
            a: { a: 0, k: [0, 0, 0] },
            s: { a: 0, k: [100, 100, 100] },
          },
          ao: 0,
          shapes: [],
          ip: 0,
          op: 60,
          st: 0,
          bm: 0,
        },
      ],
    }

    fetch("/animations/mascot-hover.json")
      .then((response) => response.json())
      .then((data) => {
        setLottieData(data)
      })
      .catch((error) => {
        console.log("[v0] Using placeholder Lottie data:", error)
        setLottieData(placeholderLottieData)
      })
  }, [])

  useEffect(() => {
    const existingProfile = localStorage.getItem("userProfile")
    if (existingProfile) {
      const parsed = JSON.parse(existingProfile)
      if (parsed.onboardingComplete) {
        window.location.href = redirectPath
      }
    }
  }, [redirectPath])

  const updateProfile = (updates) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1)
      setIsAnimating(false)
    }, 200)
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 2:
        return profile.name?.trim()
      case 3:
        return profile.nickname?.trim()
      case 4:
        return profile.gender
      case 5:
        return profile.state
      case 6:
        return profile.language
      case 7:
        return profile.birthday
      case 8:
        return profile.mood
      case 10:
        return profile.assessmentType
      case 11:
        if (profile.assessmentType === "objective") {
          return objectiveAnswers.length === OBJECTIVE_QUESTIONS.length
        } else {
          return (
            subjectiveAnswers.length === SUBJECTIVE_PROMPTS.length && subjectiveAnswers.every((answer) => answer.trim())
          )
        }
      default:
        return true
    }
  }

  const handleObjectiveAnswer = (questionIndex, value) => {
    const newAnswers = [...objectiveAnswers]
    newAnswers[questionIndex] = value
    setObjectiveAnswers(newAnswers)
  }

  const handleSubjectiveAnswer = (questionIndex, value) => {
    const newAnswers = [...subjectiveAnswers]
    newAnswers[questionIndex] = value
    setSubjectiveAnswers(newAnswers)
  }

  const completeOnboarding = () => {
    const finalProfile = {
      ...profile,
      onboardingComplete: true,
    }

    if (profile.assessmentType === "objective") {
      const scores = calculateScores(objectiveAnswers)
      finalProfile.objectiveAnswers = objectiveAnswers
      finalProfile.scores = {
        depression: scores.depressionScore,
        anxiety: scores.anxietyScore,
        total: scores.totalScore,
      }
    } else if (profile.assessmentType === "subjective") {
      finalProfile.subjectiveAnswers = subjectiveAnswers
    }

    localStorage.setItem("userProfile", JSON.stringify(finalProfile))
    onComplete?.(finalProfile)
  }

  const retakeAssessment = () => {
    setCurrentStep(9)
    setObjectiveAnswers([])
    setSubjectiveAnswers([])
    setCurrentQuestionIndex(0)
    updateProfile({ assessmentType: undefined })
  }

  const renderMascotArea = () => {
    return (
      <div className="flex-1 bg-gradient-to-br from-purple-50/50 via-white to-blue-50/30 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <div className="w-full h-64 flex items-center justify-center">
            <MascotWithAnimation
              staticImageSrc="/mascot.png"
              alt="MitraSetu friendly mascot character"
              lottieData={lottieData}
              className="cursor-pointer"
            />
          </div>
          <div className="mt-8 text-center">
            <p className="text-purple-600 text-balance leading-relaxed font-medium">
              {currentStep === 1 &&
                "Hi there! I'm MitrAI, here to help you on your mental wellbeing journey with MitraSetu."}
              {currentStep === 2 && "What should I call you?"}
              {currentStep === 3 && "Do you have a nickname you prefer?"}
              {currentStep === 4 && "How do you identify?"}
              {currentStep === 5 && "Where are you from?"}
              {currentStep === 6 && "What's your preferred language?"}
              {currentStep === 7 && "When's your birthday?"}
              {currentStep === 8 && "How are you feeling today?"}
              {currentStep === 9 && "Would you like to take a quick mental health assessment?"}
              {currentStep === 10 && "What type of assessment would you prefer?"}
              {currentStep === 11 &&
                profile.assessmentType === "objective" &&
                "Please answer these questions honestly."}
              {currentStep === 11 && profile.assessmentType === "subjective" && "Share your thoughts with me."}
              {currentStep === 12 && "Great! Here's what we learned about you."}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const renderStepContent = () => {
    const baseClasses = "flex-1 flex items-center justify-center p-12"
    const contentClasses = cn(
      "w-full max-w-lg transition-all duration-300",
      isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0",
    )

    switch (currentStep) {
      case 1:
        return (
          <div className={baseClasses}>
            <div className={contentClasses}>
              <Card className="p-10 text-center border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="space-y-8">
                  <h1 className="text-3xl font-light text-purple-800 text-balance tracking-tight">
                    Welcome to Your Wellbeing Journey
                  </h1>
                  <p className="text-purple-600 text-lg text-balance leading-relaxed">
                    Let's get to know you better so we can provide personalized support for your mental health.
                  </p>
                  <Button
                    onClick={nextStep}
                    size="lg"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xl transition-all duration-200"
                  >
                    Let's Begin
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 2:
        return (
          <div className={baseClasses}>
            <div className={contentClasses}>
              <Card className="p-10 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="space-y-8">
                  <h2 className="text-2xl font-light text-purple-800 text-balance">What should we call you?</h2>
                  <Input
                    placeholder="Enter your name"
                    value={profile.name || ""}
                    onChange={(e) => updateProfile({ name: e.target.value })}
                    className="text-lg py-3 border-slate-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl"
                  />
                  <Button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-medium py-3 rounded-xl transition-all duration-200"
                  >
                    Continue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 3:
        return (
          <div className={baseClasses}>
            <div className={contentClasses}>
              <Card className="p-10 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="space-y-8">
                  <h2 className="text-2xl font-light text-purple-800 text-balance">Do you have a nickname?</h2>
                  <Input
                    placeholder="Enter your nickname"
                    value={profile.nickname || ""}
                    onChange={(e) => updateProfile({ nickname: e.target.value })}
                    className="text-lg py-3 border-slate-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl"
                  />
                  <Button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-medium py-3 rounded-xl transition-all duration-200"
                  >
                    Continue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 4:
        return (
          <div className={baseClasses}>
            <div className={contentClasses}>
              <Card className="p-10 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="space-y-8">
                  <h2 className="text-2xl font-light text-purple-800 text-balance">How do you identify?</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {GENDER_OPTIONS.map((gender) => (
                      <Button
                        key={gender}
                        variant={profile.gender === gender ? "default" : "outline"}
                        onClick={() => updateProfile({ gender })}
                        className={cn(
                          "justify-start text-left h-auto p-4 rounded-xl font-medium transition-all duration-200",
                          profile.gender === gender
                            ? "bg-purple-600 hover:bg-purple-700 text-white"
                            : "border-slate-200 hover:border-purple-300 hover:bg-purple-50",
                        )}
                      >
                        {gender}
                      </Button>
                    ))}
                  </div>
                  <Button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-medium py-3 rounded-xl transition-all duration-200"
                  >
                    Continue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 5:
        return (
          <div className={baseClasses}>
            <div className={contentClasses}>
              <Card className="p-10 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="space-y-8">
                  <h2 className="text-2xl font-light text-purple-800 text-balance">Where are you from?</h2>
                  <Select onValueChange={(value) => updateProfile({ state: value })}>
                    <SelectTrigger className="text-lg py-3 border-slate-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {INDIAN_STATES.map((state) => (
                        <SelectItem key={state} value={state} className="rounded-lg">
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-medium py-3 rounded-xl transition-all duration-200"
                  >
                    Continue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 6:
        return (
          <div className={baseClasses}>
            <div className={contentClasses}>
              <Card className="p-10 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="space-y-8">
                  <h2 className="text-2xl font-light text-purple-800 text-balance">What's your preferred language?</h2>
                  <Select onValueChange={(value) => updateProfile({ language: value })}>
                    <SelectTrigger className="text-lg py-3 border-slate-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl">
                      <SelectValue placeholder="Select your language" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {LANGUAGES.map((language) => (
                        <SelectItem key={language} value={language} className="rounded-lg">
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-medium py-3 rounded-xl transition-all duration-200"
                  >
                    Continue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 7:
        return (
          <div className={baseClasses}>
            <div className={contentClasses}>
              <Card className="p-10 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="space-y-8">
                  <h2 className="text-2xl font-light text-purple-800 text-balance">When's your birthday?</h2>
                  <Input
                    type="date"
                    value={profile.birthday || ""}
                    onChange={(e) => updateProfile({ birthday: e.target.value })}
                    className="text-lg py-3 border-slate-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl"
                  />
                  <Button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-medium py-3 rounded-xl transition-all duration-200"
                  >
                    Continue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 8:
        return (
          <div className={baseClasses}>
            <div className={contentClasses}>
              <Card className="p-10 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="space-y-8">
                  <h2 className="text-2xl font-light text-purple-800 text-balance">How are you feeling today?</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {MOOD_OPTIONS.map((mood) => (
                      <Button
                        key={mood.value}
                        variant={profile.mood === mood.value ? "default" : "outline"}
                        onClick={() => updateProfile({ mood: mood.value })}
                        className={cn(
                          "justify-start text-left h-auto p-4 rounded-xl font-medium transition-all duration-200",
                          profile.mood === mood.value
                            ? "bg-purple-600 hover:bg-purple-700 text-white"
                            : "border-slate-200 hover:border-purple-300 hover:bg-purple-50",
                        )}
                      >
                        <span className="text-2xl mr-3">{mood.emoji}</span>
                        {mood.label}
                      </Button>
                    ))}
                  </div>
                  <Button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-medium py-3 rounded-xl transition-all duration-200"
                  >
                    Continue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 9:
        return (
          <div className={baseClasses}>
            <div className={contentClasses}>
              <Card className="p-10 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="space-y-8">
                  <h2 className="text-2xl font-light text-purple-800 text-balance">Mental Health Assessment</h2>
                  <p className="text-purple-600 text-balance leading-relaxed">
                    Would you like to take a quick assessment to help us understand your current wellbeing?
                  </p>
                  <div className="space-y-4">
                    <Button
                      onClick={nextStep}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xl transition-all duration-200"
                    >
                      Start Assessment
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        updateProfile({ onboardingComplete: true })
                        completeOnboarding()
                        window.location.href = redirectPath
                      }}
                      className="w-full border-slate-200 hover:border-purple-300 hover:bg-purple-50 font-medium py-3 rounded-xl transition-all duration-200 bg-transparent"
                    >
                      Maybe Later
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 10:
        return (
          <div className={baseClasses}>
            <div className={contentClasses}>
              <Card className="p-10 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="space-y-8">
                  <h2 className="text-2xl font-light text-purple-800 text-balance">Choose Assessment Type</h2>
                  <div className="space-y-4">
                    <Button
                      variant={profile.assessmentType === "objective" ? "default" : "outline"}
                      onClick={() => updateProfile({ assessmentType: "objective" })}
                      className={cn(
                        "w-full h-auto p-6 text-left rounded-xl font-medium transition-all duration-200",
                        profile.assessmentType === "objective"
                          ? "bg-purple-600 hover:bg-purple-700 text-white"
                          : "border-slate-200 hover:border-purple-300 hover:bg-purple-50",
                      )}
                    >
                      <div>
                        <div className="font-semibold text-lg text-purple-800">Objective Assessment</div>
                        <div className="text-sm opacity-80 mt-1 text-purple-600">
                          Multiple choice questions (6 questions)
                        </div>
                      </div>
                    </Button>
                    <Button
                      variant={profile.assessmentType === "subjective" ? "default" : "outline"}
                      onClick={() => updateProfile({ assessmentType: "subjective" })}
                      className={cn(
                        "w-full h-auto p-6 text-left rounded-xl font-medium transition-all duration-200",
                        profile.assessmentType === "subjective"
                          ? "bg-purple-600 hover:bg-purple-700 text-white"
                          : "border-slate-200 hover:border-purple-300 hover:bg-purple-50",
                      )}
                    >
                      <div>
                        <div className="font-semibold text-lg text-purple-800">Subjective Assessment</div>
                        <div className="text-sm opacity-80 mt-1 text-purple-600">Open-ended questions (6 prompts)</div>
                      </div>
                    </Button>
                  </div>
                  <Button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-medium py-3 rounded-xl transition-all duration-200"
                  >
                    Continue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 11:
        if (profile.assessmentType === "objective") {
          const currentQuestion = OBJECTIVE_QUESTIONS[currentQuestionIndex]
          return (
            <div className={baseClasses}>
              <div className={contentClasses}>
                <Card className="p-10 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardContent className="space-y-8">
                    <div className="text-sm text-purple-500 font-medium">
                      Question {currentQuestionIndex + 1} of {OBJECTIVE_QUESTIONS.length}
                    </div>
                    <h2 className="text-xl font-medium text-purple-800 text-balance leading-relaxed">
                      {currentQuestion.text}
                    </h2>
                    <div className="space-y-3">
                      {currentQuestion.options.map((option) => (
                        <Button
                          key={option.value}
                          variant={objectiveAnswers[currentQuestionIndex] === option.value ? "default" : "outline"}
                          onClick={() => handleObjectiveAnswer(currentQuestionIndex, option.value)}
                          className={cn(
                            "w-full justify-start text-left h-auto p-4 rounded-xl font-medium transition-all duration-200",
                            objectiveAnswers[currentQuestionIndex] === option.value
                              ? "bg-purple-600 hover:bg-purple-700 text-white"
                              : "border-slate-200 hover:border-purple-300 hover:bg-purple-50",
                          )}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {currentQuestionIndex > 0 && (
                        <Button
                          variant="outline"
                          onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                          className="flex-1 border-slate-200 hover:border-purple-300 hover:bg-purple-50 font-medium py-3 rounded-xl transition-all duration-200"
                        >
                          Previous
                        </Button>
                      )}
                      <Button
                        onClick={() => {
                          if (currentQuestionIndex < OBJECTIVE_QUESTIONS.length - 1) {
                            setCurrentQuestionIndex((prev) => prev + 1)
                          } else {
                            nextStep()
                          }
                        }}
                        disabled={objectiveAnswers[currentQuestionIndex] === undefined}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-medium py-3 rounded-xl transition-all duration-200"
                      >
                        {currentQuestionIndex < OBJECTIVE_QUESTIONS.length - 1 ? "Next" : "Complete"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )
        } else {
          const currentPrompt = SUBJECTIVE_PROMPTS[currentQuestionIndex]
          return (
            <div className={baseClasses}>
              <div className={contentClasses}>
                <Card className="p-10 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardContent className="space-y-8">
                    <div className="text-sm text-purple-500 font-medium">
                      Question {currentQuestionIndex + 1} of {SUBJECTIVE_PROMPTS.length}
                    </div>
                    <h2 className="text-xl font-medium text-purple-800 text-balance leading-relaxed">
                      {currentPrompt}
                    </h2>
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={subjectiveAnswers[currentQuestionIndex] || ""}
                      onChange={(e) => handleSubjectiveAnswer(currentQuestionIndex, e.target.value)}
                      className="min-h-32 border-slate-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl resize-none"
                    />
                    <div className="flex gap-4">
                      {currentQuestionIndex > 0 && (
                        <Button
                          variant="outline"
                          onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                          className="flex-1 border-slate-200 hover:border-purple-300 hover:bg-purple-50 font-medium py-3 rounded-xl transition-all duration-200"
                        >
                          Previous
                        </Button>
                      )}
                      <Button
                        onClick={() => {
                          if (currentQuestionIndex < SUBJECTIVE_PROMPTS.length - 1) {
                            setCurrentQuestionIndex((prev) => prev + 1)
                          } else {
                            nextStep()
                          }
                        }}
                        disabled={!subjectiveAnswers[currentQuestionIndex]?.trim()}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-medium py-3 rounded-xl transition-all duration-200"
                      >
                        {currentQuestionIndex < SUBJECTIVE_PROMPTS.length - 1 ? "Next" : "Complete"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )
        }

      case 12:
        const scores = profile.assessmentType === "objective" ? calculateScores(objectiveAnswers) : null
        return (
          <div className={baseClasses}>
            <div className={contentClasses}>
              <Card className="p-10 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="space-y-8">
                  <h2 className="text-2xl font-light text-purple-800 text-balance">Assessment Complete!</h2>

                  <div className="space-y-6">
                    <div className="p-6 bg-slate-50/80 rounded-xl border border-slate-100">
                      <h3 className="font-semibold text-purple-800 mb-4">Your Profile</h3>
                      <div className="space-y-2 text-purple-600">
                        <p>
                          <strong>Name:</strong> {profile.name} ({profile.nickname})
                        </p>
                        <p>
                          <strong>Location:</strong> {profile.state}
                        </p>
                        <p>
                          <strong>Language:</strong> {profile.language}
                        </p>
                        <p>
                          <strong>Current Mood:</strong> {MOOD_OPTIONS.find((m) => m.value === profile.mood)?.label}
                        </p>
                      </div>
                    </div>

                    {profile.assessmentType === "objective" && scores && (
                      <div className="p-6 bg-slate-50/80 rounded-xl border border-slate-100">
                        <h3 className="font-semibold text-purple-800 mb-4">Assessment Results</h3>
                        <div className="space-y-3 text-purple-600">
                          <p>
                            <strong>Depression:</strong> {getScoreLabel(scores.depressionScore, 6)} (
                            {scores.depressionScore}/6)
                          </p>
                          <p>
                            <strong>Anxiety:</strong> {getScoreLabel(scores.anxietyScore, 6)} ({scores.anxietyScore}/6)
                          </p>
                          <p>
                            <strong>Overall:</strong> {getScoreLabel(scores.totalScore, 18)} ({scores.totalScore}/18)
                          </p>
                        </div>
                      </div>
                    )}

                    {profile.assessmentType === "subjective" && (
                      <div className="p-6 bg-slate-50/80 rounded-xl border border-slate-100">
                        <h3 className="font-semibold text-purple-800 mb-4">Your Responses</h3>
                        <p className="text-purple-600 leading-relaxed">
                          Thank you for sharing your thoughts. We'll use this information to provide personalized
                          support.
                        </p>
                      </div>
                    )}

                    <div className="p-6 bg-amber-50/80 border border-amber-200 rounded-xl">
                      <p className="text-amber-800 leading-relaxed">
                        <strong>Disclaimer:</strong> This assessment is for informational purposes only and is not
                        intended for diagnosis. Please consult with a healthcare professional for proper evaluation and
                        treatment.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button
                      onClick={() => {
                        completeOnboarding()
                        window.location.href = redirectPath
                      }}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xl transition-all duration-200"
                    >
                      Go to Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      onClick={retakeAssessment}
                      className="w-full border-slate-200 hover:border-purple-300 hover:bg-purple-50 font-medium py-3 rounded-xl transition-all duration-200 bg-transparent"
                    >
                      Retake Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20 flex flex-col">
      <div className="p-6 border-b border-slate-200/50 bg-white/60 backdrop-blur-md">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-purple-500 font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-purple-500 font-medium">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2 bg-slate-100" />
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="lg:w-1/2">{renderMascotArea()}</div>
        <div className="lg:w-1/2">{renderStepContent()}</div>
      </div>
    </div>
  )
}
