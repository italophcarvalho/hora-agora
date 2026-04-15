import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const city = sanitizeHeaderValue(request.headers.get("x-vercel-ip-city"));
  const countryCode = sanitizeHeaderValue(
    request.headers.get("x-vercel-ip-country"),
  );
  const region = sanitizeHeaderValue(
    request.headers.get("x-vercel-ip-country-region"),
  );
  const timeZone = sanitizeHeaderValue(
    request.headers.get("x-vercel-ip-timezone"),
  );

  return NextResponse.json(
    {
      city,
      countryCode,
      region,
      timeZone,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

function sanitizeHeaderValue(value: string | null) {
  if (!value) {
    return "";
  }

  return value.trim();
}
