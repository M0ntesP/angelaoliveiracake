import { partyPlanning } from "./site-data.js";

// Converte "R$ 98,00/kg" em 98. Itens sem preço por quilo (ex.: bolos gelados) retornam null.
export function pricePerKg(price) {
  const match = /R\$\s*([\d.]+,\d{2})\s*\/\s*kg/i.exec(price || "");
  return match ? Number(match[1].replace(/\./g, "").replace(",", ".")) : null;
}

// Sugestão de tamanho do bolo para o número de convidados.
export function suggestedKg(guests) {
  const { gramsPerGuest, minimumKg, roundToKg } = partyPlanning;
  if (!Number.isFinite(guests) || guests < 1) return null;
  const raw = (guests * gramsPerGuest) / 1000;
  return Math.max(minimumKg, Math.ceil(raw / roundToKg) * roundToKg);
}

export const formatKg = (kg) => `${kg.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} kg`;
export const formatMoney = (value) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Dias inteiros entre hoje e a data (AAAA-MM-DD) escolhida no formulário.
export function daysUntil(isoDate) {
  if (!isoDate) return null;
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const target = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(target.getTime())) return null;
  return Math.round((target - today) / 86400000);
}

export function leadTimeHint(days) {
  const { decoratedLeadDays, sweetsLeadDays } = partyPlanning;
  if (days === null || days < 0) return null;
  const when = days === 0 ? "A festa é hoje" : days === 1 ? "A festa é amanhã" : `Faltam ${days} dias para a festa`;
  if (days < sweetsLeadDays) {
    return { tone: "urgent", text: `${when}. O prazo está bem curto: envie o pedido agora e a Ângela confirma se ainda consegue atender.` };
  }
  if (days < decoratedLeadDays) {
    return { tone: "soon", text: `${when}. Para doces ainda dá tempo; para bolo decorado o ideal é pedir com ${decoratedLeadDays} dias. Confirme a disponibilidade o quanto antes.` };
  }
  return { tone: "ok", text: `${when}. Ótimo prazo para planejar tudo com calma.` };
}
