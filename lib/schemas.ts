import * as z from "zod";

export const StockSchema = z.object({
  id: z.number().optional(),
  productName: z.string().min(1, {
    message: "L'article est obligatoire",
  }),
  initialQte: z.string().min(1, {
    message: "Le stock initial est obligatoire",
  }),
  currentQte: z.string().optional(),
  eventId: z.string(),
});
