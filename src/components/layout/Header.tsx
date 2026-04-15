"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { VisitorLocationBar } from "@/components/layout/VisitorLocationBar";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/converter-fuso", label: "Fuso Horario" },
  { href: "/calendario", label: "Calendario" },
  { href: "/guia-feriados", label: "Feriados" },
  { href: "/calculadora-idade", label: "Calculadora" },
  { href: "/sobre", label: "Blog" },
];

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isLifted, setIsLifted] = useState(false);
  const liftTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if (currentY <= 24) {
        setIsVisible(true);
        setIsLifted(false);
        lastY = currentY;
        return;
      }

      if (Math.abs(delta) < 6) {
        return;
      }

      if (delta > 0) {
        setIsVisible(false);
        setIsLifted(false);
      } else {
        setIsVisible(true);
        setIsLifted(true);

        if (liftTimeoutRef.current) {
          window.clearTimeout(liftTimeoutRef.current);
        }

        liftTimeoutRef.current = window.setTimeout(() => {
          setIsLifted(false);
        }, 180);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (liftTimeoutRef.current) {
        window.clearTimeout(liftTimeoutRef.current);
      }
    };
  }, []);

  const headerClassName = [
    "site-header",
    isLifted ? "is-lifted" : "",
    isVisible ? "is-header-visible" : "is-header-hidden",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClassName}>
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
            </div>
          </div>
        </div>
      </div>

      <div className="precision-strip">
        <div className="shell-width precision-row">
          <div className="precision-label-group">
            <span className="precision-live-dot" aria-hidden="true" />
            <span className="precision-label">AO VIVO</span>
          </div>
          <VisitorLocationBar />
        </div>
      </div>
    </header>
  );
}
