import type { Metadata } from "next";
import { AdSlot } from "@/components/layout/AdSlot";
import { AgeCalculator } from "@/components/tools/AgeCalculator";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Calculadora de idade",
  description:
    "Calcule a idade em anos, meses e dias com uma ferramenta simples, leve e pronta para evoluir com SEO e monetizacao futura.",
  alternates: {
    canonical: "/calculadora-idade",
  },
};

const faqItems = [
  {
    question: "Como a idade e calculada?",
    answer:
      "A ferramenta compara a data de nascimento com a data final escolhida e separa o resultado em anos, meses e dias.",
  },
  {
    question: "Posso calcular a idade em uma data futura?",
    answer:
      "Sim. Basta trocar o campo de data final para qualquer dia posterior ao nascimento.",
  },
  {
    question: "Os anuncios vao aparecer agora?",
    answer:
      "Nao. Os blocos estao preparados no codigo, mas ficam invisiveis em producao enquanto a flag de AdSense estiver desligada.",
  },
];

export default function AgeCalculatorPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    url: `${getSiteUrl()}/calculadora-idade`,
  };

  return (
    <div className="page-stack">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="page-hero">
        <p className="page-kicker">MVP de monetizacao futura</p>
        <h1>Calculadora de idade</h1>
        <p>
          Esta e a primeira ferramenta utilitaria do lancamento. Ela resolve uma
          necessidade clara, tem boa intencao de busca e nos ajuda a publicar um
          site funcional antes de expandir para mais paginas.
        </p>
      </section>

      <AgeCalculator />
      <AdSlot slot="age-calculator-top" />

      <section className="legal-card">
        <h2>O que ja vale nesta primeira versao</h2>
        <p>
          O foco de hoje e colocar uma base confiavel no ar. Por isso, esta
          pagina ja tem widget funcional, metadata propria, estrutura preparada
          para FAQ e espaco reservado para monetizacao futura sem exibir
          anuncios antes da aprovacao.
        </p>
        <p>
          Nas proximas iteracoes, podemos ampliar o conteudo educativo, adicionar
          resultados mais ricos e conectar esta pagina com outras ferramentas do
          mesmo silo, como calculadora entre datas e dias uteis.
        </p>

        <h3>Perguntas frequentes</h3>
        <ul className="calculator-faq">
          {faqItems.map((item) => (
            <li key={item.question}>
              <strong>{item.question}</strong> {item.answer}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
