"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import {
  Music,
  Home,
  Upload,
  Library,
  Piano,
  BarChart3,
  Settings,
  Menu,
  X,
  Search,
} from "lucide-react";

import { Input } from "@/components/ui/input";

import { motion, AnimatePresence } from "framer-motion";
import { UserAccount } from "./user-account";

interface ProtectedProviderProps {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Nova Transcrição", href: "/dashboard/transcribe", icon: Upload },
  { name: "Minhas Músicas", href: "/dashboard/songs", icon: Library },
  { name: "Modo Prática", href: "/dashboard/practice", icon: Piano },
  { name: "Meu Progresso", href: "/dashboard/progress", icon: BarChart3 },
  { name: "Configurações", href: "/dashboard/settings", icon: Settings },
];

const ProtectedProvider = ({ children }: ProtectedProviderProps) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/25"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl"
            >
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div
        className="hidden lg:fixed lg:inset-y-0 
        lg:left-0 lg:z-50 lg:block lg:w-64 
        lg:bg-white lg:border-r lg:border-gray-200"
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div
          className="sticky top-0 z-40 
        bg-white border-b border-gray-200"
        >
          <div
            className="flex h-16 items-center 
            gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8"
          >
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Search */}
            <div
              className="flex flex-1 gap-x-4 
              self-stretch lg:gap-x-6"
            >
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Buscar
                </label>
                <Search
                  className="pointer-events-none absolute 
                  inset-y-0 left-0 h-full w-5 text-gray-400 ml-3"
                />
                <Input
                  id="search-field"
                  className="block h-full w-full border-none 
                  py-0 pl-11 pr-0 text-gray-900 sm:text-sm
                  focus-visible:ring-0 focus-visible:border-none
                  focus-visible:outline-none shadow-none"
                  placeholder="Buscar músicas..."
                  name="search"
                />
              </form>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main
          className="py-8 px-4 sm:px-6 
          lg:px-8 max-w-[1500px] mx-auto"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div
      className="flex grow flex-col 
      overflow-y-auto bg-white 
      px-6 pb-4 h-full"
    >
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div
            className="w-8 h-8 bg-gradient-to-br from-purple-600 
            to-blue-600 rounded-lg flex items-center justify-center"
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

        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-5">
        <ul role="list" className="-mx-2 space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  pathname === item.href
                    ? "bg-secondary text-primary"
                    : "text-gray-700 hover:text-primary hover:bg-gray-50",
                  `group flex gap-x-3 rounded-l-md p-2 text-sm leading-6 
                  rounded-md font-medium transition-colors`
                )}
                onClick={onClose}
              >
                <item.icon
                  className={cn(
                    pathname === item.href
                      ? "text-primary"
                      : "text-gray-400 group-hover:text-primary",
                    "h-5 w-5 shrink-0"
                  )}
                />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <UserAccount />
    </div>
  );
}

export { ProtectedProvider };
