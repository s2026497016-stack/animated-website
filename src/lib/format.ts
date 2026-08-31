export const formatPrice = (amount: number) => `PKR ${amount.toLocaleString()}`;

export const whatsappOwnerLink = (message: string) =>
  `https://wa.me/923376430990?text=${encodeURIComponent(message)}`;
