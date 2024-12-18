export const formatCoinAddress = (coinAddress) => {
  if (!coinAddress) return null;
  return coinAddress?.replace(/^(.{4}).*(.{5})$/, "$1******$2");
};
