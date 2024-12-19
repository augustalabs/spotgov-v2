import { ExportTableField } from "../types";

function exportTableMutation() {
  const mutationKey = ["export-table"];

  const mutationFn = async ({
    userId,
    queryIds,
    fields,
    specialFormatting,
  }: {
    userId: string;
    queryIds: string[];
    fields: ExportTableField[];
    specialFormatting: Record<string, string[]>;
  }) => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_EXPORT_TABLE_EXTERNAL_API!,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          queryIds,
          fields,
          specialFormatting,
        }),
      },
    );

    if (!res.ok) throw new Error("Failed to post data.");

    const data = await res.json();

    return data;
  };

  return { mutationKey, mutationFn };
}

export default exportTableMutation;
