import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ProductGrid } from "@/components/products/ProductGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Digital products store | Billgang checkout</title>
        <meta name="description" content="Modern online store for digital products with secure Billgang checkout." />
        <link rel="canonical" href={`${window.location.origin}/`} />
      </Helmet>
      <Header />
      <main>
        <Hero />
        <section id="products" className="container mx-auto py-12">
          <h2 className="mb-6 text-2xl font-bold">Featured products</h2>
          <ProductGrid />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
