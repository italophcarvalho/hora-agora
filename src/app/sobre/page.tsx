import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheca o objetivo do Hora Agora e a estrategia de publicar um MVP hoje para crescer com ferramentas de hora e tempo.",
  alternates: {
    canonical: "/sobre",
  },
};

export default function AboutPage() {
  return (
    <div className="page-stack">
      <article className="legal-card">
        <p className="page-kicker">Institucional</p>
        <h1>Sobre o Hora Agora</h1>
        <p>
          O Hora Agora nasceu para reunir ferramentas simples de hora, datas e
          tempo em um site rapido, claro e util. Em vez de esperar a versao
          perfeita, optamos por publicar um primeiro nucleo funcional para
          validar busca, navegacao e interesse real do publico.
        </p>
        <p>
          O plano e expandir este MVP com paginas de fuso horario, hora por
          cidade, calendario, feriados e conteudo editorial. Assim, o site cresce
          de forma sustentavel sem perder foco em utilidade e desempenho.
        </p>
      </article>
    </div>
  );
}
