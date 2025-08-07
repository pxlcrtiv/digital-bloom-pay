import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Product = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  image: string;
  tags?: string[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};

interface CartContextValue {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (productId: string) => void;
  update: (productId: string, qty: number) => void;
  clear: () => void;
  subtotalCents: number;
  count: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem("cart:v1");
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart:v1", JSON.stringify(items));
  }, [items]);

  const add: CartContextValue["add"] = (product, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty };
        return copy;
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const remove: CartContextValue["remove"] = (productId) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const update: CartContextValue["update"] = (productId, qty) => {
    setItems((prev) => prev.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i)));
  };

  const clear = () => setItems([]);

  const subtotalCents = useMemo(
    () => items.reduce((sum, i) => sum + i.product.priceCents * i.quantity, 0),
    [items]
  );
  const count = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);

  const value: CartContextValue = { items, add, remove, update, clear, subtotalCents, count };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
