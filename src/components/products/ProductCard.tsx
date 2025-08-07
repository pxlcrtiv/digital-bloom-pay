import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/hooks/use-cart";

export const ProductCard = ({ product }: { product: Product }) => {
  const { add } = useCart();
  const price = (product.priceCents / 100).toFixed(2);

  return (
    <Card className="group overflow-hidden border-border/60 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={`${product.name} digital product preview`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        <div className="flex flex-wrap gap-2">
          {product.tags?.map((t) => (
            <Badge key={t} variant="secondary" className="border border-border/60">
              {t}
            </Badge>
          ))}
        </div>
        <h3 className="text-lg font-semibold leading-tight">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="text-xl font-bold tracking-tight">${price}</div>
        <Button variant="premium" onClick={() => add(product)} aria-label={`Add ${product.name} to cart`}>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};
