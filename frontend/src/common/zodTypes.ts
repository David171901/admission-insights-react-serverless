import { z } from "zod";

export const emptyLiteralString = () => z.literal('');
export const emptyStringMinZero = () => z.string().min(0);
export const zDefaultString = () => z.string().default("");