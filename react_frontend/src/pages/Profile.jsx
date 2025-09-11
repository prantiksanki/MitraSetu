

import { ArrowLeft, Calendar, Users, MessageCircle, Star, Award, Heart, Frown, Smile } from "lucide-react"

export default function ProfilePage() {
  const currentMood = "Happy"; // This could be dynamic

  const getMoodIcon = (mood) => {
    switch (mood) {
      case "Happy":
        return <Smile className="w-5 h-5 text-green-500" />;
      case "Low":
        return <Heart className="w-5 h-5 text-yellow-500" />;
      case "Sad":
        return <Frown className="w-5 h-5 text-red-500" />;
      default:
        return <Smile className="w-5 h-5 text-green-500" />;
    }
  };

  const getMoodColor = (mood) => {
    switch (mood) {
      case "Happy":
        return "text-green-600 bg-green-50 border-green-200";
      case "Low":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Sad":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-green-600 bg-green-50 border-green-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/">
            <button className="text-purple-700 hover:bg-purple-50 flex items-center px-3 py-1 rounded transition-colors border border-transparent hover:border-purple-200">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          </a>
          <img
            src="/colored-logo.png"
            alt="MitraSetu Logo"
            width={180}
            height={60}
            className="h-12 w-auto"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Profile Info */}
        <div className="mb-6 border border-purple-200 rounded-xl bg-white/80 shadow">
          <div className="p-6">
            <div className="flex flex-row justify-between items-center mb-4 gap-6">
              {/* Avatar and Info */}
              <div className="flex flex-row items-center gap-4 flex-1 min-w-0">
                <div className="w-16 h-16 rounded-full border-2 border-purple-300 bg-purple-100 flex items-center justify-center overflow-hidden shrink-0">
                  <img src="Profile.png" alt="Profile" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                      <h1 className="text-2xl font-bold text-purple-900 leading-tight whitespace-nowrap text-left">Aantriksh Sood</h1>
                      <p className="text-purple-600 leading-tight whitespace-nowrap text-left">Lucknow, Uttar Pradesh, India</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-purple-600">Pronouns:</span>
                    <span className="text-purple-700 border border-purple-300 rounded px-2 py-0.5 text-xs">She/Her</span>
                  </div>
                </div>
              </div>
              {/* Chat Button */}
              <div className="flex items-center h-full">
                <button
                  className="text-purple-700 border border-purple-300 hover:bg-purple-50 bg-transparent flex items-center px-4 py-2 rounded transition-colors"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat
                </button>
              </div>
            </div>
            {/* Current Mood */}
            <div className="mb-4">
              <div
                className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full border ${getMoodColor(currentMood)}`}
              >
                {getMoodIcon(currentMood)}
                <span className="text-sm font-medium">Current mood: {currentMood}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Profile Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="border border-purple-200 hover:border-purple-300 transition-colors rounded-xl bg-white/80 shadow p-4 text-center">
            <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-lg font-semibold text-purple-900">30/10</div>
            <div className="text-sm text-purple-600">Birthdate</div>
          </div>
          <div className="border border-purple-200 hover:border-purple-300 transition-colors rounded-xl bg-white/80 shadow p-4 text-center">
            <div className="w-6 h-6 text-purple-600 mx-auto mb-2 flex items-center justify-center">♀</div>
            <div className="text-lg font-semibold text-purple-900">Female</div>
            <div className="text-sm text-purple-600">Gender</div>
          </div>
          <div className="border border-purple-200 hover:border-purple-300 transition-colors rounded-xl bg-white/80 shadow p-4 text-center">
            <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-lg font-semibold text-purple-900">20</div>
            <div className="text-sm text-purple-600">Age</div>
          </div>
        </div>
        {/* Badges Section */}
        <div className="mb-4 border border-purple-200 rounded-xl bg-white/80 shadow p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Star className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-900">Communication Champion</span>
          </div>
          <span className="bg-purple-100 text-purple-700 hover:bg-purple-200 rounded px-3 py-1 text-xs font-semibold">Level 3</span>
        </div>
        <div className="mb-4 border border-purple-200 rounded-xl bg-white/80 shadow p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-900">Cultural Bridge Builder</span>
          </div>
          <span className="bg-purple-100 text-purple-700 hover:bg-purple-200 rounded px-3 py-1 text-xs font-semibold">Expert</span>
        </div>
        <div className="border border-purple-200 rounded-xl bg-white/80 shadow p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Heart className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-900">Empathy Ambassador</span>
          </div>
          <span className="bg-purple-100 text-purple-700 hover:bg-purple-200 rounded px-3 py-1 text-xs font-semibold">Rising Star</span>
        </div>
      </div>
    </div>
  );
}
