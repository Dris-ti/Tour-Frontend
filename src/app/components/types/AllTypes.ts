interface InputFieldProps {
  label: string;
  type: "email" | "password" | "text" | "date" | "file";
  id: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

interface MonthlyData {
  month: string;
  value: number;
}

interface ProfitCardProps {
  amount: number;
  currency?: string;
}

interface ProfitPercentageProps {
  percentage: number;
}

interface EstimationCardProps {
  amount: number;
  currency?: string;
}

interface PlatformFeeProps {
  fee: number;
  vat: number;
  onSave: () => void;
}

interface UserStatsProps {
  totalUsers: number;
}

interface SidebarProps {
  userName: string;
  userImage: string;
}

export type {
  MonthlyData,
  ProfitCardProps,
  ProfitPercentageProps,
  EstimationCardProps,
  PlatformFeeProps,
  UserStatsProps,
  SidebarProps,
  InputFieldProps,
};
