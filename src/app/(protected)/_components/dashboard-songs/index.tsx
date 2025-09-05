"use client";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
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
  Search,
  Filter,
  Play,
  Download,
  MoreVertical,
  Music,
  Clock,
  Target,
  Trash2,
  Edit,
  Share,
  Star,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const mockSongs = [
  {
    id: 1,
    title: "All of Me",
    artist: "John Legend",
    progress: 87,
    difficulty: "intermediate",
    instrument: "piano",
    duration: "4:28",
    lastPracticed: "2h atrás",
    createdAt: "2024-01-15",
    totalTime: 45,
    accuracy: 89,
    status: "practicing",
    isFavorite: true,
  },
  {
    id: 2,
    title: "Perfect",
    artist: "Ed Sheeran",
    progress: 34,
    difficulty: "beginner",
    instrument: "guitar",
    duration: "3:42",
    lastPracticed: "1 dia atrás",
    createdAt: "2024-01-14",
    totalTime: 23,
    accuracy: 76,
    status: "practicing",
    isFavorite: false,
  },
  {
    id: 3,
    title: "Imagine",
    artist: "John Lennon",
    progress: 100,
    difficulty: "intermediate",
    instrument: "piano",
    duration: "3:03",
    lastPracticed: "3 dias atrás",
    createdAt: "2024-01-12",
    totalTime: 67,
    accuracy: 94,
    status: "completed",
    isFavorite: true,
  },
  {
    id: 4,
    title: "Let It Be",
    artist: "The Beatles",
    progress: 56,
    difficulty: "beginner",
    instrument: "piano",
    duration: "3:47",
    lastPracticed: "1 semana atrás",
    createdAt: "2024-01-10",
    totalTime: 34,
    accuracy: 82,
    status: "practicing",
    isFavorite: false,
  },
  {
    id: 5,
    title: "Wonderwall",
    artist: "Oasis",
    progress: 12,
    difficulty: "intermediate",
    instrument: "guitar",
    duration: "4:18",
    lastPracticed: "2 semanas atrás",
    createdAt: "2024-01-08",
    totalTime: 15,
    accuracy: 68,
    status: "started",
    isFavorite: false,
  },
];

const DashboardSongs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  const [sortBy, setSortBy] = useState("recent");

  const filteredSongs = mockSongs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterBy === "all" ||
      filterBy === song.instrument ||
      filterBy === song.difficulty ||
      filterBy === song.status;

    return matchesSearch && matchesFilter;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-600 bg-green-100";
      case "intermediate":
        return "text-blue-600 bg-blue-100";
      case "advanced":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "practicing":
        return "text-blue-600 bg-blue-100";
      case "started":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completa";
      case "practicing":
        return "Praticando";
      case "started":
        return "Iniciada";
      default:
        return "Desconhecido";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row 
        sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Minhas Músicas</h1>
          <p className="text-gray-600">
            Gerencie e pratique suas {mockSongs.length} músicas transcritas
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r hover:to-pink-700
            from-purple-500 to-pink-500 transition duration-200"
          >
            <Music className="w-4 h-4 mr-2" />
            Nova Música
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div
        className="flex flex-col 
            lg:flex-row gap-4"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search
            className="absolute left-3 
                top-1/2 transform -translate-y-1/2 
                h-4 w-4 text-gray-400"
          />
          <Input
            placeholder="Buscar por nome da música ou artista..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-[150px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="piano">Piano</SelectItem>
              <SelectItem value="guitar">Violão</SelectItem>
              <SelectItem value="beginner">Iniciante</SelectItem>
              <SelectItem value="intermediate">Intermediário</SelectItem>
              <SelectItem value="advanced">Avançado</SelectItem>
              <SelectItem value="completed">Completas</SelectItem>
              <SelectItem value="practicing">Praticando</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recentes</SelectItem>
              <SelectItem value="progress">Progresso</SelectItem>
              <SelectItem value="name">Nome</SelectItem>
              <SelectItem value="artist">Artista</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Songs Grid */}
      <div
        className="grid grid-cols-1 
        md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {filteredSongs.map((song) => (
          <Card key={song.id} className="hover:shadow-md transition-all group">
            <CardContent className="px-6">
              {/* Header */}
              <div
                className="flex items-start 
                justify-between mb-4"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {song.title}
                    </h3>
                    {song.isFavorite && (
                      <Star
                        className="w-4 h-4 
                        text-yellow-500 
                        fill-current"
                      />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {song.artist}
                  </p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 
                      transition-opacity"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Play className="w-4 h-4 mr-2" />
                      Praticar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share className="w-4 h-4 mr-2" />
                      Compartilhar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="w-4 h-4 mr-2" />
                      Baixar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2 text-red-600" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Instrument & Difficulty */}
              <div className="flex items-center space-x-2 mb-3">
                <div
                  className="w-8 h-8 bg-gradient-to-br 
                from-purple-500 to-blue-500 rounded-lg 
                  flex items-center justify-center"
                >
                  {song.instrument === "piano" ? "🎹" : "🎸"}
                </div>
                <Badge
                  className={`text-xs ${getDifficultyColor(song.difficulty)}`}
                >
                  {song.difficulty === "beginner"
                    ? "Iniciante"
                    : song.difficulty === "intermediate"
                    ? "Intermediário"
                    : "Avançado"}
                </Badge>
                <Badge className={`text-xs ${getStatusColor(song.status)}`}>
                  {getStatusLabel(song.status)}
                </Badge>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Progresso</span>
                  <span className="text-sm font-medium">{song.progress}%</span>
                </div>
                <Progress value={song.progress} className="h-2" />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                  <div
                    className="flex items-center justify-center 
                    text-sm font-medium text-gray-900"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {song.totalTime}m
                  </div>
                  <p className="text-xs text-gray-600">Tempo</p>
                </div>
                <div>
                  <div
                    className="flex items-center justify-center 
                    text-sm font-medium text-gray-900"
                  >
                    <Target className="w-3 h-3 mr-1" />
                    {song.accuracy}%
                  </div>
                  <p className="text-xs text-gray-600">Precisão</p>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {song.duration}
                  </div>
                  <p className="text-xs text-gray-600">Duração</p>
                </div>
              </div>

              {/* Last practiced */}
              <p className="text-xs text-gray-500 mb-4">
                Última prática: {song.lastPracticed}
              </p>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r duration-200
                from-purple-600 to-blue-600 transition
                hover:from-purple-700 hover:to-blue-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Praticar
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredSongs.length === 0 && (
        <div className="text-center py-12">
          <div
            className="w-20 h-20 bg-gray-100 rounded-full 
            flex items-center justify-center mx-auto mb-4"
          >
            <Music className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma música encontrada
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm
              ? "Tente ajustar sua busca"
              : "Comece fazendo upload de sua primeira música"}
          </p>
          <Button
            className="bg-gradient-to-r transition
            from-purple-600 to-blue-600 duration-200
            hover:from-purple-700 hover:to-blue-700"
          >
            <Music className="w-4 h-4 mr-2" />
            Nova Transcrição
          </Button>
        </div>
      )}
    </div>
  );
};

export { DashboardSongs };
