import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de privacidade",
  description:
    "Veja como o Hora Agora trata dados basicos de navegacao, cookies e futuras integracoes de analytics e publicidade.",
  alternates: {
    canonical: "/privacidade",
  },
};

export default function PrivacyPage() {
  return (
    <div className="page-stack">
      <article className="legal-card">
        <p className="page-kicker">Institucional</p>
        <h1>Politica de privacidade</h1>
        <p>
          O Hora Agora coleta o minimo necessario para operar o site e entender
          seu desempenho. Nesta fase inicial, alguns recursos de analytics e
          publicidade podem estar desativados ate que sejam configurados de forma
          adequada.
        </p>

        <h2>Informacoes tecnicas</h2>
        <ul>
          <li>O navegador pode enviar dados padrao, como IP, user agent e horario de acesso.</li>
          <li>Servicos de hospedagem e seguranca podem registrar acessos para estabilidade e prevencao de abuso.</li>
          <li>Quando o analytics for ativado, a medicao sera usada para entender paginas vistas e performance do site.</li>
        </ul>

        <h2>Cookies e publicidade</h2>
        <p>
          O codigo do site ja pode conter espacos preparados para publicidade,
          mas os anuncios podem ficar invisiveis ate a ativacao explicita dessa
          funcionalidade. Quando isso acontecer, esta politica podera ser
          atualizada para refletir o uso de cookies e parceiros de anuncios.
        </p>
      </article>
    </div>
  );
}
