import Negotiator from "negotiator";
import { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import { i18n } from "@/lib/i18n/config";

function headersToObject(headers: Headers): Record<string, string> {
  const headersObj: Record<string, string> = {};
  headers.forEach((value, key) => {
    headersObj[key] = value;
  });
  return headersObj;
}

export function getLocale(request: NextRequest) {
  const headersObj = headersToObject(request.headers);

  const negotiator = new Negotiator({ headers: headersObj });
  const languages = negotiator.languages();

  const matchedLocale = match(languages, i18n.locales, i18n.defaultLocale);

  return matchedLocale;
}

export function addLocaleToRoute(route: string, locale: string) {
  if (route === "/") return `/${locale}`;
  return `/${locale}${route}`;
}
