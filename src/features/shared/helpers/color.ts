const clamp = (value: number) => Math.min(Math.max(value, 0), 0xff);
const fill = (string: string) => `00${string}`.slice(-2);

export const changeColor = (color: string, amount: number): string => {
  const number = Number.parseInt(color.slice(1), 16);
  // eslint-disable-next-line no-bitwise
  const red = clamp((number >> 16) + amount);
  // eslint-disable-next-line no-bitwise
  const green = clamp(((number >> 8) & 0x00_ff) + amount);
  // eslint-disable-next-line no-bitwise
  const blue = clamp((number & 0x00_00_ff) + amount);
  return `#${fill(red.toString(16))}${fill(green.toString(16))}${fill(
    blue.toString(16)
  )}`;
};
