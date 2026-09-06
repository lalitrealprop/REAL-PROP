declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __realPropGAInitialized?: boolean;
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

export function initAnalytics(): void {
  if (typeof window === 'undefined' || !GA_ID || window.__realPropGAInitialized) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function (...args: unknown[]) {
    window.dataLayer!.push(args);
  };

  if (!document.getElementById('real-prop-ga4')) {
    const script = document.createElement('script');
    script.id = 'real-prop-ga4';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
    document.head.appendChild(script);
  }

  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: true });
  window.__realPropGAInitialized = true;
}

export function trackEvent(
  eventName: string,
  params: Record<string, string | number | boolean | undefined> = {}
): void {
  if (typeof window === 'undefined' || !GA_ID) return;
  initAnalytics();

  const safeParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  );

  try {
    window.gtag?.('event', eventName, safeParams);
  } catch {
    // Analytics must never interfere with the website.
  }
}

export const trackProjectView = () => trackEvent('project_view', {
  project_name: 'SVG Central Square',
  project_slug: 'svg-central-square',
});

export const trackCalculatorUsed = (floor?: string, area?: number) => trackEvent('calculator_used', {
  project_name: 'SVG Central Square', floor, area,
});

export const trackFloorSelected = (floor: string) => trackEvent('floor_selected', {
  project_name: 'SVG Central Square', floor,
});

export const trackUnitSelected = (floor?: string, unitType?: string) => trackEvent('unit_selected', {
  project_name: 'SVG Central Square', floor, unit_type: unitType,
});

export const trackEnquiryFormOpened = () => trackEvent('enquiry_form_opened');

export const trackEnquiryFormStarted = () => trackEvent('enquiry_form_started');

export const trackLeadSubmitted = () => trackEvent('lead_submitted');

export const trackWhatsAppClicked = () => trackEvent('whatsapp_clicked');

export const trackCallClicked = () => trackEvent('call_clicked');

export const trackPaymentPlanViewed = () => trackEvent('payment_plan_viewed', {
  project_name: 'SVG Central Square',
});

export const trackFloorPlanViewed = (floor?: string) => trackEvent('floor_plan_viewed', {
  project_name: 'SVG Central Square', floor,
});

export const trackGalleryOpened = (category?: string) => trackEvent('gallery_opened', {
  project_name: 'SVG Central Square', category,
});
