import { FetchService } from "../../../../_services/fetchService";
import { NEWS_CONTEXT_ROOT } from "../../../../_util/constants";
import { NextResponse } from "next/server";
import { HttpService } from "../../../../_services/httpService";

const fetchService: FetchService = new FetchService(new HttpService());

interface ParamType {
  page: string;
  country: string;
}

interface ContextType {
  params: ParamType;
}

export async function GET(request: Request, context: ContextType) {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.NEWS_API_KEY}`,
    },
  };
  const res = await fetchService.get(
    `${NEWS_CONTEXT_ROOT}/top-headlines?country=${context.params.country}&pageSize=10&page=${context.params.page}`,
    options
  );
  const json = await res.json();
  if (!res.ok) {
    return NextResponse.error();
  }
  return NextResponse.json({
    status: res.status,
    body: json,
  });
}
