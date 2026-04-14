import Link from "next/link";
import { GlobalClock } from "@/components/layout/GlobalClock";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/que-horas-sao-agora", label: "Hora agora" },
  { href: "/calculadora-idade", label: "Calculadora de idade" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="header-panel">
        <div className="brand-row">
          <Link href="/" className="brand-link">
            <span className="brand-mark" aria-hidden="true" />
            <span>
              <strong className="brand-name">Hora Agora</strong>
              <span className="brand-subtitle">
                Hora, tempo e datas sem complicacao
              </span>
            </span>
          </Link>

          <nav className="main-nav" aria-label="Principal">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <GlobalClock />
      </div>
    </header>
  );
}
