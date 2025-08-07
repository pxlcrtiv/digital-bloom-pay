import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";

export const ProductGrid = () => {
  return (
    <section aria-labelledby="products-heading" className="container mx-auto">
      <h2 id="products-heading" className="sr-only">
        Featured digital products
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};
