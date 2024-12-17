import { getFavoriteQueriesData } from "@/features/favorite-queries/api";
import { FavoriteContractsDataType } from "@/features/favorite-queries/types";
import { OrderType, Response } from "@/types";
import { checkUserAuthentication } from "@/utils/api/helpers";
import {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "@/utils/api/status-messages";
import { NextResponse } from "next/server";

type Params = {
  organizationId: string;
};

export async function GET(
  req: Request,
  { params }: { params: Params },
): Promise<NextResponse<Response<FavoriteContractsDataType>>> {
  try {
    const userOrResponse = await checkUserAuthentication();
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") ?? "1";
    const pageSize = searchParams.get("pageSize") ?? "8";
    const search = searchParams.get("search") ?? "";
    const adjudicators = searchParams.getAll("adjudicator") ?? [];
    const titles = searchParams.getAll("title") ?? [];
    const saved = searchParams.get("saved");
    const cpvs = searchParams.getAll("cpv") ?? [];
    const minPrice = searchParams.get("minPrice") ?? "0";
    const maxPrice = searchParams.get("maxPrice") ?? "100000000";
    const minPublishDate = searchParams.get("minPublishDate");
    const maxPublishDate = searchParams.get("maxPublishDate");
    const onlyPriceCriteria = searchParams.get("onlyPriceCriteria") ?? "false";
    const sort = searchParams.get("sort");

    const favoriteQueries = await getFavoriteQueriesData(
      params.organizationId,
      parseInt(page),
      parseInt(pageSize),
      search,
      adjudicators,
      titles,
      saved,
      cpvs,
      parseFloat(minPrice),
      parseFloat(maxPrice),
      minPublishDate ? new Date(minPublishDate) : null,
      maxPublishDate ? new Date(maxPublishDate) : null,
      onlyPriceCriteria,
      sort as OrderType,
    );

    if (!favoriteQueries) {
      return NextResponse.json(STATUS_NOT_FOUND, {
        status: STATUS_NOT_FOUND.status,
      });
    }

    return NextResponse.json(
      { ...STATUS_OK, payload: favoriteQueries },
      { status: STATUS_OK.status },
    );
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
      status: STATUS_INTERNAL_SERVER_ERROR.status,
    });
  }
}
