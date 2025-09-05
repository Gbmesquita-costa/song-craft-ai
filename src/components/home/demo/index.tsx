"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import { Upload, Play, Download, Music } from "lucide-react";

import { motion } from "framer-motion";
import Link from "next/link";

const Demo = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const demoSteps = [
    {
      title: "Upload de Áudio",
      description: "Faça upload de qualquer música",
      icon: Upload,
      color: "from-blue-500 to-purple-500",
      preview: (
        <div
          className="bg-gray-50 rounded-lg p-6 
          border-2 border-dashed border-gray-300"
        >
          <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <div className="text-center">
            <div className="font-medium text-gray-900">all-of-me.mp3</div>
            <div className="text-sm text-gray-500">John Legend • 4:28</div>
          </div>
        </div>
      ),
    },
    {
      title: "Análise IA",
      description: "Nossa IA processa e analisa",
      icon: Music,
      color: "from-purple-500 to-pink-500",
      preview: (
        <div className="space-y-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="text-sm font-medium text-green-800">
              ✓ Tonalidade: C Maior
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="text-sm font-medium text-blue-800">✓ BPM: 120</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <div className="text-sm font-medium text-purple-800">
              ✓ Dificuldade: Intermediário
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Partitura + Tutorial",
      description: "Receba partitura e aprenda",
      icon: Download,
      color: "from-pink-500 to-red-500",
      preview: (
        <div className="space-y-4">
          <div className="bg-white border rounded-lg p-4">
            <div className="text-sm font-medium mb-2">
              📚 3 Versões Disponíveis:
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>🟢 Fácil</span>
                <span className="text-gray-500">Simplificado</span>
              </div>
              <div className="flex justify-between">
                <span>🔵 Intermediário</span>
                <span className="text-gray-500">Balanceado</span>
              </div>
              <div className="flex justify-between">
                <span>🔴 Original</span>
                <span className="text-gray-500">Completo</span>
              </div>
            </div>
          </div>
          <Button
            size="sm"
            className="w-full bg-gradient-to-r 
            from-purple-600 to-blue-600 
            hover:from-purple-700 hover:to-blue-700"
          >
            <Play className="w-4 h-4 mr-2 " />
            Começar Prática
          </Button>
        </div>
      ),
    },
  ];

  return (
    <section id="demo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Veja a{" "}
            <span
              className="bg-gradient-to-r from-purple-600 
              to-blue-600 bg-clip-text text-transparent"
            >
              magia
            </span>{" "}
            acontecendo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            De um simples arquivo de áudio para uma experiência completa de
            aprendizado em poucos segundos
          </p>
        </motion.div>

        {/* Demo Steps */}
        <div
          className="grid grid-cols-1 
          lg:grid-cols-3 gap-8 mb-12"
        >
          {demoSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 ${
                  currentStep === index
                    ? "ring-2 ring-purple-500 shadow-lg"
                    : "hover:shadow-md"
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <CardContent className="px-6">
                  {/* Step Header */}
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r 
                      ${step.color} flex items-center justify-center mr-4`}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">
                        Passo {index + 1}
                      </div>
                      <div className="font-semibold text-gray-900">
                        {step.title}
                      </div>
                    </div>
                  </div>

                  {/* Step Description */}
                  <p className="text-gray-600 mb-4">{step.description}</p>

                  {/* Step Preview */}
                  {currentStep === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.preview}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 
              to-blue-600 hover:from-purple-700 
              hover:to-blue-700 text-white px-8 py-4"
            >
              Experimentar Agora Grátis
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-2">
            Sem cartão de crédito • Setup em 30 segundos
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export { Demo };
