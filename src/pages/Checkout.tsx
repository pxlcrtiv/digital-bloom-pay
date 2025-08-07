import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { getBillgangConfig, setBillgangConfig, verifyBillgangToken, createCheckoutUrl } from "@/services/billgang";
import { useEffect, useState } from "react";

const Checkout = () => {
  const { items, subtotalCents } = useCart();
  const [apiKey, setApiKey] = useState("");
  const [shopId, setShopId] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cfg = getBillgangConfig();
    setApiKey(cfg.apiKey ?? "");
    setShopId(cfg.shopId ?? "");
  }, []);

  const subtotal = (subtotalCents / 100).toFixed(2);

  const handleVerify = async () => {
    setVerifying(true);
    const ok = await verifyBillgangToken({ apiKey, shopId });
    setVerified(ok);
    setVerifying(false);
  };

  const handlePay = async () => {
    setLoading(true);
    setBillgangConfig({ apiKey, shopId });

    const url = await createCheckoutUrl({
      items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/checkout`,
      config: { apiKey, shopId },
    });

    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Checkout | Digital products with Billgang</title>
        <meta name="description" content="Secure checkout for your digital products powered by Billgang." />
        <link rel="canonical" href={`${window.location.origin}/checkout`} />
      </Helmet>
      <Header />
      <main className="container mx-auto grid gap-10 py-10 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold">Order summary</h2>
            <div className="mt-4 space-y-3">
              {items.length === 0 ? (
                <p className="text-muted-foreground">Your cart is empty.</p>
              ) : (
                items.map((i) => (
                  <div key={i.product.id} className="flex items-center justify-between">
                    <span className="truncate">{i.product.name} × {i.quantity}</span>
                    <span className="tabular-nums">${((i.product.priceCents * i.quantity) / 100).toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-2xl font-bold">${subtotal}</span>
            </div>
          </div>
        </section>
        <aside className="space-y-6">
          <div className="rounded-lg border p-6">
            <h2 className="text-lg font-semibold">Billgang configuration</h2>
            <p className="mt-1 text-sm text-muted-foreground">Store your API key locally to test the integration.</p>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key (Bearer)</Label>
                <Input id="apiKey" type="password" placeholder="bg_live_..." value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shopId">Shop ID (optional)</Label>
                <Input id="shopId" placeholder="UUID of your shop" value={shopId} onChange={(e) => setShopId(e.target.value)} />
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={handleVerify} disabled={!apiKey || verifying}>
                  {verifying ? "Verifying..." : verified ? "Reverify" : "Verify"}
                </Button>
                <a href="https://developers.billgang.com" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground underline">
                  Get API key
                </a>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-6">
            <h2 className="text-lg font-semibold">Payment</h2>
            <p className="mt-1 text-sm text-muted-foreground">You will be redirected to Billgang checkout.</p>
            <Button className="mt-4 w-full" size="lg" variant="premium" onClick={handlePay} disabled={!items.length || !apiKey || loading}>
              {loading ? "Processing..." : "Pay with Billgang"}
            </Button>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
