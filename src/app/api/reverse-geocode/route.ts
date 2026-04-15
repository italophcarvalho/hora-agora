import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return NextResponse.json(
      { error: "Coordenadas invalidas." },
      { status: 400 },
    );
  }

  try {
    const reverseUrl = new URL("https://nominatim.openstreetmap.org/reverse");
    reverseUrl.searchParams.set("format", "jsonv2");
    reverseUrl.searchParams.set("lat", String(lat));
    reverseUrl.searchParams.set("lon", String(lon));
    reverseUrl.searchParams.set("zoom", "10");
    reverseUrl.searchParams.set("addressdetails", "1");
    reverseUrl.searchParams.set("accept-language", "pt-BR");

    const response = await fetch(reverseUrl, {
      headers: {
        "User-Agent": "HoraAgora/1.0 (contact@horaagora.com.br)",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Nao foi possivel resolver a localizacao." },
        { status: 502 },
      );
    }

    const payload = (await response.json()) as {
      address?: Record<string, string>;
    };
    const address = payload.address ?? {};
    const city =
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.county ||
      "";
    const stateCode = address.state_code || "";
    const country = address.country || "";

    return NextResponse.json(
      {
        city,
        stateCode,
        country,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Falha ao consultar geocodificacao." },
      { status: 500 },
    );
  }
}
