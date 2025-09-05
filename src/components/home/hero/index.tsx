"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Play, Upload, Star, Users, Clock, Music, X } from "lucide-react";

import { motion } from "framer-motion";

const Hero = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

  return (
    <section
      className="relative pt-20 pb-16 
      lg:pt-32 lg:pb-24 overflow-hidden"
    >
      {/* Background Elements */}
      <div
        className="absolute inset-0 bg-gradient-to-br 
        from-purple-50 via-blue-50 to-indigo-100"
      />
      <div
        className="absolute inset-0 
        bg-grid-pattern opacity-5"
      />

      {/* Floating Musical Notes */}
      <div
        className="absolute inset-0 
        overflow-hidden pointer-events-none"
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-purple-200 text-4xl"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [-10, 10, -10],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ♪
          </motion.div>
        ))}
      </div>

      <div
        className="relative max-w-7xl 
        mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div
          className="grid grid-cols-1 
          lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 
              bg-purple-100 text-purple-700 rounded-full 
              text-sm font-medium mb-8"
            >
              <Star className="w-4 h-4 mr-2" />
              IA Musical Avançada
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl lg:text-6xl font-bold leading-tight mb-6"
            >
              <span
                className="bg-gradient-to-r from-purple-600 
                via-blue-600 to-indigo-600 bg-clip-text 
                text-transparent"
              >
                Transforme
              </span>
              <br />
              qualquer música em sua próxima lição
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Upload qualquer música e receba partituras inteligentes, tutoriais
              personalizados e feedback em tempo real. Aprenda piano e violão
              como nunca antes.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 
              justify-center lg:justify-start mb-8"
            >
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r w-full
                  from-purple-600 to-blue-600 
                  hover:from-purple-700 hover:to-blue-700 
                  text-white px-8 py-4 text-lg"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Começar Grátis
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg"
                onClick={() => setIsVideoPlaying(true)}
              >
                <Play className="w-5 h-5 mr-2" />
                Ver Demo
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center justify-center 
              lg:justify-start space-x-6 text-sm text-gray-500"
            >
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>1.000+ músicos</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>Setup em 30s</span>
              </div>
              <div className="flex items-center">
                <Star
                  className="w-4 h-4 mr-1 
                  text-yellow-400 fill-current"
                />
                <span>4.9/5 avaliação</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Demo Visual */}
            <div className="relative">
              <div
                className="bg-white rounded-2xl shadow-2xl p-6 
                transform rotate-3 hover:rotate-0 
                transition-transform duration-300"
              >
                <div
                  className="bg-gradient-to-br from-purple-100 
                  to-blue-100 rounded-xl p-8 text-center"
                >
                  <div
                    className="w-16 h-16 bg-gradient-to-br 
                    from-purple-500 to-blue-500 rounded-full 
                    flex items-center justify-center mx-auto mb-4"
                  >
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Upload de Música
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Arraste qualquer arquivo MP3 ou cole link do YouTube
                  </p>
                  <div
                    className="bg-white rounded-lg p-4 
                    border-2 border-dashed border-gray-300"
                  >
                    <div className="text-purple-600 font-medium">
                      all-of-me.mp3
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      3.2 MB • 4:28
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Results Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -top-4 -right-4 
                bg-white rounded-xl shadow-lg p-4 border"
              >
                <div className="text-xs text-gray-500 mb-1">Análise IA</div>
                <div className="text-sm font-medium text-green-600">
                  ✓ C Maior • 120 BPM
                </div>
                <div className="text-sm font-medium text-blue-600">
                  ✓ Nível: Intermediário
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 
                bg-white rounded-xl shadow-lg p-4 border"
              >
                <div className="text-xs text-gray-500 mb-1">Resultado</div>
                <div className="text-sm font-medium text-purple-600">
                  🎼 Partitura gerada
                </div>
                <div className="text-sm font-medium text-indigo-600">
                  🎹 3 níveis disponíveis
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div
          className="fixed inset-0 bg-black/80 flex 
          items-center justify-center z-50 p-4"
        >
          <div
            className="relative bg-white 
            rounded-2xl p-6 max-w-4xl w-full"
          >
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute top-4 right-4 cursor-pointer
              text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <div
              className="aspect-video bg-gray-100 
              rounded-xl flex items-center justify-center"
            >
              <div className="text-center">
                <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Demo em desenvolvimento</p>
                <p className="text-sm text-gray-500 mt-2">
                  Em breve: vídeo completo mostrando todas as funcionalidades
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export { Hero };
