export function hashCode(text: string, hash: number = 0) {
  if (text.length === 0) return hash;
  for (let i = 0; i < text.length; i++) {
    const chr = text.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Number(Math.abs(hash)).toString(36);
}
