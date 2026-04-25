import { z } from 'zod';

export const onboardingSchema = z.object({
  experienceLevel: z.enum(['NONE', 'IDEA', 'UNDER_2_YEARS', 'OVER_2_YEARS'], {
    required_error: "Veuillez sélectionner votre niveau d'expérience",
  }),
  sector: z.string().min(2, "Veuillez sélectionner un secteur d'activité"),
  otherSector: z.string().optional(),
  mainGoal: z.enum(['VALIDATE_IDEA', 'BUSINESS_PLAN', 'FIRST_CLIENTS', 'FUNDING', 'TEAM', 'DIGITALIZE', 'OTHER'], {
    required_error: "Veuillez sélectionner votre objectif principal",
  }),
  otherGoal: z.string().optional(),
  weeklyHours: z.enum(['LESS_2H', '2_5H', '5_10H', 'MORE_10H'], {
    required_error: "Veuillez sélectionner votre temps disponible",
  }),
  educationLevel: z.enum(['PRIMARY', 'SECONDARY', 'UNIVERSITY'], {
    required_error: "Veuillez sélectionner votre niveau d'études",
  }),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;
