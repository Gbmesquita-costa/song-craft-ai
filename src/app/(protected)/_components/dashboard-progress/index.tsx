"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  BarChart3,
  Clock,
  Target,
  Flame,
  Music,
  TrendingUp,
  Award,
  Share,
  Download,
  Zap,
} from "lucide-react";

const mockProgressData = {
  overview: {
    totalTime: 1247, // minutes
    totalSessions: 42,
    averageAccuracy: 87.5,
    streak: 5,
    longestStreak: 12,
    songsCompleted: 8,
    songsInProgress: 4,
  },
  weeklyProgress: [
    { day: "Dom", minutes: 0, sessions: 0, accuracy: 0 },
    { day: "Seg", minutes: 45, sessions: 2, accuracy: 85 },
    { day: "Ter", minutes: 30, sessions: 1, accuracy: 89 },
    { day: "Qua", minutes: 60, sessions: 3, accuracy: 83 },
    { day: "Qui", minutes: 40, sessions: 2, accuracy: 91 },
    { day: "Sex", minutes: 70, sessions: 3, accuracy: 88 },
    { day: "Sáb", minutes: 0, sessions: 0, accuracy: 0 },
  ],
  monthlyStats: [
    { month: "Jan", time: 380, accuracy: 82, songs: 3 },
    { month: "Fev", time: 420, accuracy: 85, songs: 2 },
    { month: "Mar", time: 447, accuracy: 87.5, songs: 3 },
  ],
  songsByStatus: {
    completed: 8,
    practicing: 4,
    started: 1,
  },
  achievements: [
    {
      id: 1,
      title: "Primeira Semana",
      description: "Complete 7 dias de prática",
      icon: "🔥",
      unlocked: true,
      unlockedAt: "2024-01-10",
    },
    {
      id: 2,
      title: "Piano Master",
      description: "Domine 5 músicas no piano",
      icon: "🎹",
      unlocked: true,
      unlockedAt: "2024-01-18",
    },
    {
      id: 3,
      title: "Velocidade 120 BPM",
      description: "Toque uma música a 120 BPM com 90%+ precisão",
      icon: "⚡",
      unlocked: false,
      progress: 75,
    },
    {
      id: 4,
      title: "Biblioteca Completa",
      description: "Tenha 10+ músicas na biblioteca",
      icon: "📚",
      unlocked: true,
      unlockedAt: "2024-01-20",
    },
  ],
  insights: [
    {
      type: "positive",
      title: "Ótima Consistência!",
      description: "Sua precisão melhorou 12% em sessões de 25+ minutos",
      icon: "📈",
    },
    {
      type: "tip",
      title: "Piano é seu Forte",
      description: "Você tem 15% mais precisão em piano do que violão",
      icon: "🎹",
    },
    {
      type: "suggestion",
      title: "Horário Ideal",
      description:
        "Pratique de manhã para melhor performance (94% precisão média)",
      icon: "⏰",
    },
  ],
};

const DashboardProgress = () => {
  const totalMinutesThisWeek = mockProgressData.weeklyProgress.reduce(
    (sum, day) => sum + day.minutes,
    0
  );

  const weeklyGoal = 300;
  const weeklyProgressPercentage = (totalMinutesThisWeek / weeklyGoal) * 100;

  const getInsightColor = (type: string) => {
    switch (type) {
      case "positive":
        return "text-green-700 bg-green-50 border-green-200";
      case "tip":
        return "text-blue-700 bg-blue-50 border-blue-200";
      case "suggestion":
        return "text-purple-700 bg-purple-50 border-purple-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row 
        sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meu Progresso</h1>
          <p className="text-gray-600">
            Acompanhe sua evolução musical e descubra insights personalizados
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-32" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Semana</SelectItem>
              <SelectItem value="month">Mês</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div
              className="w-12 h-12 bg-gradient-to-br 
            from-purple-500 to-blue-500 rounded-lg 
              flex items-center justify-center mx-auto mb-4"
            >
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {Math.floor(mockProgressData.overview.totalTime / 60)}h{" "}
              {mockProgressData.overview.totalTime % 60}m
            </div>
            <p className="text-sm text-gray-600">Tempo Total</p>
            <div className="flex items-center justify-center mt-2 text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span className="text-xs">+15% este mês</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div
              className="w-12 h-12 bg-gradient-to-br 
              from-green-500 to-teal-500 rounded-lg 
              flex items-center justify-center mx-auto mb-4"
            >
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {mockProgressData.overview.averageAccuracy}%
            </div>
            <p className="text-sm text-gray-600">Precisão Média</p>
            <div
              className="flex items-center 
              justify-center mt-2 text-green-600"
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              <span className="text-xs">+3% este mês</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div
              className="w-12 h-12 bg-gradient-to-br 
            from-orange-500 to-red-500 rounded-lg 
              flex items-center justify-center mx-auto mb-4"
            >
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {mockProgressData.overview.streak}
            </div>
            <p className="text-sm text-gray-600">Sequência</p>
            <div className="text-xs text-gray-500 mt-2">
              Record: {mockProgressData.overview.longestStreak} dias
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div
              className="w-12 h-12 bg-gradient-to-br 
            from-blue-500 to-indigo-500 rounded-lg 
              flex items-center justify-center mx-auto mb-4"
            >
              <Music className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {mockProgressData.overview.songsCompleted}
            </div>
            <p className="text-sm text-gray-600">Músicas Completas</p>
            <div
              className="flex items-center 
              justify-center mt-2 text-blue-600"
            >
              <span className="text-xs">+3 este mês</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div
        className="grid grid-cols-1 
        lg:grid-cols-3 gap-8"
      >
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Prática Semanal</span>
              </CardTitle>
              <CardDescription>
                Sua atividade dos últimos 7 dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-2">
                  {mockProgressData.weeklyProgress.map((day, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-gray-500 mb-2">
                        {day.day}
                      </div>
                      <div
                        className="bg-gradient-to-t from-purple-500 
                        to-blue-500 rounded-sm mx-auto"
                        style={{
                          height: `${Math.max(8, (day.minutes / 70) * 100)}px`,
                          width: "24px",
                          opacity: day.minutes > 0 ? 1 : 0.3,
                        }}
                      />
                      <div className="text-xs text-gray-600 mt-2">
                        {day.minutes}m
                      </div>
                      {day.sessions > 0 && (
                        <div className="text-xs text-gray-500">
                          {day.sessions} sessões
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div
                    className="flex justify-between 
                    text-sm text-gray-600 mb-2"
                  >
                    <span>
                      Meta semanal: {totalMinutesThisWeek}/{weeklyGoal} min
                    </span>
                    <span>{Math.round(weeklyProgressPercentage)}%</span>
                  </div>
                  <Progress value={weeklyProgressPercentage} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Songs by Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Music className="w-5 h-5" />
                <span>Músicas por Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className="flex items-center justify-between p-4 
                bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-green-500" />
                    <span className="font-medium">
                      Dominadas ({mockProgressData.songsByStatus.completed})
                    </span>
                  </div>
                  <div className="w-32">
                    <Progress value={80} className="h-2" />
                  </div>
                </div>

                <div
                  className="flex items-center justify-between 
                  p-4 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-blue-500" />
                    <span className="font-medium">
                      Praticando ({mockProgressData.songsByStatus.practicing})
                    </span>
                  </div>
                  <div className="w-32">
                    <Progress value={60} className="h-2" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-orange-500" />
                    <span className="font-medium">
                      Iniciadas ({mockProgressData.songsByStatus.started})
                    </span>
                  </div>
                  <div className="w-32">
                    <Progress value={20} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Insights Personalizados</span>
              </CardTitle>
              <CardDescription>
                Descobrimos alguns padrões no seu aprendizado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProgressData.insights.map((insight, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 ${getInsightColor(
                      insight.type
                    )}`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-xl">{insight.icon}</span>
                      <div>
                        <h4 className="font-medium mb-1">{insight.title}</h4>
                        <p className="text-sm opacity-90">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Conquistas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockProgressData.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-lg border ${
                      achievement.unlocked
                        ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200"
                        : "bg-gray-50 border-gray-200 opacity-75"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">
                          {achievement.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2">
                          {achievement.description}
                        </p>

                        {achievement.unlocked ? (
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="secondary"
                              className="text-xs bg-green-100 text-green-700"
                            >
                              Desbloqueado
                            </Badge>
                            {achievement.unlockedAt && (
                              <span className="text-xs text-gray-500">
                                {new Date(
                                  achievement.unlockedAt
                                ).toLocaleDateString("pt-BR")}
                              </span>
                            )}
                          </div>
                        ) : achievement.progress ? (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progresso</span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <Progress
                              value={achievement.progress}
                              className="h-1.5"
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📊 Resumo do Mês</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-blue-600">
                    {mockProgressData.overview.totalSessions}
                  </div>
                  <div className="text-xs text-blue-700">Sessões</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-purple-600">13</div>
                  <div className="text-xs text-purple-700">Músicas</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tempo médio/sessão:</span>
                  <span className="font-medium">
                    {Math.round(
                      mockProgressData.overview.totalTime /
                        mockProgressData.overview.totalSessions
                    )}
                    m
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Melhor dia:</span>
                  <span className="font-medium">Sexta (70m)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Instrumento favorito:</span>
                  <span className="font-medium">🎹 Piano</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compare */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🏆 Compare-se</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div
                  className="flex items-center justify-between p-3 
                bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span>Você vs Média</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700">+23%</Badge>
                </div>

                <div className="text-xs text-gray-600">
                  <p>
                    Você pratica 23% mais que a média dos usuários de nível
                    intermediário!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export { DashboardProgress };
