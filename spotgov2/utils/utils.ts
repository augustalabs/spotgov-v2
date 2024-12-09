import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { differenceInDays, isToday, format } from "date-fns";
import { pt } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstName(name: string | undefined): string {
  if (!name) return "";
  return name.split(" ")[0];
}

export const formatDate = (date) => {
  if (!date) return "Data inválida";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) return "Data inválida";

  const now = new Date();
  const seconds = Math.floor((now - parsedDate) / 1000);

  const intervals = [
    { label: "ano", seconds: 31536000 },
    { label: "mês", seconds: 2592000 },
    { label: "dia", seconds: 86400 },
    { label: "hora", seconds: 3600 },
    { label: "minuto", seconds: 60 },
    { label: "segundo", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      const pluralizedLabel = count > 1 ? `${interval.label}s` : interval.label;
      return `Há ${count} ${pluralizedLabel}`;
    }
  }

  return "Agora mesmo";
};

export const getRemainingDaysMessage = (submissionDate: string) => {
  const today = new Date();
  const deadlineDate = new Date(submissionDate);

  if (isToday(deadlineDate)) return "Hoje";

  const remainingDays = differenceInDays(deadlineDate, today);

  if (remainingDays === 1) return "Falta 1 dia";
  if (remainingDays > 1) return `Faltam ${remainingDays} dias`;

  return "Prazo expirado";
};

export const formatDate2 = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt });
};

export const getRemainingDaysColor = (date: string) => {
  const remainingDays = differenceInDays(new Date(date), new Date());

  if (remainingDays < 3) return "bg-red-500";
  if (remainingDays < 7) return "bg-yellow-500";
  return "bg-green-500";
};