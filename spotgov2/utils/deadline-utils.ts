import { differenceInDays, isToday } from "date-fns";

export const getRemainingDaysColor = (date: string) => {
    const remainingDays = differenceInDays(new Date(date), new Date());

    if (remainingDays < 3) return "bg-red-500";
    if (remainingDays < 7) return "bg-yellow-500";
    return "bg-green-500";
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