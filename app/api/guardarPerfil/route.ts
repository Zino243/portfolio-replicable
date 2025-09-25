import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const nombre = formData.get("nombre") as string;
    const sobreMi = formData.get("sobreMi") as string;
    const telefono = formData.get("telefono") as string;
    const email = formData.get("email") as string;
    const imagen = formData.get("imagen") as File | null;

    let imagenPath = null;
    if (imagen) {

      const uploadDir = path.join(process.cwd(), "public/uploads");

      // Crear la carpeta si no existe
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const bytes = Buffer.from(await imagen.arrayBuffer());
      const filePath = path.join(process.cwd(), "public/uploads", imagen.name);
      fs.writeFileSync(filePath, bytes);
      imagenPath = `/uploads/${imagen.name}`;
    }

    const jsonPath = path.join(process.cwd(), "config/personales.json");
    const newData = { nombre, sobreMi, telefono, email, imagen: imagenPath };
    fs.writeFileSync(jsonPath, JSON.stringify(newData, null, 2));

    return NextResponse.json({ message: "Datos guardados ✅" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al guardar los datos" },
      { status: 500 }
    );
  }
}
