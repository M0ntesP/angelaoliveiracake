import bolos from "@/assets/bolos.jpg";
import doces from "@/assets/doces.jpg";
import salgados from "@/assets/salgados.jpg";
import hero from "@/assets/hero-bolo.jpg";

/**
 * ATENÇÃO: confirme o número de WhatsApp real antes de publicar.
 * Formato: código do país + DDD + número, somente dígitos.
 */
export const WHATSAPP_NUMBER = "5511999999999";

export const site = {
  name: "Ângela Oliveira Cake Design",
  formerName: "antiga Pimenta Rosa Festas",
  tagline: "Bolos decorados, doces e salgados artesanais",
  city: "São Paulo, SP",
  instagram: "https://www.instagram.com/",
  links: "https://beacons.ai/angelacake",
  email: "contato@pimentarosafestas.com.br",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const heroImage = hero;

export type Category = "Bolos" | "Doces" | "Salgados";

export const categories: {
  name: Category;
  slug: string;
  image: string;
  description: string;
}[] = [
  {
    name: "Bolos",
    slug: "bolos",
    image: bolos,
    description:
      "Bolos decorados sob encomenda, do clássico chantilly ao cake design com flores e detalhes em dourado.",
  },
  {
    name: "Doces",
    slug: "doces",
    image: doces,
    description:
      "Brigadeiros gourmet, bem-casados e docinhos finos montados à mão, um a um.",
  },
  {
    name: "Salgados",
    slug: "salgados",
    image: salgados,
    description:
      "Salgadinhos de festa fritos na hora ou congelados para assar em casa, com massa artesanal.",
  },
];

export type Product = {
  name: string;
  category: Category;
  description: string;
  detail: string;
  image: string;
};

export const products: Product[] = [
  {
    name: "Bolo Floral Rosé",
    category: "Bolos",
    description: "Buttercream rosé com flores modeladas à mão e folhas de ouro.",
    detail: "A partir de 1,5 kg",
    image: bolos,
  },
  {
    name: "Bolo Dois Andares",
    category: "Bolos",
    description: "Ideal para casamentos e aniversários de 40 a 60 convidados.",
    detail: "Sob orçamento",
    image: hero,
  },
  {
    name: "Bolo Naked Frutas",
    category: "Bolos",
    description: "Massa amanteigada, recheio de frutas vermelhas e chantilly.",
    detail: "A partir de 2 kg",
    image: bolos,
  },
  {
    name: "Brigadeiro Gourmet",
    category: "Doces",
    description: "Belga, ninho com nutella, pistache e maracujá. Cento fechado ou sortido.",
    detail: "Cento ou meio cento",
    image: doces,
  },
  {
    name: "Bem-Casado",
    category: "Doces",
    description: "Massa leve com doce de leite, embalado em papel e fita personalizados.",
    detail: "Mínimo 30 unidades",
    image: doces,
  },
  {
    name: "Mesa de Doces Finos",
    category: "Doces",
    description: "Seleção montada por porção de convidados, com cores combinando com a festa.",
    detail: "Sob orçamento",
    image: doces,
  },
  {
    name: "Coxinha de Frango",
    category: "Salgados",
    description: "Massa artesanal com recheio cremoso de frango desfiado com catupiry.",
    detail: "Cento fritos ou congelados",
    image: salgados,
  },
  {
    name: "Empadinha",
    category: "Salgados",
    description: "Massa amanteigada com frango, palmito ou queijo.",
    detail: "Cento",
    image: salgados,
  },
  {
    name: "Kit Festa Salgado",
    category: "Salgados",
    description: "Mix de salgadinhos variados para receber sem complicação.",
    detail: "300 a 1000 unidades",
    image: salgados,
  },
];

export const testimonials = [
  {
    name: "Juliana M.",
    text: "O bolo da festa da minha filha ficou lindo demais e o sabor surpreendeu todo mundo. Já encomendei de novo!",
  },
  {
    name: "Carlos e Renata",
    text: "Atendimento carinhoso do começo ao fim. Os bem-casados do nosso casamento foram elogiados por todos os convidados.",
  },
  {
    name: "Patrícia S.",
    text: "Salgados fresquinhos, entregues no horário combinado na Zona Leste. Confiança total.",
  },
];
