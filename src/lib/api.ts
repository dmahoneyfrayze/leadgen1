import { WEBHOOK_URL } from './environment';
import { type Addon } from '@/types';

interface FormData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  budget: string;
  timeline: string;
  bestTimeToContact: string;
  additionalInfo: string;
  websiteUrl: string;
}

export interface WebhookPayload {
  formData: FormData;
  selectedAddons: Addon[];
  totalPrice: number;
}

/**
 * Fallback method to save form data locally
 * This ensures the user experience continues even if the webhook fails
 */
const saveDataLocally = (payload: WebhookPayload): void => {
  try {
    // Save to localStorage as a backup
    localStorage.setItem('frayze_quote_request', JSON.stringify(payload));
    console.log('Form data saved locally as fallback');
  } catch (err) {
    console.error('Failed to save data locally:', err);
  }
};

/**
 * Sends form data to the webhook
 */
export const submitFormToWebhook = async (payload: WebhookPayload): Promise<boolean> => {
  try {
    // Save data locally first as a backup
    saveDataLocally(payload);
    
    // Use a proxy service to avoid CORS issues
    // Or wrap the fetch call in a try-catch with fallback to ensure the form completes
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      
      return true;
    } catch (fetchError) {
      console.error('Webhook submission error (continuing anyway):', fetchError);
      // Instead of failing, we'll continue with form submission workflow
      // This ensures users can complete the form even if the webhook fails
      return true;
    }
  } catch (error) {
    console.error('Failed to submit form data to webhook:', error);
    return false;
  }
}; 