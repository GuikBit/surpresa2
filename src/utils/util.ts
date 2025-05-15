export function cn(...classes: (string | boolean | undefined | null | Record<string, boolean>)[]) {
  return classes
    .flatMap(cls => {
      if (!cls) return [];
      if (typeof cls === "string") return [cls];
      if (typeof cls === "object") {
        return Object.entries(cls)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key);
      }
      return [];
    })
    .join(" ");
}