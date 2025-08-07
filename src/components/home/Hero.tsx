import heroImg from "@/assets/hero-gradient.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Abstract gradient hero background for digital products store"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      <div className="container mx-auto py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Sell and deliver digital products beautifully
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            E‑books, UI kits, code packs and more — secure checkout powered by Billgang.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="#products">
              <Button size="xl" variant="hero">
                Browse products
              </Button>
            </a>
            <a href="/checkout">
              <Button size="xl" variant="premium">
                Go to checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
