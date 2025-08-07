import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const Success = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Order successful | Digital products</title>
        <meta name="description" content="Your order has been placed successfully." />
        <link rel="canonical" href={`${window.location.origin}/success`} />
      </Helmet>
      <Header />
      <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-extrabold">Thank you for your purchase!</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          We’ve emailed your receipt and download instructions. You can close this tab or go back to the store.
        </p>
        <a href="/" className="mt-6">
          <Button size="lg" variant="hero">Back to store</Button>
        </a>
      </main>
      <Footer />
    </div>
  );
};

export default Success;
