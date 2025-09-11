
import { ArrowLeft, Calendar, Users, MessageCircle, Star, Award, Heart, Frown, Smile } from "lucide-react"
import { Nav } from '../components/nav'

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
      <Nav />
      <div className="w-full max-w-5xl px-4 pt-24 pb-8 mx-auto">
        {/* Profile Info */}
        <div className="mb-6 border border-purple-200 shadow rounded-xl bg-white/80">
          <div className="p-6">
            <div className="flex flex-row items-center justify-between gap-6 mb-4">
              {/* Avatar and Info */}
              <div className="flex flex-row items-center flex-1 min-w-0 gap-4">
                <div className="flex items-center justify-center w-16 h-16 overflow-hidden bg-purple-100 border-2 border-purple-300 rounded-full shrink-0">
                  <img src="Profile.png" alt="Profile" className="object-cover w-full h-full rounded-full" />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                      <h1 className="text-2xl font-bold leading-tight text-left text-purple-900 truncate">Gargi Singh</h1>
                      <p className="leading-tight text-left text-purple-600 truncate">Lucknow, Uttar Pradesh, India</p>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-sm text-purple-600">Pronouns:</span>
                    <span className="text-purple-700 border border-purple-300 rounded px-2 py-0.5 text-xs">She/Her</span>
                  </div>
                </div>
              </div>
              {/* Chat Button */}
              <div className="flex items-center h-full">
                <button
                  className="flex items-center px-4 py-2 text-purple-700 transition-colors bg-transparent border border-purple-300 rounded hover:bg-purple-50"
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
        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="p-4 text-center transition-colors border border-purple-200 shadow hover:border-purple-300 rounded-xl bg-white/80">
            <Calendar className="w-6 h-6 mx-auto mb-2 text-purple-600" />
            <div className="text-lg font-semibold text-purple-900">30/10</div>
            <div className="text-sm text-purple-600">Birthdate</div>
          </div>
          <div className="p-4 text-center transition-colors border border-purple-200 shadow hover:border-purple-300 rounded-xl bg-white/80">
            <div className="flex items-center justify-center w-6 h-6 mx-auto mb-2 text-purple-600">♀</div>
            <div className="text-lg font-semibold text-purple-900">Female</div>
            <div className="text-sm text-purple-600">Gender</div>
          </div>
          <div className="p-4 text-center transition-colors border border-purple-200 shadow hover:border-purple-300 rounded-xl bg-white/80">
            <Users className="w-6 h-6 mx-auto mb-2 text-purple-600" />
            <div className="text-lg font-semibold text-purple-900">20</div>
            <div className="text-sm text-purple-600">Age</div>
          </div>
        </div>
        {/* Badges Section */}
        <div className="flex items-center justify-between p-4 mb-4 border border-purple-200 shadow rounded-xl bg-white/80">
          <div className="flex items-center space-x-3">
            <Star className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-900">Communication Champion</span>
          </div>
          <span className="px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded hover:bg-purple-200">Level 3</span>
        </div>
        <div className="flex items-center justify-between p-4 mb-4 border border-purple-200 shadow rounded-xl bg-white/80">
          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-900">Cultural Bridge Builder</span>
          </div>
          <span className="px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded hover:bg-purple-200">Expert</span>
        </div>
        <div className="flex items-center justify-between p-4 border border-purple-200 shadow rounded-xl bg-white/80">
          <div className="flex items-center space-x-3">
            <Heart className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-900">Empathy Ambassador</span>
          </div>
          <span className="px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded hover:bg-purple-200">Rising Star</span>
        </div>
      </div>
    </div>
  );
}
