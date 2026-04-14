"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BrowserCountry,
  BrowserDate,
} from "@/components/layout/BrowserCountry";
import { GlobalClock } from "@/components/layout/GlobalClock";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/que-horas-sao-agora", label: "Fuso Horario" },
  { href: "/calculadora-idade", label: "Calculadora" },
  { href: "/sobre", label: "Blog" },
];

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      setIsScrolled(currentY > 24);

      if (currentY <= 24) {
        setIsVisible(true);
        lastY = currentY;
        return;
      }

      if (Math.abs(delta) < 6) {
        return;
      }

      if (delta > 0) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClassName = [
    "site-header",
    isScrolled ? "is-scrolled" : "",
    isVisible ? "is-header-visible" : "is-header-hidden",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClassName}>
      <div className="precision-strip">
        <div className="shell-width precision-row">
          <div className="precision-label-group">
            <span className="precision-live-dot" aria-hidden="true" />
            <span className="precision-label">AO VIVO</span>
          </div>
          <div className="precision-meta">
            <BrowserCountry />
            <BrowserDate />
            <GlobalClock variant="inline" />
          </div>
        </div>
      </div>

      <div className="header-panel-shell">
        <div className="shell-width header-panel">
          <div className="brand-row">
            <Link href="/" className="brand-link">
              <span className="brand-mark" aria-hidden="true" />
              <strong className="brand-name">Hora Agora</strong>
            </Link>

            <nav className="main-nav" aria-label="Principal">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="header-actions">
              <label className="search-shell" aria-label="Buscar ferramentas">
                <span className="search-icon" aria-hidden="true">
                  Q
                </span>
                <input
                  type="search"
                  placeholder="Buscar ferramenta"
                  className="search-input"
                />
              </label>
              <Link href="/contato" className="header-cta">
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
