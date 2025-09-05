"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Music, Menu, X } from "lucide-react";

import { useHeaderScrolled } from "./hooks";

const Header = () => {
  const { isMobileMenuOpen, isScrolled, setIsMobileMenuOpen } =
    useHeaderScrolled();

  const navigation = [
    { name: "Como Funciona", href: "#demo" },
    { name: "Features", href: "#features" },
    { name: "Preços", href: "#pricing" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div
              className="w-8 h-8 bg-gradient-to-r 
              from-purple-500 to-pink-500  rounded-lg 
              flex items-center justify-center"
            >
              <Music className="w-5 h-5 text-white" />
            </div>
            <span
              className="text-xl font-bold bg-gradient-to-r 
              from-purple-600 to-blue-600 bg-clip-text 
              text-transparent"
            >
              SongCraft AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-purple-600 
                transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <>
              <Link href="/signin">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link href="/signup">
                <Button
                  className="bg-gradient-to-r 
                  from-purple-600 to-blue-600 
                  hover:from-purple-700 hover:to-blue-700"
                >
                  Começar Grátis
                </Button>
              </Link>
            </>
            {/* {session ? (
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            ) : (
            )} */}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden bg-white 
          border-t border-gray-200"
        >
          <div className="px-4 py-2 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-gray-700 
                hover:text-purple-600 hover:bg-gray-50 
                rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div
              className="flex flex-col space-y-2 
              pt-4 border-t border-gray-200"
            >
              <>
                <Link href="/signin">
                  <Button variant="outline" className="w-full">
                    Entrar
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    className="w-full bg-gradient-to-r 
                  from-purple-600 to-blue-600 
                  hover:from-purple-700 hover:to-blue-700"
                  >
                    Começar Grátis
                  </Button>
                </Link>
              </>
              {/* {session ? (
                <Link href="/dashboard">
                  <Button className="w-full">Dashboard</Button>
                </Link>
              ) : (
              )} */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export { Header };
