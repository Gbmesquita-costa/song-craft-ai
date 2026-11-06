"use client";

import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "João Silva",
      role: "Pianista Iniciante",
      avatar: "👨‍💼",
      rating: 5,
      text: 'Finalmente consegui tocar "Bohemian Rhapsody"! O SongCraft AI transformou uma música impossível em algo que consigo aprender gradualmente. O sistema de níveis é genial.',
      highlight: "Sistema de níveis é genial",
    },
    {
      name: "Maria Santos",
      role: "Professora de Piano",
      avatar: "👩‍🏫",
      rating: 5,
      text: "Uso o SongCraft AI com meus alunos e eles adoram! O fingering automático me economiza horas de trabalho, e o feedback em tempo real mantém os alunos motivados.",
      highlight: "Economiza horas de trabalho",
    },
    {
      name: "Pedro Costa",
      role: "Escola de Música",
      avatar: "🎓",
      rating: 5,
      text: "Implementamos o SongCraft AI na nossa escola e os resultados são impressionantes. Os alunos progridem 3x mais rápido e o engajamento aumentou muito.",
      highlight: "Progridem 3x mais rápido",
    },
    {
      name: "Ana Oliveira",
      role: "Violonista Amadora",
      avatar: "🎸",
      rating: 5,
      text: "Sempre sonhei em tocar violão mas achava muito difícil. Com o SongCraft AI, aprendi minha primeira música em apenas 2 semanas. É incrível como simplifica tudo!",
      highlight: "Primeira música em 2 semanas",
    },
    {
      name: "Carlos Roberto",
      role: "Músico Profissional",
      avatar: "🎹",
      rating: 5,
      text: "Uso para transcrever músicas dos meus clientes rapidamente. A qualidade da transcrição é impressionante e me poupa muito tempo. Ferramenta indispensável!",
      highlight: "Ferramenta indispensável",
    },
    {
      name: "Lucia Fernandes",
      role: "Aposentada",
      avatar: "👵",
      rating: 5,
      text: "Aos 65 anos decidi aprender piano. O SongCraft AI me deu confiança para perseguir esse sonho. A interface é simples e o aprendizado é muito divertido!",
      highlight: "Simples e divertido",
    },
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
            Músicos{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              reais
            </span>
            , resultados reais
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 1.000 músicos já transformaram sua forma de aprender com o
            SongCraft AI
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 
          md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300">
                <CardContent className="px-6 flex flex-col h-full">
                  <Quote className="w-8 h-8 text-purple-400 mb-4" />

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    &quot;{testimonial.text}&quot;
                  </p>

                  <div className="mt-auto">
                    {/* Highlight */}
                    <div
                      className="bg-purple-50 border 
                      border-purple-200 rounded-lg p-3 mb-4"
                    >
                      <p className="text-sm font-medium text-purple-700">
                        💜 &quot;{testimonial.highlight}&quot;
                      </p>
                    </div>

                    {/* Author */}
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{testimonial.avatar}</div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: "1.000+", label: "Músicos Satisfeitos" },
            { number: "5.000+", label: "Músicas Transcritas" },
            { number: "4.9/5", label: "Avaliação Média" },
            { number: "50.000+", label: "Horas de Prática" },
          ].map((stat, idx) => (
            <div key={idx}>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export { Testimonials };
