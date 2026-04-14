import Link from "next/link";
import { GlobalClock } from "@/components/layout/GlobalClock";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell-width footer-grid">
        <section>
          <h2>Hora Agora</h2>
          <p>
            Uma biblioteca digital para quem trata hora, agenda e previsao como
            materia de precisao.
          </p>
          <div className="footer-socials" aria-label="Redes sociais">
            <a href="/sobre">X</a>
            <a href="/sobre">IG</a>
            <a href="/sobre">IN</a>
          </div>
        </section>
        <section>
          <h3>Navegacao</h3>
          <div className="footer-links">
            <Link href="/que-horas-sao-agora">Fuso Horario</Link>
            <Link href="/calculadora-idade">Calculadora de idade</Link>
            <Link href="/sobre">Blog editorial</Link>
          </div>
        </section>
        <section>
          <h3>Legal</h3>
          <div className="footer-links">
            <Link href="/sobre">Sobre</Link>
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/contato">Contato</Link>
          </div>
        </section>
        <section>
          <h3>Hora Local</h3>
          <div className="footer-clock-card">
            <span className="footer-clock-label">BRASIL AO VIVO</span>
            <GlobalClock variant="inline" />
          </div>
        </section>
      </div>
      <div className="shell-width footer-bottom">
        <span>Editorial Chronology for Hora Agora.</span>
        <span>Conteudo inicial, pronto para expandir.</span>
      </div>
    </footer>
  );
}
