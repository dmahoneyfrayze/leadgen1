// Environment variables
// Use a CORS proxy to prevent CORS issues with the webhook
const originalWebhookUrl = import.meta.env.VITE_WEBHOOK_URL || "https://n8n.frayze.ca/webhook-test/d685ac24-5d07-43af-8311-bac8fbfe651d";

// Use CORS Anywhere (or similar service) as a proxy to bypass CORS restrictions
export const WEBHOOK_URL = `https://cors-anywhere.herokuapp.com/${originalWebhookUrl}`;

// Alternatively, if you prefer not to use a third-party proxy, you can use:
// export const WEBHOOK_URL = originalWebhookUrl; 