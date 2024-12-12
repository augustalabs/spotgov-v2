import { getFavoriteQueriesData } from "@/features/favorite-queries/api";
import { FavoriteContractsDataType } from "@/features/favorite-queries/type";
import { Response } from "@/types";
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
    const adjudicators = searchParams.getAll("adjudicator");
    const titles = searchParams.getAll("title");

    const favoriteQueries = await getFavoriteQueriesData(
      params.organizationId,
      parseInt(page),
      parseInt(pageSize),
      search,
      adjudicators,
      titles,
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
  } catch (error) {
    console.log(error);
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
      status: STATUS_INTERNAL_SERVER_ERROR.status,
    });
  }
}
