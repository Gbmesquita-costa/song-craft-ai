import { Star } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const features = [
    { icon: "🎵", text: "3 músicas grátis por mês" },
    { icon: "🤖", text: "Transcrição com IA avançada" },
    { icon: "📊", text: "Análise de progresso detalhada" },
    { icon: "🎹", text: "Suporte para piano e violão" },
    { icon: "📱", text: "Acesso em todos os dispositivos" },
    { icon: "👥", text: "Comunidade de músicos" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Benefits */}
      <div
        className="hidden lg:flex lg:flex-1 
        bg-gradient-to-br from-green-600 to-blue-600"
      >
        <div
          className="flex items-center 
          justify-center p-12 mx-auto"
        >
          <div className="max-w-md text-white space-y-6">
            <div className="text-center">
              <div
                className="flex items-center 
                justify-center space-x-1 mb-4"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-sm opacity-90">
                Avaliado como <strong>5 estrelas</strong> por mais de 1.000
                músicos
              </p>
            </div>

            <h2 className="text-3xl font-bold text-center">
              Junte-se a milhares de músicos
            </h2>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="bg-white/10 rounded-lg p-4 text-center">
              <p className="text-sm">
                <strong>✅ 100% gratuito para começar</strong>
                <br />
                Sem cartão de crédito necessário
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Content */}
      <div
        className="flex-1 flex items-center 
        justify-center py-12 px-4 sm:px-6 
        lg:px-8 bg-white"
      >
        <div className="max-w-md w-full space-y-8">{children}</div>
      </div>
    </div>
  );
};

export { AuthLayout };
