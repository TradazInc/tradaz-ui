export const formatDays = (min: number, max: number) =>
  min === max ? `${min} day${min === 1 ? "" : "s"}` : `${min}–${max} days`;
