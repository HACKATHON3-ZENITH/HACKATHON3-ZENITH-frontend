export type ExperienceLevel = 'NONE' | 'IDEA' | 'UNDER_2_YEARS' | 'OVER_2_YEARS';

export type Sector = 
  | 'AGRICULTURE' 
  | 'COMMERCE' 
  | 'TECH' 
  | 'SERVICES' 
  | 'ARTISANAT' 
  | 'HEALTH' 
  | 'EDUCATION' 
  | 'OTHER';

export type MainGoal = 
  | 'VALIDATE_IDEA' 
  | 'BUSINESS_PLAN' 
  | 'FIRST_CLIENTS' 
  | 'FUNDING' 
  | 'TEAM' 
  | 'DIGITALIZE' 
  | 'OTHER';

export type WeeklyHours = 'LESS_2H' | '2_5H' | '5_10H' | 'MORE_10H';

export type EducationLevel = 'PRIMARY' | 'SECONDARY' | 'UNIVERSITY';

export interface OnboardingData {
  experienceLevel: ExperienceLevel;
  sector: Sector;
  otherSector?: string;
  mainGoal: MainGoal;
  otherGoal?: string;
  weeklyHours: WeeklyHours;
  educationLevel: EducationLevel;
}

export interface UserProfile extends OnboardingData {
  profileBadge: string;
  updatedAt: string;
}
