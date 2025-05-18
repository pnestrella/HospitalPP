export interface User {
  name: string;
  email: string;
  gender?: string;
  age?: number;
  address?: string;
  dateOfBirth?: string;
}

export interface BillItem {
  service: string;
  date: string;
  amount: string;
  status: 'Paid' | 'Processing' | 'Outstanding';
  action: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  type: 'lab' | 'visitnotes' | 'imaging' | 'specialist' | 'Vaccination';
  condition: string;
  dateAdmitted: string;
  status: 'Completed' | 'Not Complete';
  prescriptionDate: string;
}

export interface PrescriptionItem {
  doctor: string;
  date: string;
  name: string;
  age: number;
  gender: string;
  meds: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface Image {
  url: string;
  alt: string;
}

export interface ImageCarouselProps {
  images: Image[];
}

export interface HeaderProps {
  user: User;
}

export interface NavProps {
  user: User;
}

export interface SearchBarProps {
  title: string;
  description: string;
  data: Record<string, unknown>[];
}

export interface ChatBotProps {
  user?: User;
}

export interface Prescription {
  doctor: string;
  date: string;
  name: string;
  age: number;
  gender: string;
  meds: {
    name: string;
    dosage: string;
    frequency: string;
  }[];
}

export interface ButtonProps {
  text?: string;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface FilterProps<T = string> {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  placeholder?: string;
} 