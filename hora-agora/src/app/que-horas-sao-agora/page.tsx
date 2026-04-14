import type { Metadata } from "next";
import { GlobalClock } from "@/components/layout/GlobalClock";

export const metadata: Metadata = {
  title: "Que horas sao agora",
  description:
    "Veja a hora agora no seu dispositivo com atualizacao em tempo real e fuso detectado automaticamente.",
  alternates: {
    canonical: "/que-horas-sao-agora",
  },
};

export default function CurrentTimePage() {
  return (
    <div className="page-stack">
      <section className="page-hero">
        <p className="page-kicker">Pagina de alta intencao</p>
        <h1>Que horas sao agora?</h1>
        <p>
          Esta pagina mostra a hora atual no seu proprio fuso, sem depender de
          configuracao manual. E uma entrega simples, util e alinhada com a
          proposta principal do projeto.
        </p>
        <div className="hero-panel" style={{ marginTop: "1.5rem" }}>
          <span className="panel-label">Hora detectada no navegador</span>
          <GlobalClock variant="hero" />
        </div>
      </section>
    </div>
  );
}
