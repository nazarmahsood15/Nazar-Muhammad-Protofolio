"use client";

import { usePathname } from "next/navigation";
import {
  Moon,
  Sun,
  Home,
  User,
  Grid,
  Book,
  Image,
  BookOpen,
  Menu,
  X,
} from "lucide-react";
import { useCallback, useState, useEffect } from "react";
import { useTheme } from "next-themes";

const navItems = [
  { href: "/", label: "Home", icon: <Home size={18} />, section: null },
  { href: "#about", label: "About", icon: <User size={18} />, section: "about" },
  { href: "#work", label: "Work", icon: <Grid size={18} />, section: "projects" },
  { href: "#contact", label: "Contact", icon: <Book size={18} />, section: null },
  { href: "#resume", label: "Resume", icon: <Image size={18} />, section: null },
  {
    href: "#testimonials",
    label: "Testimonials",
    icon: <BookOpen size={18} />,
    section: "testimonials",
  },
];

export default function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true); // avoids hydration mismatch
  }, []);

  const handleNavClick = useCallback((e, item) => {
    e.preventDefault();

    if (item.section && window.scrollToSection && window.sectionRefs) {
      window.scrollToSection(window.sectionRefs[item.section]);
    } else {
      window.location.href = item.href;
    }

    setMenuOpen(false); // close menu on mobile after click
  }, []);

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-4 px-4 sm:px-6 py-2 bg-black/80 backdrop-blur-md border border-gray-700 rounded-full shadow-lg">
        {/* Mobile Menu Button */}
        <button
          className="sm:hidden p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline text-sm">{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-gray-600 mx-2" />

        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 w-48 bg-black/90 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg flex flex-col py-2 sm:hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                }`}
              >
                {item.icon}
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
