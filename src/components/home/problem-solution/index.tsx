"use client";

import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { X, Check } from "lucide-react";

const ProblemSolution = () => {
  const problems = [
    "Partitura não existe para sua música favorita",
    "Muito difícil para seu nível atual",
    "Não sabe onde colocar os dedos",
    "Aprende devagar sem feedback",
    "Não sabe se está tocando certo",
  ];

  const solutions = [
    "Qualquer MP3 vira partitura em segundos",
    "3 níveis automáticos: Fácil → Intermediário → Original",
    "Fingering automático com IA",
    "Feedback visual em tempo real",
    "Correção automática e sugestões",
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Cansado desses <span className="text-red-500">problemas</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sabemos como é frustrante querer tocar sua música favorita e não
            conseguir. Por isso criamos o SongCraft AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-red-200 bg-red-50/50">
              <CardContent className="px-8 py-6">
                <h3
                  className="text-2xl font-bold 
                  text-red-700 mb-6 flex items-center"
                >
                  <X className="w-6 h-6 mr-2" />
                  Problemas Comuns
                </h3>
                <div className="space-y-4">
                  {problems.map((problem, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{problem}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card
              className="border-green-200 
              bg-green-50/50"
            >
              <CardContent className="px-8 py-6">
                <h3
                  className="text-2xl font-bold 
                  text-green-700 mb-6 flex items-center"
                >
                  <Check className="w-6 h-6 mr-2" />
                  Com SongCraft AI
                </h3>
                <div className="space-y-4">
                  {solutions.map((solution, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <Check
                        className="w-5 h-5 text-green-500 
                        mr-3 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700">{solution}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { ProblemSolution };
