"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import {
  Upload,
  Play,
  Library,
  Clock,
  Target,
  Flame,
  Music,
  Award,
  Zap,
  BarChart3,
} from "lucide-react";

import Link from "next/link";

// Mock data
const mockData = {
  stats: {
    totalTime: 245, // minutes
    accuracy: 87.5,
    streak: 5,
    songsCompleted: 8,
    weeklyGoal: 300, // minutes
    weeklyProgress: 245,
  },
  recentSongs: [
    {
      id: 1,
      title: "All of Me",
      artist: "John Legend",
      progress: 87,
      lastPracticed: "2h atrás",
      difficulty: "intermediate",
      instrument: "piano",
    },
    {
      id: 2,
      title: "Perfect",
      artist: "Ed Sheeran",
      progress: 34,
      lastPracticed: "1 dia atrás",
      difficulty: "beginner",
      instrument: "guitar",
    },
    {
      id: 3,
      title: "Imagine",
      artist: "John Lennon",
      progress: 100,
      lastPracticed: "3 dias atrás",
      difficulty: "intermediate",
      instrument: "piano",
    },
  ],
  weeklyActivity: [
    { day: "Dom", minutes: 0 },
    { day: "Seg", minutes: 45 },
    { day: "Ter", minutes: 30 },
    { day: "Qua", minutes: 60 },
    { day: "Qui", minutes: 40 },
    { day: "Sex", minutes: 70 },
    { day: "Sáb", minutes: 0 },
  ],
  achievements: [
    { id: 1, title: "Primeira Semana", icon: "🔥", unlocked: true },
    { id: 2, title: "Piano Master", icon: "🎹", unlocked: true },
    { id: 3, title: "Velocidade 120 BPM", icon: "⚡", unlocked: false },
    { id: 4, title: "5 Músicas Completas", icon: "📚", unlocked: true },
  ],
};

const AdminDashboard = () => {
  const weeklyProgressPercentage =
    (mockData.stats.weeklyProgress / mockData.stats.weeklyGoal) * 100;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          👋 Bem-vindo de volta, João!
        </h1>
        <p className="mt-2 text-gray-600">
          Continue sua jornada musical de onde parou
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/transcribe">
          <Card
            className="hover:shadow-md 
            transition-shadow cursor-pointer"
          >
            <CardContent className="flex items-center space-x-4 px-6">
              <div
                className="w-12 h-12 bg-gradient-to-r 
                  from-purple-500 to-blue-500 rounded-lg flex items-center justify-center"
              >
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Nova Transcrição</h3>
                <p className="text-sm text-gray-600">Upload nova música</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/practice">
          <Card
            className="hover:shadow-md 
            transition-shadow cursor-pointer"
          >
            <CardContent className="flex items-center space-x-4 px-6">
              <div
                className="w-12 h-12 bg-gradient-to-r 
                from-green-500 to-teal-500 rounded-lg 
                flex items-center justify-center"
              >
                <Play className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Continuar Prática</h3>
                <p className="text-sm text-gray-600">All of Me - 87%</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/songs">
          <Card
            className="hover:shadow-md 
            transition-shadow cursor-pointer"
          >
            <CardContent
              className="flex items-center 
              space-x-4 px-6"
            >
              <div
                className="w-12 h-12 bg-gradient-to-r 
                from-orange-500 to-red-500 rounded-lg 
                flex items-center justify-center"
              >
                <Library className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Ver Todas</h3>
                <p className="text-sm text-gray-600">
                  {mockData.recentSongs.length} músicas
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div
        className="grid grid-cols-1 
        lg:grid-cols-3 gap-8"
      >
        {/* Stats Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Estatísticas Semanais</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div
                    className="text-2xl font-bold text-purple-600 
                    flex items-center justify-center space-x-1"
                  >
                    <Clock className="w-5 h-5" />
                    <span>{mockData.stats.totalTime}m</span>
                  </div>
                  <p className="text-sm text-gray-600">Tempo Prática</p>
                  <p className="text-xs text-green-600">+15% esta semana</p>
                </div>

                <div className="text-center">
                  <div
                    className="text-2xl font-bold text-blue-600 
                    flex items-center justify-center space-x-1"
                  >
                    <Target className="w-5 h-5" />
                    <span>{mockData.stats.accuracy}%</span>
                  </div>
                  <p className="text-sm text-gray-600">Precisão</p>
                  <p className="text-xs text-green-600">+3% esta semana</p>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 flex items-center justify-center space-x-1">
                    <Flame className="w-5 h-5" />
                    <span>{mockData.stats.streak}</span>
                  </div>
                  <p className="text-sm text-gray-600">Sequência</p>
                  <p className="text-xs text-gray-500">Record: 12 dias</p>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 flex items-center justify-center space-x-1">
                    <Music className="w-5 h-5" />
                    <span>{mockData.stats.songsCompleted}</span>
                  </div>
                  <p className="text-sm text-gray-600">Músicas</p>
                  <p className="text-xs text-blue-600">3 novas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Songs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Music className="w-5 h-5" />
                  <span>Músicas Recentes</span>
                </div>
                <Link href="/dashboard/songs">
                  <Button variant="ghost" size="sm">
                    Ver Todas
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.recentSongs.map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center justify-between p-4 
                    bg-gray-50 rounded-lg hover:bg-gray-100 
                    transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-10 h-10 bg-gradient-to-br 
                        from-purple-500 to-blue-500 
                        rounded-lg flex items-center justify-center"
                      >
                        {song.instrument === "piano" ? "🎹" : "🎸"}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {song.title}
                        </h4>
                        <p className="text-sm text-gray-600">{song.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={song.progress}
                            className="w-20 h-2"
                          />
                          <span className="text-sm font-medium">
                            {song.progress}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {song.lastPracticed}
                        </p>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Weekly Goal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Meta Semanal</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progresso</span>
                    <span className="text-sm font-medium">
                      {mockData.stats.weeklyProgress}/
                      {mockData.stats.weeklyGoal}min
                    </span>
                  </div>
                  <Progress value={weeklyProgressPercentage} className="h-3" />
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {mockData.weeklyActivity.map((day, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-gray-500 mb-1">
                        {day.day[0]}
                      </div>
                      <div
                        className={`h-8 rounded ${
                          day.minutes > 0
                            ? "bg-gradient-to-t from-purple-500 to-blue-500"
                            : "bg-gray-200"
                        }`}
                        style={{
                          opacity:
                            day.minutes > 0
                              ? Math.max(0.3, day.minutes / 70)
                              : 0.3,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Conquistas Recentes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockData.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.unlocked
                        ? "bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200"
                        : "bg-gray-50 opacity-60"
                    }`}
                  >
                    <span className="text-xl">{achievement.icon}</span>
                    <div>
                      <p className="text-sm font-medium">{achievement.title}</p>
                      {achievement.unlocked && (
                        <p className="text-xs text-green-600">Desbloqueado!</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Dica do Dia</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="bg-blue-50 border 
                border-blue-200 rounded-lg p-4"
              >
                <p className="text-sm text-blue-800 mb-2">
                  💡 <strong>Pratique regularmente</strong>
                </p>
                <p className="text-xs text-blue-700">
                  Sessões curtas e regulares (15-30min) são mais efetivas que
                  sessões longas esporádicas.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export { AdminDashboard };
