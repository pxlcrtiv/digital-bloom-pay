const KEY_STORAGE = "billgang:apiKey";
const SHOP_STORAGE = "billgang:shopId";

export type BillgangConfig = { apiKey: string; shopId?: string };

export function getBillgangConfig(): BillgangConfig {
  return {
    apiKey: localStorage.getItem(KEY_STORAGE) ?? "",
    shopId: localStorage.getItem(SHOP_STORAGE) ?? undefined,
  };
}

export function setBillgangConfig({ apiKey, shopId }: BillgangConfig) {
  if (apiKey !== undefined) localStorage.setItem(KEY_STORAGE, apiKey);
  if (shopId) localStorage.setItem(SHOP_STORAGE, shopId);
}

export async function verifyBillgangToken(config: BillgangConfig) {
  if (!config.apiKey) throw new Error("Missing API key");
  try {
    const res = await fetch("https://pg-api.billgang.com/v1/dash/user", {
      headers: { Authorization: config.apiKey },
    });
    // CORS may block this in dev; we treat opaque as best-effort
    if (!res.ok && res.type !== "opaque") {
      throw new Error(`Verification failed (${res.status})`);
    }
    return true;
  } catch (e) {
    console.warn("Billgang verification failed or blocked by CORS:", e);
    return false;
  }
}

export async function createCheckoutUrl(params: {
  items: { productId: string; quantity: number }[];
  successUrl: string;
  cancelUrl: string;
  config: BillgangConfig;
}): Promise<string> {
  // NOTE: This is a placeholder. The official approach is to create a checkout/order
  // via a secure backend or edge function using your Billgang API key and chosen products.
  // For now, we return an in-app success URL to allow flow testing.
  const { successUrl } = params;
  return successUrl;
}
