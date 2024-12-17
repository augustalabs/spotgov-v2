import { addDays, eachDayOfInterval, format, getYear } from "date-fns";
import { pt } from "date-fns/locale";

export enum PhaseEnum {
    Phase1 = "Phase 1",
    Phase2 = "Phase 2",
    Phase3 = "Phase 3",
    Expired = "Expired",
}

export const getGroupedByMonth = (start: Date, end: Date): Record<string, string[]> => {
    const allDays = eachDayOfInterval({ start, end });

    return allDays.reduce<Record<string, string[]>>((acc, day) => {
        const monthKey = `${format(day, "MMMM", { locale: pt })} ${getYear(day)}`;
        if (!acc[monthKey]) {
            acc[monthKey] = [];
        }
        acc[monthKey].push(format(day, "dd"));
        return acc;
    }, {});
};

export const determineCurrentPhase = (
    publishDate: Date,
    submissionDeadline: Date,
    today: Date
): PhaseEnum => {
    const totalDuration = Math.floor((submissionDeadline.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24));
    const phaseLength = totalDuration / 3;

    const phase1EndDate = addDays(publishDate, Math.floor(phaseLength));
    const phase2EndDate = addDays(publishDate, Math.floor(phaseLength * 2));

    if (today < phase1EndDate) return PhaseEnum.Phase1;
    if (today < phase2EndDate) return PhaseEnum.Phase2;
    if (today <= submissionDeadline) return PhaseEnum.Phase3;
    return PhaseEnum.Expired;
};
