import { loadStripe, Stripe } from '@stripe/stripe-js';
import { supabase } from './supabase';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

export interface CreateCheckoutSessionParams {
  planName: string;
  amount: number;
  currency: string;
  userId: string;
}

export const createCheckoutSession = async (params: CreateCheckoutSessionParams) => {
  const { data, error } = await supabase.functions.invoke('create-checkout-session', {
    body: params,
  });

  if (error) throw error;
  return data;
};
