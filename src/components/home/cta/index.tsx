import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const CTA = () => {
  return (
    <section
      className="py-20 bg-gradient-to-r transition
      from-purple-600 to-blue-600 duration-300
      hover:from-purple-700 hover:to-blue-700"
    >
      <div
        className="max-w-4xl mx-auto 
        text-center px-4 sm:px-6 lg:px-8"
      >
        <h2
          className="text-3xl md:text-4xl 
          font-bold text-white mb-4"
        >
          Pronto para transformar sua música favorita em aprendizado?
        </h2>
        <p className="text-xl text-white/90 mb-8">
          Junte-se a milhares de músicos que já descobriram uma nova forma de
          aprender
        </p>
        <div
          className="flex flex-col sm:flex-row 
          gap-4 justify-center"
        >
          <Link href="/signup">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white 
              text-purple-700 font-semibold hover:bg-purple-100"
            >
              <Play className="w-5 h-5 mr-2" />
              Começar Gratuitamente
            </Button>
          </Link>
        </div>
        <p className="text-sm text-white mt-6">
          ✅ Sem cartão de crédito • ✅ 3 músicas grátis • ✅ Cancelar a
          qualquer momento
        </p>
      </div>
    </section>
  );
};

export { CTA };
