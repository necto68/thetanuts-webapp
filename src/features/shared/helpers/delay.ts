export const delay = async (milliseconds: number) =>
  // eslint-disable-next-line promise/avoid-new
  await new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
