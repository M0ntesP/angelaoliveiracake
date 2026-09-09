import bolo1 from "@/assets/bolo-1.jpg.asset.json";
import bolo2 from "@/assets/bolo-2.jpg.asset.json";
import bolo3 from "@/assets/bolo-3.jpg.asset.json";
import bolo4 from "@/assets/bolo-4.jpg.asset.json";
import bolo5 from "@/assets/bolo-5.jpg.asset.json";
import bolo6 from "@/assets/bolo-6.jpg.asset.json";
import bolo7 from "@/assets/bolo-7.jpg.asset.json";
import bolo8 from "@/assets/bolo-8.jpg.asset.json";
import bolo9 from "@/assets/bolo-9.jpg.asset.json";
import bolo10 from "@/assets/bolo-10.jpg.asset.json";

export const WHATSAPP_URL = "https://wa.me/message/2NQZ64SODALVE1";

export const site = {
  name: "Ângela Oliveira Cake Design",
  formerName: "antiga Pimenta Rosa Festas",
  tagline: "Bolos decorados e doces artesanais",
  city: "São Paulo, SP",
  instagram: "https://www.instagram.com/angelaoliveira.cakedesing/",
  links: "https://beacons.ai/angelacake",
  whatsapp: WHATSAPP_URL,
};

// Todos os pedidos acontecem pelo WhatsApp; o link oficial não aceita mensagem pré-preenchida.
export function whatsappLink(_message?: string) {
  return WHATSAPP_URL;
}

export const heroImage = bolo3.url;

export type Category = "Bolos temáticos" | "Bolos comemorativos" | "Bolos florais e frutas";

export const categories: {
  name: Category;
  slug: string;
  image: string;
  description: string;
}[] = [
  {
    name: "Bolos temáticos",
    slug: "tematicos",
    image: bolo7.url,
    description:
      "Personagens, cores e cenários montados à mão para festas infantis e temas favoritos de qualquer idade.",
  },
  {
    name: "Bolos comemorativos",
    slug: "comemorativos",
    image: bolo3.url,
    description:
      "Aniversários, 15 anos e datas especiais com acabamento delicado, topo personalizado e detalhes em dourado.",
  },
  {
    name: "Bolos florais e frutas",
    slug: "florais-frutas",
    image: bolo1.url,
    description:
      "Chantilly, frutas frescas e flores naturais para quem prefere um bolo clássico, leve e elegante.",
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
    name: "Bolo de morangos com chantilly",
    category: "Bolos florais e frutas",
    description: "Chantilly em bico rendado, morangos frescos no topo e laço de cetim.",
    detail: "Andar único · sabores a combinar",
    image: bolo1.url,
  },
  {
    name: "Bolo tropical flamingo",
    category: "Bolos temáticos",
    description: "Dois andares em rosetas rosa e turquesa, com folhagens e topo de flamingos.",
    detail: "Dois andares",
    image: bolo2.url,
  },
  {
    name: "Bolo pink 15 anos",
    category: "Bolos comemorativos",
    description: "Pink metálico espatulado, rosas em papel e nome personalizado em dourado.",
    detail: "Andar único · nome personalizado",
    image: bolo3.url,
  },
  {
    name: "Bolo uvas e vinho",
    category: "Bolos florais e frutas",
    description: "Drip vinho sobre chantilly texturizado, com uvas frescas e detalhes cintilantes.",
    detail: "Andar único",
    image: bolo4.url,
  },
  {
    name: "Bolo rock'n'roll",
    category: "Bolos temáticos",
    description: "Cobertura preta acetinada, topo de guitarra, estrelas e nome em relevo.",
    detail: "Andar único",
    image: bolo5.url,
  },
  {
    name: "Bolo TikTok",
    category: "Bolos temáticos",
    description: "Espatulado rosa e azul com respingos dourados e topo de aplicativos favoritos.",
    detail: "Andar único",
    image: bolo6.url,
  },
  {
    name: "Bolo safári",
    category: "Bolos temáticos",
    description: "Dois andares com tronco em chocolate texturizado, gramado e bichinhos da savana.",
    detail: "Dois andares",
    image: bolo7.url,
  },
  {
    name: "Bolo unicórnio surpresa",
    category: "Bolos comemorativos",
    description: "Azul em rosetas e babados, confeitos coloridos e unicórnio modelado à mão.",
    detail: "Andar único · recheio surpresa",
    image: bolo8.url,
  },
  {
    name: "Bolo super-herói",
    category: "Bolos temáticos",
    description: "Cenário em relevo com base dourada, verde vibrante e topo do herói preferido.",
    detail: "Dois andares",
    image: bolo9.url,
  },
  {
    name: "Bolo afro com flores",
    category: "Bolos florais e frutas",
    description: "Andares com estampas africanas, flores naturais amarelas e nome no topo.",
    detail: "Dois andares · flores naturais",
    image: bolo10.url,
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
    text: "Doces fresquinhos, entregues no horário combinado na Zona Leste. Confiança total.",
  },
];
