"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Check, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Pricing = () => {
  const plans = [
    {
      name: "Pro",
      price: "R$29",
      period: "/mês",
      description: "Para músicos sérios",
      badge: "Mais Popular",
      features: [
        "Músicas ilimitadas",
        "Tutoriais completos",
        "Feedback em tempo real",
        "Todos os instrumentos",
        "Fingering automático",
        "Export PDF/MIDI",
        "Análise de progresso",
        "Modo prática avançado",
      ],
      notIncluded: [],
      cta: "Começar Pro",
      ctaVariant: "default" as const,
      popular: true,
    },
    {
      name: "Free",
      price: "R$0",
      description: "Perfeito para começar",
      badge: null,
      features: [
        "3 músicas por mês",
        "Transcrição básica",
        "Partitura em PDF",
        "Suporte da comunidade",
      ],
      notIncluded: [
        "Tutoriais interativos",
        "Feedback em tempo real",
        "Fingering automático",
        "Múltiplos instrumentos",
      ],
      cta: "Começar Grátis",
      ctaVariant: "outline" as const,
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
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
            Escolha seu{" "}
            <span
              className="bg-gradient-to-r from-purple-600 
              to-blue-600 bg-clip-text text-transparent"
            >
              plano
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comece grátis e evolua conforme sua necessidade. Cancele a qualquer
            momento.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div
          className="grid grid-cols-1 max-w-4xl mx-auto
          lg:grid-cols-2 gap-8 mb-12"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative ${plan.popular ? "lg:scale-105" : ""}`}
            >
              <Card
                className={`h-full ${
                  plan.popular
                    ? "border-purple-500 shadow-xl"
                    : "border-gray-200"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div
                    className="absolute -top-4 left-1/2 
                    transform -translate-x-1/2"
                  >
                    <Badge
                      className="bg-gradient-to-r from-purple-600 
                      to-blue-600 text-white px-4 py-1"
                    >
                      {plan.popular ? (
                        <Star className="w-4 h-4 mr-1" />
                      ) : (
                        <Zap className="w-4 h-4 mr-1" />
                      )}
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  <CardTitle
                    className="text-2xl font-bold 
                    text-gray-900 mb-2"
                  >
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}

                    {plan.notIncluded.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center opacity-50"
                      >
                        <div className="w-5 h-5 mr-3 flex-shrink-0" />{" "}
                        {/* Spacer */}
                        <span className="text-gray-500 line-through">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    {plan.name === "Studio" ? (
                      <Button
                        variant={plan.ctaVariant}
                        className="w-full"
                        size="lg"
                      >
                        {plan.cta}
                      </Button>
                    ) : (
                      <Link href="/signup">
                        <Button
                          variant={plan.ctaVariant}
                          className={`w-full ${
                            plan.popular
                              ? `bg-gradient-to-r from-purple-600 
                                to-blue-600 hover:from-purple-700 
                                hover:to-blue-700 text-white`
                              : ""
                          }`}
                          size="lg"
                        >
                          {plan.cta}
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-2xl p-8 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Dúvidas frequentes
          </h3>
          <div
            className="grid grid-cols-1
            md:grid-cols-2 gap-6"
          >
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Posso cancelar a qualquer momento?
              </h4>
              <p className="text-sm text-gray-600">
                Sim, sem compromisso. Cancele quando quiser.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Funciona com qualquer música?
              </h4>
              <p className="text-sm text-gray-600">
                A maioria sim. Melhores resultados com piano/voz solo.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Preciso de equipamento especial?
              </h4>
              <p className="text-sm text-gray-600">
                Não! Funciona no seu computador, tablet ou celular.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Há desconto para estudantes?
              </h4>
              <p className="text-sm text-gray-600">
                Entre em contato conosco para descontos especiais.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { Pricing };
