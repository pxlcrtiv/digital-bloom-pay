import ebookImg from "@/assets/product-ebook.jpg";
import uikitImg from "@/assets/product-uikit.jpg";
import codepackImg from "@/assets/product-codepack.jpg";
import type { Product } from "@/hooks/use-cart";

export const products: Product[] = [
  {
    id: "ebook-advanced-react",
    name: "Advanced React E‑book",
    description: "Master concurrency, Suspense, and performance patterns with hands‑on examples.",
    priceCents: 4900,
    image: ebookImg,
    tags: ["E‑book", "React", "Best Seller"],
  },
  {
    id: "uikit-pro",
    name: "UI Kit Pro",
    description: "Beautiful, accessible UI components and templates for modern apps.",
    priceCents: 8900,
    image: uikitImg,
    tags: ["Design", "Components"],
  },
  {
    id: "codepack-utilities",
    name: "Code Snippet Pack",
    description: "200+ production‑ready snippets for TypeScript, testing, and DX.",
    priceCents: 3900,
    image: codepackImg,
    tags: ["Code", "TypeScript"],
  },
];
