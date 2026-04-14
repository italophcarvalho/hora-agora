"use client";

import { useEffect, useState } from "react";

interface AgeBreakdown {
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

const today = new Date().toISOString().slice(0, 10);

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("1995-06-15");
  const [targetDate, setTargetDate] = useState(today);
  const [result, setResult] = useState<AgeBreakdown | null>(null);

  useEffect(() => {
    const birth = new Date(`${birthDate}T00:00:00`);
    const target = new Date(`${targetDate}T00:00:00`);

    if (Number.isNaN(birth.getTime()) || Number.isNaN(target.getTime())) {
      setResult(null);
      return;
    }

    if (target < birth) {
      setResult(null);
      return;
    }

    setResult(calculateAge(birth, target));
  }, [birthDate, targetDate]);

  return (
    <section className="calculator-card">
      <p className="page-kicker">Ferramenta inicial</p>
      <h2>Calculadora de idade</h2>
      <p className="calculator-intro">
        Um widget simples para lancar com seguranca hoje e expandir depois com
        textos mais longos, FAQ maior e blocos contextuais.
      </p>

      <div className="calculator-form">
        <label>
          Data de nascimento
          <input
            type="date"
            value={birthDate}
            max={today}
            onChange={(event) => setBirthDate(event.target.value)}
          />
        </label>
        <label>
          Calcular ate
          <input
            type="date"
            value={targetDate}
            onChange={(event) => setTargetDate(event.target.value)}
          />
        </label>
      </div>

      {result ? (
        <>
          <div className="calculator-results">
            <article className="calculator-result-card">
              <span>Anos</span>
              <strong>{result.years}</strong>
            </article>
            <article className="calculator-result-card">
              <span>Meses</span>
              <strong>{result.months}</strong>
            </article>
            <article className="calculator-result-card">
              <span>Dias</span>
              <strong>{result.days}</strong>
            </article>
          </div>

          <div className="calculator-note">
            Ate a data escolhida, voce viveu aproximadamente{" "}
            <strong>{result.totalDays.toLocaleString("pt-BR")} dias</strong>.
          </div>
        </>
      ) : (
        <div className="calculator-note">
          Escolha uma data final igual ou posterior ao nascimento para ver o
          resultado.
        </div>
      )}
    </section>
  );
}

function calculateAge(birth: Date, target: Date): AgeBreakdown {
  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();

  if (days < 0) {
    const previousMonth = new Date(
      target.getFullYear(),
      target.getMonth(),
      0,
    ).getDate();
    days += previousMonth;
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  const totalDays = Math.floor(
    (target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24),
  );

  return {
    years,
    months,
    days,
    totalDays,
  };
}
