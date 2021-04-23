export const waitAsync = async (wait: number) =>
  new Promise<void>(resolv => setTimeout(() => resolv(), wait));
