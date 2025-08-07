import { ShoppingCart, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";

function CartItemRow({ id }: { id: string }) {
  const { items, remove, update } = useCart();
  const item = items.find((i) => i.product.id === id);
  if (!item) return null;
  const { product, quantity } = item;
  const price = (product.priceCents / 100).toFixed(2);
  const line = ((product.priceCents * quantity) / 100).toFixed(2);

  return (
    <div className="flex items-center gap-3">
      <img src={product.image} alt={`${product.name} thumbnail`} className="h-14 w-16 rounded-md object-cover" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{product.name}</p>
        <p className="text-sm text-muted-foreground">${price} • Qty</p>
        <div className="mt-1 flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => update(product.id, Math.max(1, quantity - 1))} aria-label="Decrease quantity">
            −
          </Button>
          <span className="w-6 text-center tabular-nums">{quantity}</span>
          <Button variant="outline" size="sm" onClick={() => update(product.id, quantity + 1)} aria-label="Increase quantity">
            +
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-semibold">${line}</span>
        <Button variant="ghost" size="sm" onClick={() => remove(product.id)} aria-label="Remove from cart">
          Remove
        </Button>
      </div>
    </div>
  );
}

export const Header = () => {
  const { items, count, subtotalCents, clear } = useCart();
  const subtotal = (subtotalCents / 100).toFixed(2);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <a href="/" className="inline-flex items-center gap-2 font-semibold">
          <Store className="h-5 w-5" aria-hidden="true"/>
          <span>Digital Goods</span>
        </a>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary" size="lg" aria-label="Open cart">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Cart
              <span className="ml-2 rounded-md bg-primary/10 px-2 py-0.5 text-sm tabular-nums">{count}</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="flex w-full flex-col gap-0 sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Your cart</SheetTitle>
            </SheetHeader>
            <div className="flex-1 space-y-4 overflow-auto py-4">
              {items.length === 0 ? (
                <p className="text-muted-foreground">Your cart is empty.</p>
              ) : (
                items.map((i) => <CartItemRow key={i.product.id} id={i.product.id} />)
              )}
            </div>
            <div className="space-y-4">
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-xl font-semibold">${subtotal}</span>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="flex-1" onClick={clear} disabled={!items.length}>
                  Clear
                </Button>
                <a className="flex-1" href="/checkout">
                  <Button variant="premium" className="w-full" disabled={!items.length}>
                    Checkout
                  </Button>
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
