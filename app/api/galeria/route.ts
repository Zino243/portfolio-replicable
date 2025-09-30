import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const jsonPath = path.join(process.cwd(), "config/galeria.json");

    const fileContent = await fs.readFile(jsonPath, "utf-8");
    const data = JSON.parse(fileContent);

    return NextResponse.json(data.galeria, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al obtener los datos" },
      { status: 500 }
    );
  }
}
