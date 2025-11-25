import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Opens WhatsApp Web with a pre-filled message and optionally phone number
 * @param message - The message to send
 * @param phoneNumber - Optional phone number (format: country code + number, e.g., "5511999999999")
 */
export function openWhatsApp(message: string, phoneNumber?: string) {
  const encodedMessage = encodeURIComponent(message);
  if (phoneNumber) {
    // Open WhatsApp with specific contact
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  } else {
    // Open WhatsApp Web
    window.open(`https://web.whatsapp.com/send?text=${encodedMessage}`, '_blank');
  }
}

/**
 * Generates a WhatsApp message for sharing catalog
 * @param vendorName - Name of the vendor/store
 * @param vendorId - Vendor ID for the catalog link
 */
export function generateCatalogShareMessage(vendorName: string, vendorId: string): string {
  const baseUrl = window.location.origin;
  const catalogUrl = `${baseUrl}/catalog/${vendorId}`;
  return `Olá! 👋\n\nVeja os produtos frescos de ${vendorName} no HortiFruti Express 🥬🍎🌿\n\n${catalogUrl}\n\nCompre agora e aproveite nossos melhores preços! 💚`;
}

/**
 * Generates a WhatsApp message for sharing order details
 * @param orderId - Order ID
 * @param customerName - Customer name
 * @param totalItems - Number of items in the order
 */
export function generateOrderShareMessage(orderId: string, customerName: string, totalItems: number): string {
  const baseUrl = window.location.origin;
  const orderUrl = `${baseUrl}/order/${orderId}`;
  return `Olá ${customerName}! 📦\n\nSeu pedido #${orderId} foi recebido com ${totalItems} item${totalItems !== 1 ? 'ns' : ''}!\n\nAcompanhe aqui: ${orderUrl}\n\nObrigado por comprar conosco! 💚`;
}
