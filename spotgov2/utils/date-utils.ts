import { format } from "date-fns";
import { pt } from 'date-fns/locale';

export const formatFullDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt });
};

export const formatTimeAgo = (date: string | number | Date): string => {
    if (!date) return "";

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "";

    const now = new Date();
    const seconds = Math.floor((now.getTime() - parsedDate.getTime()) / 1000);

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