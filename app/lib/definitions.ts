// Sign In Type Definitions
export interface SignInData {
  login: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  user: User;
}

export interface User {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string | null;
  is_verified: boolean;
  email_verified: boolean;
  phone_verified: boolean;
}

// Register Type Definitions
export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  subscribed_sms_campaigns: boolean;
  subscribed_email_campaigns: boolean;
}



// Onboarding Type Definitions
export interface OnboardingData {
  businessName: string;
  subDomain: string;
  about: string;
  address: string;
  phone: string;
  category: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  logo: File | null;
}

// A reusable interface for all three of your form steps!
export interface StepFormProps {
  data: OnboardingData;
  update: (newData: Partial<OnboardingData>) => void;
  onNext?: () => void;
  onBack?: () => void;
  onFinish?: () => void;
}
