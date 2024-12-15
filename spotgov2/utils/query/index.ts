import { format } from "date-fns";

interface QueryObjectInput {
    aiSearchValue: string;
    selectedCPVs: { value: string }[];
    selectedKeywords: { value: string }[];
    selectedAdjudicatingEntities: string[];
    selectedPriceRange: [number, number];
    selectedDateRange?: { from?: Date; to?: Date };
}

type InputDataType = {
    prompt?: string;
    add: {
        cpv?: string[];
        keywords?: string[];
    };
    filter: {
        adjudicante?: string[];
        basePrice?: {
            type: "range";
            value: [number, number];
        };
        publishedAt?: {
            type: "range" | ">=" | "<=";
            value: string[];
        };
    };
};

export const buildQueryObject = ({
    aiSearchValue,
    selectedCPVs,
    selectedKeywords,
    selectedAdjudicatingEntities,
    selectedPriceRange,
    selectedDateRange,
}: QueryObjectInput) => {
    const query: InputDataType = { add: {}, filter: {} };

    // Add AI search value
    if (aiSearchValue) query.prompt = aiSearchValue.trim();

    // Add CPVs
    if (selectedCPVs.length > 0) {
        query.add.cpv = selectedCPVs.map((cpv) => cpv.value);
    }

    // Add keywords
    if (selectedKeywords.length > 0) {
        query.add.keywords = selectedKeywords.map((keyword) => keyword.value);
    }

    // Add adjudicating entities
    if (selectedAdjudicatingEntities.length > 0) {
        query.filter.adjudicante = selectedAdjudicatingEntities;
    }

    // Add price range
    query.filter.basePrice = { type: "range", value: selectedPriceRange };

    // Add date range
    if (selectedDateRange) {
        if (selectedDateRange.from && selectedDateRange.to) {
            query.filter.publishedAt = {
                type: "range",
                value: [
                    format(selectedDateRange.from, "yyyy-MM-dd"),
                    format(selectedDateRange.to, "yyyy-MM-dd"),
                ],
            };
        } else if (selectedDateRange.from) {
            query.filter.publishedAt = {
                type: ">=",
                value: [format(selectedDateRange.from, "yyyy-MM-dd")],
            };
        } else if (selectedDateRange.to) {
            query.filter.publishedAt = {
                type: "<=",
                value: [format(selectedDateRange.to, "yyyy-MM-dd")],
            };
        }
    }

    // Remove empty prompt
    if (!query.prompt) delete query.prompt;

    return query;
};
