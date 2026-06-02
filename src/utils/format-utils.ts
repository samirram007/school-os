/**
 * Utility functions for data object cleaning and string formatting.
 */

// --- Object Utilities ---

/**
 * Removes properties from an object that are empty strings or null/undefined.
 */
export const cleanObject = (obj: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
  );
};

// --- String Formatting Utilities ---

export const upperCaseFirst = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const lowerCaseFirst = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toTitleCase = (str: string): string => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
};

export const toUpperCase = (str: string): string => (str ? str.toUpperCase() : '');
export const toLowerCase = (str: string): string => (str ? str.toLowerCase() : '');

/**
 * Generates initials from a name string (e.g., "John Doe" -> "JD", "John" -> "J").
 */
export const getInitials = (str: string): string => {
  if (!str || typeof str !== "string") return "";

  const words = str.trim().split(/\s+/);
  if (words.length === 0) return "";
  
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

export const toSentenceCase = (input: string): string => {
  if (typeof input !== "string" || !input.trim()) {
    return input;
  }

  const normalized = input
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase -> space
    .replace(/[_-]+/g, " ")             // snake/kebab -> space
    .trim()
    .toLowerCase();

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

// --- Date Utilities ---

export const formatDate = (value: string | Date): string => {
  const date = new Date(value);
  if (isNaN(date.getTime())) return '';
  
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
