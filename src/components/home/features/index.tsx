"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

import {
  Music,
  Brain,
  Target,
  Gamepad2,
  Piano,
  BarChart3,
  Zap,
  Shield,
  Smartphone,
  Globe,
  Clock,
  Award,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "IA Transcription Fusion",
      description:
        "Transcrição inteligente com detecção automática de nível e simplificação para iniciantes",
      color: "from-purple-500 to-blue-500",
      details: [
        "Análise harmônica avançada",
        "Detecção de dificuldade",
        "Fingering otimizado",
      ],
    },
    {
      icon: Gamepad2,
      title: "Interactive Learning Engine",
      description:
        "Modo prática com feedback em tempo real, slow-motion e sistema de desafios",
      color: "from-blue-500 to-cyan-500",
      details: [
        "Feedback visual instantâneo",
        "Challenge mode",
        "Desbloqueio progressivo",
      ],
    },
    {
      icon: Piano,
      title: "Multi-Instrument Intelligence",
      description:
        "Suporte inteligente para piano, violão e outros instrumentos com fingering automático",
      color: "from-cyan-500 to-green-500",
      details: ["Piano fingering", "Guitar tabs", "Expansão gradual"],
    },
    {
      icon: Target,
      title: "Adaptive Learning",
      description:
        "Sistema que se adapta ao seu nível e velocidade de aprendizado",
      color: "from-green-500 to-yellow-500",
      details: [
        "Personalização automática",
        "Progresso inteligente",
        "Sugestões contextuais",
      ],
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description:
        "Análise detalhada do seu progresso com insights e recomendações",
      color: "from-yellow-500 to-orange-500",
      details: [
        "Estatísticas detalhadas",
        "Análise de performance",
        "Relatórios semanais",
      ],
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Processamento super rápido com modelos de IA otimizados",
      color: "from-orange-500 to-red-500",
      details: [
        "Transcrição em 30-60s",
        "Feedback instantâneo",
        "Zero latência",
      ],
    },
  ];

  const additionalFeatures = [
    {
      icon: Shield,
      title: "Privacidade Total",
      description: "Seus dados musicais ficam seguros e privados",
    },
    {
      icon: Smartphone,
      title: "Multi-plataforma",
      description: "Funciona em desktop, tablet e mobile",
    },
    {
      icon: Globe,
      title: "Suporte Global",
      description: "Disponível em português e outros idiomas",
    },
    {
      icon: Clock,
      title: "Disponível 24/7",
      description: "Pratique quando quiser, onde quiser",
    },
    {
      icon: Award,
      title: "Qualidade Premium",
      description: "Modelos de IA treinados com milhares de músicas",
    },
    {
      icon: Music,
      title: "Todos os Gêneros",
      description: "Pop, rock, clássico, jazz e muito mais",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl lg:text-5xl 
            font-bold text-gray-900 mb-6"
          >
            Tecnologia de{" "}
            <span
              className="bg-gradient-to-r from-purple-600 
              to-blue-600 bg-clip-text text-transparent"
            >
              ponta
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Combinamos IA avançada, teoria musical e gamificação para criar a
            melhor experiência de aprendizado musical
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div
          className="grid grid-cols-1 
          md:grid-cols-2 lg:grid-cols-3 
          gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className="h-full hover:shadow-lg 
                transition-all duration-300 
                group cursor-pointer"
              >
                <CardContent className="px-6">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r 
                    ${feature.color} flex items-center justify-center mb-4 
                    group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>

                  {/* Feature Details */}
                  <div className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="flex items-center text-sm text-gray-500"
                      >
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2" />
                        {detail}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            E muito mais...
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-3 
                p-4 rounded-lg hover:bg-gray-50 
                transition-colors"
              >
                <div
                  className="w-8 h-8 bg-gradient-to-br 
                  from-purple-500 to-blue-500 rounded-lg 
                  flex items-center justify-center flex-shrink-0"
                >
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { Features };
