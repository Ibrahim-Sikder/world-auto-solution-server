import { z } from "zod";

export const tenantSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
  domain: z.string().min(1, { message: "Domain is required" }),
  theme: z.object({
    primaryColor: z.string().default("#3498db"),
    secondaryColor: z.string().default("#2ecc71"),
    logoUrl: z.string().url().default(""),
  }),
});
