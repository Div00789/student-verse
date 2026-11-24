/**
 * Centralized Indian Rupee (INR) Currency Formatter
 * Formats monetary amounts using Indian number grouping (e.g. ₹4,999, ₹14,999, ₹1,00,000)
 */

export const formatINR = (amount: number): string => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
