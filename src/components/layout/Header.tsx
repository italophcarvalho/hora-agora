import Link from "next/link";
import { GlobalClock } from "@/components/layout/GlobalClock";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/que-horas-sao-agora", label: "Fuso Horario" },
  { href: "/calculadora-idade", label: "Calculadora" },
  { href: "/sobre", label: "Blog" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="shell-width header-panel">
        <div className="brand-row">
          <Link href="/" className="brand-link">
            <span className="brand-mark" aria-hidden="true" />
            <span>
              <strong className="brand-name">Hora Agora</strong>
              <span className="brand-subtitle">
                Curadoria editorial do tempo
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

      <div className="precision-strip">
        <div className="shell-width precision-row">
          <div className="precision-label-group">
            <span className="precision-live-dot" aria-hidden="true" />
            <span className="precision-label">AO VIVO</span>
          </div>
          <div className="precision-meta">
            <span>FUSO BRASIL</span>
            <span>TERCA, 14 DE ABR DE 2026</span>
            <GlobalClock variant="inline" />
          </div>
        </div>
      </div>
    </header>
  );
}
