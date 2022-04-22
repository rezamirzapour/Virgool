import { NextRequest, NextFetchEvent } from "next/server";
import { AuthOperations } from "src/utils";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  //   const cookie = AuthOperations.getTokenFromReq(req);
  //   req.hasToken = Boolean(cookie);
  //   return new Response(cookie.toString());
}
