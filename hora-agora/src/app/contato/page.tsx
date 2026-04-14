import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com o Hora Agora para falar sobre o projeto, feedback de ferramentas ou oportunidades futuras.",
  alternates: {
    canonical: "/contato",
  },
};

export default function ContactPage() {
  return (
    <div className="page-stack">
      <article className="legal-card">
        <p className="page-kicker">Institucional</p>
        <h1>Contato</h1>
        <p>
          Esta pagina existe para facilitar feedback, ajustes de conteudo e
          contato comercial futuro. Se voce quiser testar o site e mandar
          sugestoes, este e o melhor ponto de entrada institucional.
        </p>
        <ul className="contact-list">
          <li>
            E-mail principal:{" "}
            <a href="mailto:contato@horaagora.com.br">
              contato@horaagora.com.br
            </a>
          </li>
          <li>Assunto sugerido: feedback do site, parceria ou correcao de conteudo.</li>
          <li>Tempo de resposta: ate 3 dias uteis, conforme disponibilidade desta fase inicial.</li>
        </ul>
      </article>
    </div>
  );
}
