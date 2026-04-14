import Link from "next/link";
import { GlobalClock } from "@/components/layout/GlobalClock";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <section>
          <h2>Hora Agora</h2>
          <p>
            Lancamento enxuto para colocar o projeto online hoje e abrir espaco
            para as proximas paginas de fuso, calendario e conteudo.
          </p>
        </section>
        <section>
          <h3>Navegacao</h3>
          <div className="footer-links">
            <Link href="/que-horas-sao-agora">Hora atual</Link>
            <Link href="/calculadora-idade">Calculadora de idade</Link>
            <Link href="/sobre">Sobre</Link>
          </div>
        </section>
        <section>
          <h3>Institucional</h3>
          <div className="footer-links">
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/contato">Contato</Link>
          </div>
        </section>
      </div>
      <div className="footer-bottom">
        <span>Projeto em evolucao, com publicacao inicial focada em validar tracao.</span>
        <GlobalClock variant="inline" />
      </div>
    </footer>
  );
}
