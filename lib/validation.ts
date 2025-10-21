import { z } from "zod";

export type LeadPayload = {
  email: string;
  useCase: string;
  budget: string;
  experience: string;
  vendor?: boolean;
};

export function normalizeEmail(input: string): string {
  return input.trim().toLowerCase();
}

export function validateLead(p: Partial<LeadPayload>): { ok: boolean; errors?: Record<string, string> } {
  const errors: Record<string, string> = {};
  const email = typeof p.email === "string" ? normalizeEmail(p.email) : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Invalid email";
  if (!p.useCase) errors.useCase = "Missing useCase";
  if (!p.budget) errors.budget = "Missing budget";
  if (!p.experience) errors.experience = "Missing experience";
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true };
}

export const quizSchema = z.object({
  useCase: z.enum(["marketing", "content", "coding", "automation", "design", "other"]),
  budget: z.enum(["free", "<20", "20-100", ">100"]),
  experience: z.enum(["beginner", "intermediate", "advanced"]),
  integrations: z.array(z.string()).optional(),
  email: z.string().email().transform(normalizeEmail),
  problem: z.string().max(500).optional(),
  utm: z
    .object({ source: z.string().optional(), medium: z.string().optional(), campaign: z.string().optional() })
    .optional(),
  honey: z.string().max(0, "Bot detected").optional(),
});

export type QuizPayload = z.infer<typeof quizSchema>;


