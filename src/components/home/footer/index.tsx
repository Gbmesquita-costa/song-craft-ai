import { Music } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerSections = [
    {
      title: "Produto",
      links: [
        { label: "Funcionalidades", href: "#features" },
        { label: "Preços", href: "#pricing" },
        { label: "Demo", href: "#demo" },
        { label: "API", href: "/api-docs" },
      ],
    },
    {
      title: "Suporte",
      links: [
        { label: "Central de Ajuda", href: "/help" },
        { label: "Contato", href: "/contact" },
        { label: "Comunidade", href: "/community" },
        { label: "Status", href: "/status" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacidade", href: "/privacy" },
        { label: "Termos", href: "/terms" },
        { label: "Cookies", href: "/cookies" },
        { label: "Licenças", href: "/licenses" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div
                className="w-8 h-8 bg-primary rounded-lg 
                flex items-center justify-center"
              >
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">SongCraft AI</span>
            </div>
            <p className="text-gray-400">
              Transformando o aprendizado musical com IA avançada.
            </p>
            <div className="flex space-x-4">
              {["Twitter", "YouTube", "Instagram"].map((platform) => (
                <Link
                  key={platform}
                  href="#"
                  className="text-gray-400 
                  hover:text-white transition-colors"
                >
                  {platform}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2 text-gray-400">
                {section.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="hover:text-white 
                      transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="border-t border-gray-800 
          mt-8 pt-8 text-center text-gray-400"
        >
          <p>
            &copy; {currentYear} SongCraft AI. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
