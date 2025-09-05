"use client";

import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Settings,
  Target,
  Repeat,
  ArrowLeft,
  CheckCircle,
  RotateCcw,
  Lightbulb,
  Piano,
} from "lucide-react";

const mockSong = {
  id: 1,
  title: "All of Me",
  artist: "John Legend",
  progress: 87,
  difficulty: "intermediate",
  instrument: "piano",
  duration: 268, // seconds
  sections: [
    {
      id: 1,
      name: "Intro",
      progress: 100,
      measures: 8,
      isActive: false,
      isCompleted: true,
    },
    {
      id: 2,
      name: "Verso 1",
      progress: 87,
      measures: 16,
      isActive: true,
      isCompleted: false,
    },
    {
      id: 3,
      name: "Refrão",
      progress: 0,
      measures: 8,
      isActive: false,
      isCompleted: false,
    },
    {
      id: 4,
      name: "Verso 2",
      progress: 0,
      measures: 16,
      isActive: false,
      isCompleted: false,
    },
    {
      id: 5,
      name: "Refrão 2",
      progress: 0,
      measures: 8,
      isActive: false,
      isCompleted: false,
    },
    {
      id: 6,
      name: "Ponte",
      progress: 0,
      measures: 8,
      isActive: false,
      isCompleted: false,
    },
  ],
};

const mockPracticeStats = {
  sessionTime: 1234, // seconds
  accuracy: 87,
  streak: 5,
  notesPlayed: 1847,
  errorsCount: 23,
  currentBPM: 80,
  originalBPM: 120,
};

const DashboardPractice = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(45); // seconds

  const [volume, setVolume] = useState([75]);
  const [bpm, setBpm] = useState([80]);

  const [practiceSettings, setPracticeSettings] = useState({
    metronome: false,
    slowMode: true,
    showTips: true,
    autoAdvance: false,
    loopSection: true,
  });

  // Mock timer for current time
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const getSectionStatus = (section: any) => {
    if (section.isCompleted) return "completed";
    if (section.isActive) return "active";
    if (section.progress > 0) return "started";

    return "pending";
  };

  const getSectionIcon = (section: any) => {
    const status = getSectionStatus(section);
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "active":
        return <Play className="w-4 h-4 text-blue-600" />;
      case "started":
        return <RotateCcw className="w-4 h-4 text-orange-600" />;
      default:
        return (
          <span
            className="w-4 h-4 rounded-full bg-gray-300 
            flex items-center justify-center text-xs"
          >
            {section.id}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1
              className="text-2xl 
              font-bold text-gray-900"
            >
              Modo Prática
            </h1>
            <p className="text-gray-600">
              {mockSong.title} - {mockSong.artist}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right text-sm">
            <div className="font-medium">
              {formatTime(mockPracticeStats.sessionTime)}
            </div>
            <div className="text-gray-500">Tempo de sessão</div>
          </div>
          <div className="text-right text-sm">
            <div className="font-medium text-green-600">
              {mockPracticeStats.accuracy}%
            </div>
            <div className="text-gray-500">Precisão</div>
          </div>
          <div className="text-right text-sm">
            <div className="font-medium text-orange-600">
              {mockPracticeStats.streak}
            </div>
            <div className="text-gray-500">Sequência</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Practice Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Progress Section */}
          <Card>
            <CardContent className="px-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">
                    Progresso: Seção 2/6 - Verso 1
                  </h3>
                  <p className="text-sm text-gray-600">4 compassos restantes</p>
                </div>
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-200"
                >
                  {mockSong.difficulty === "intermediate"
                    ? "Intermediário"
                    : mockSong.difficulty}
                </Badge>
              </div>
              <Progress value={35} className="h-3" />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Seção atual: 87%</span>
                <span>Total: 35%</span>
              </div>
            </CardContent>
          </Card>

          {/* Sheet Music Area */}
          <Card>
            <CardContent className="p-8">
              <div
                className="bg-gradient-to-br from-purple-50 
                to-blue-50 rounded-lg p-8 min-h-[300px] 
                flex items-center justify-center border-2 
                border-dashed border-purple-200"
              >
                <div className="text-center space-y-4">
                  <div
                    className="w-16 h-16 bg-gradient-to-br 
                    from-purple-500 to-blue-500 rounded-full 
                    flex items-center justify-center mx-auto"
                  >
                    <Piano className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      🎼 Partitura Interativa
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Aqui apareceria a partitura com notas destacadas em tempo
                      real
                    </p>
                    <div
                      className="inline-block bg-blue-100 border 
                    border-blue-200 rounded-lg px-4 py-2"
                    >
                      <p className="text-blue-800 font-medium">💡 DICA ATUAL</p>
                      <p className="text-blue-700 text-sm">
                        Mantenha os dedos curvados e relaxados
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audio Controls */}
          <Card>
            <CardContent className="px-6">
              <div className="space-y-6">
                {/* Playback Controls */}
                <div
                  className="flex items-center 
                  justify-center space-x-4"
                >
                  <Button variant="outline" size="sm">
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant={"outline"}
                    onClick={togglePlayback}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </Button>
                  <Button variant="outline" size="sm">
                    <SkipForward className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Repeat className="w-4 h-4" />
                  </Button>
                </div>

                {/* Timeline */}
                <div className="space-y-2">
                  <div
                    className="flex justify-between 
                    text-sm text-gray-600"
                  >
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(mockSong.duration)}</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 
                        to-blue-500 h-2 rounded-full"
                        style={{
                          width: `${(currentTime / mockSong.duration) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Tempo & Volume Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* BPM Control */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">
                        Velocidade: {bpm[0]} BPM
                      </Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setBpm([mockPracticeStats.originalBPM])}
                      >
                        Reset {mockPracticeStats.originalBPM}
                      </Button>
                    </div>
                    <Slider
                      value={bpm}
                      onValueChange={setBpm}
                      max={200}
                      min={40}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  {/* Volume Control */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4" />
                      <Label className="text-sm font-medium">
                        Volume: {volume[0]}%
                      </Label>
                    </div>
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Section */}
          <Card>
            <CardHeader>
              <CardTitle
                className="text-lg flex 
                items-center space-x-2"
              >
                <Target className="w-5 h-5" />
                <span>Seção Atual</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900">Verso 1</h4>
                  <p className="text-sm text-blue-700">
                    4 compassos • 16 medidas
                  </p>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-blue-600 mb-1">
                      <span>Progresso</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Marcar como Completa
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* All Sections */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📋 Todas as Seções</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockSong.sections.map((section) => (
                  <div
                    key={section.id}
                    className={`flex items-center justify-between 
                    p-3 rounded-lg cursor-pointer transition-colors ${
                      section.isActive
                        ? "bg-blue-50 border border-blue-200"
                        : section.isCompleted
                        ? "bg-green-50 border border-green-200"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {getSectionIcon(section)}
                      <div>
                        <div className="text-sm font-medium">
                          {section.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {section.measures} medidas
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium">
                        {section.progress}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Practice Settings */}
          <Card>
            <CardHeader>
              <CardTitle
                className="text-lg flex 
                items-center space-x-2"
              >
                <Settings className="w-5 h-5" />
                <span>Configurações</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="metronome" className="text-sm">
                  Metrônomo
                </Label>
                <Switch
                  id="metronome"
                  checked={practiceSettings.metronome}
                  onCheckedChange={(checked) =>
                    setPracticeSettings({
                      ...practiceSettings,
                      metronome: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="slowMode" className="text-sm">
                  Modo Lento
                </Label>
                <Switch
                  id="slowMode"
                  checked={practiceSettings.slowMode}
                  onCheckedChange={(checked) =>
                    setPracticeSettings({
                      ...practiceSettings,
                      slowMode: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="showTips" className="text-sm">
                  Mostrar Dicas
                </Label>
                <Switch
                  id="showTips"
                  checked={practiceSettings.showTips}
                  onCheckedChange={(checked) =>
                    setPracticeSettings({
                      ...practiceSettings,
                      showTips: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="loopSection" className="text-sm">
                  Repetir Seção
                </Label>
                <Switch
                  id="loopSection"
                  checked={practiceSettings.loopSection}
                  onCheckedChange={(checked) =>
                    setPracticeSettings({
                      ...practiceSettings,
                      loopSection: checked,
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Daily Goals */}
          <Card>
            <CardHeader>
              <CardTitle
                className="text-lg flex 
                items-center space-x-2"
              >
                <Target className="w-5 h-5" />
                <span>Objetivos Hoje</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="line-through text-gray-500">
                  Completar Verso 1
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div
                  className="w-4 h-4 rounded-full border-2 
                border-blue-500 flex items-center justify-center"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
                <span>Praticar 20 minutos</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                <span className="text-gray-600">Precisão {">"} 85%</span>
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progresso diário</span>
                  <span>20/20 min</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle
                className="text-lg flex 
                items-center space-x-2"
              >
                <Lightbulb className="w-5 h-5" />
                <span>Dicas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div
                  className="bg-yellow-50 border 
                border-yellow-200 rounded-lg p-3"
                >
                  <p className="text-yellow-800">
                    <strong>🎹 Postura:</strong> Mantenha os pulsos retos e
                    dedos curvados
                  </p>
                </div>
                <div
                  className="bg-blue-50 border 
                border-blue-200 rounded-lg p-3"
                >
                  <p className="text-blue-800">
                    <strong>⏱️ Tempo:</strong> Pratique devagar primeiro,
                    velocidade vem depois
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

export { DashboardPractice };
