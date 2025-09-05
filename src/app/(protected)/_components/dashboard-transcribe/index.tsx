"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Upload,
  Music,
  FileAudio,
  AlertCircle,
  CheckCircle,
  Loader2,
  Settings,
  Volume2,
  Clock,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const DashboardTranscribe = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  const [isComplete, setIsComplete] = useState(false);
  const [settings, setSettings] = useState({
    instrument: "piano",
    difficulty: "auto",
    tempo: "original",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const processingSteps = [
    {
      name: "Analisando áudio",
      description: "Detectando características do arquivo",
      progress: 20,
    },
    {
      name: "Separando instrumentos",
      description: "Isolando componentes musicais",
      progress: 40,
    },
    {
      name: "Detectando notas",
      description: "Transcrevendo melodia e harmonia",
      progress: 65,
    },
    {
      name: "Gerando versões",
      description: "Criando níveis de dificuldade",
      progress: 85,
    },
    { name: "Finalizando", description: "Preparando tutoriais", progress: 100 },
  ];

  const supportedFormats = [
    { ext: "MP3", desc: "Formato mais comum" },
    { ext: "WAV", desc: "Alta qualidade" },
    { ext: "M4A", desc: "Apple/iTunes" },
    { ext: "OGG", desc: "Open source" },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const startProcessing = async () => {
    setIsProcessing(true);

    for (let i = 0; i < processingSteps.length; i++) {
      setProcessingStep(i);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    setIsProcessing(false);
    setIsComplete(true);
  };

  const resetForm = () => {
    setSelectedFile(null);
    setIsProcessing(false);

    setProcessingStep(0);
    setIsComplete(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div
          className="w-20 h-20 bg-green-100 
            rounded-full flex items-center 
            justify-center mx-auto"
        >
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Transcrição Concluída! 🎉
          </h1>
          <p className="text-gray-600">
            Sua música foi processada com sucesso e está pronta para praticar
          </p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div
                  className="w-12 h-12 bg-gradient-to-br 
                  from-purple-500 to-blue-500 rounded-lg 
                    flex items-center justify-center"
                >
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">{selectedFile?.name}</h3>
                  <p className="text-sm text-gray-600">
                    Piano • C Maior • 120 BPM
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <Badge variant="secondary" className="justify-center">
                  🟢 Fácil
                </Badge>
                <Badge variant="secondary" className="justify-center">
                  🔵 Intermediário
                </Badge>
                <Badge variant="secondary" className="justify-center">
                  🔴 Original
                </Badge>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1">Começar Prática</Button>
                <Button variant="outline">Ver Detalhes</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button variant="outline" onClick={resetForm}>
          Transcrever Outra Música
        </Button>
      </motion.div>
    );
  }

  if (isProcessing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-8"
      >
        <div>
          <h1
            className="text-3xl font-bold 
            text-gray-900 mb-2"
          >
            Processando sua música...
          </h1>
          <p className="text-gray-600">
            Nossa IA está analisando o áudio. Isso pode levar alguns minutos.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="space-y-6">
              {processingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 ${
                    index <= processingStep ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index < processingStep
                        ? "bg-green-100 text-green-600"
                        : index === processingStep
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {index < processingStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : index === processingStep ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{step.name}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <Progress
                  value={processingSteps[processingStep]?.progress || 0}
                  className="h-3"
                />
                <p
                  className="text-sm text-gray-600 
                    mt-2 text-center"
                >
                  {processingSteps[processingStep]?.progress || 0}% completo
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div
          className="bg-blue-50 border 
            border-blue-200 rounded-lg 
            p-4 max-w-md mx-auto"
        >
          <p className="text-sm text-blue-800">
            💡 <strong>Dica:</strong> Arquivos menores e com menos instrumentos
            são processados mais rapidamente.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Nova Transcrição</h1>
        <p className="mt-2 text-gray-600">
          Upload qualquer música e receba partituras inteligentes em minutos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Upload de Áudio</span>
              </CardTitle>
              <CardDescription>
                Arraste e solte seu arquivo ou clique para selecionar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed 
                rounded-lg p-12 text-center transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : selectedFile
                    ? "border-green-300 bg-green-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".mp3,.wav,.m4a,.ogg"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {selectedFile ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div
                      className="w-16 h-16 bg-green-100 
                      rounded-full flex items-center 
                      justify-center mx-auto"
                    >
                      <FileAudio className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {selectedFile.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formatFileSize(selectedFile.size)} •{" "}
                        {selectedFile.type}
                      </p>
                    </div>
                    <div className="flex space-x-2 justify-center">
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-200"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Válido
                      </Badge>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <div
                      className="w-16 h-16 bg-gray-100 rounded-full 
                      flex items-center justify-center mx-auto"
                    >
                      <Music className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {isDragging
                          ? "Solte o arquivo aqui"
                          : "Selecionar arquivo de áudio"}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        ou arraste e solte aqui
                      </p>
                      <Button
                        variant="outline"
                        className="bg-gradient-to-r duration-200 text-white
                      from-purple-600 to-blue-600 transition hover:text-white
                      hover:from-purple-700 hover:to-blue-700"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Escolher Arquivo
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Format Support */}
              <div
                className="mt-6 grid grid-cols-2 
                lg:grid-cols-4 gap-4"
              >
                {supportedFormats.map((format) => (
                  <div
                    key={format.ext}
                    className="text-center p-3 bg-gray-50 rounded-lg"
                  >
                    <p className="font-medium text-sm">{format.ext}</p>
                    <p className="text-xs text-gray-600">{format.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Configurações de Transcrição</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instrument">Instrumento Principal</Label>
                  <Select
                    value={settings.instrument}
                    onValueChange={(value) =>
                      setSettings({ ...settings, instrument: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="piano">🎹 Piano</SelectItem>
                      <SelectItem value="guitar">🎸 Violão</SelectItem>
                      <SelectItem value="voice">🎤 Voz</SelectItem>
                      <SelectItem value="auto">🤖 Auto-detectar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Nível de Dificuldade</Label>
                  <Select
                    value={settings.difficulty}
                    onValueChange={(value) =>
                      setSettings({ ...settings, difficulty: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">🟢 Iniciante</SelectItem>
                      <SelectItem value="intermediate">
                        🔵 Intermediário
                      </SelectItem>
                      <SelectItem value="advanced">🔴 Avançado</SelectItem>
                      <SelectItem value="auto">🎯 Auto-adaptar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tempo">Tempo</Label>
                  <Select
                    value={settings.tempo}
                    onValueChange={(value) =>
                      setSettings({ ...settings, tempo: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slower">⏪ Mais Lento</SelectItem>
                      <SelectItem value="original">⏸️ Original</SelectItem>
                      <SelectItem value="faster">⏩ Mais Rápido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedFile && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="border-t pt-6"
                >
                  <Button
                    onClick={startProcessing}
                    className="w-full bg-gradient-to-r from-purple-600 transition
                    to-blue-600 hover:from-purple-700 hover:to-blue-700 duration-200"
                    size="lg"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Iniciar Transcrição
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                💡 Dicas para Melhor Resultado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <Volume2 className="w-4 h-4 mt-0.5 text-blue-500" />
                  <p>
                    <strong>Áudio claro:</strong> Evite ruído de fundo excessivo
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <Music className="w-4 h-4 mt-0.5 text-green-500" />
                  <p>
                    <strong>Instrumento solo:</strong> Piano ou voz funcionam
                    melhor
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="w-4 h-4 mt-0.5 text-orange-500" />
                  <p>
                    <strong>Duração:</strong> Até 5 minutos para melhor
                    performance
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 text-purple-500" />
                  <p>
                    <strong>Qualidade:</strong> MP3 320kbps ou WAV recomendado
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎯 O que você recebe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className="w-2 h-2 p-0 bg-green-500"
                ></Badge>
                <span>Partitura em 3 níveis de dificuldade</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className="w-2 h-2 p-0 bg-blue-500"
                ></Badge>
                <span>Tutorial interativo personalizado</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className="w-2 h-2 p-0 bg-purple-500"
                ></Badge>
                <span>Fingering automático</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className="w-2 h-2 p-0 bg-orange-500"
                ></Badge>
                <span>Análise harmônica completa</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📊 Estatísticas de Uso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Músicas este mês:</span>
                <span className="font-medium">2/3</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de sucesso:</span>
                <span className="font-medium text-green-600">96%</span>
              </div>
              <div className="flex justify-between">
                <span>Tempo médio:</span>
                <span className="font-medium">45 segundos</span>
              </div>
              <Progress value={67} className="mt-2" />
              <p className="text-xs text-gray-600">
                Upgrade para Pro e tenha músicas ilimitadas
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export { DashboardTranscribe };
