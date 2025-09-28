import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const texto = formData.get("nombre") as string;
    const imagen = formData.get("imagen") as File | null;

    let imagenPath = null;
    if (imagen) {
      const uploadDir = path.join(process.cwd(), "public/uploads");

      // Crear carpeta si no existe
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const bytes = Buffer.from(await imagen.arrayBuffer());
      const filePath = path.join(uploadDir, imagen.name);
      fs.writeFileSync(filePath, bytes);

      imagenPath = `/uploads/${imagen.name}`;
    }

    const jsonPath = path.join(process.cwd(), "config/tecnologias.json");

    // Leer JSON actual o crear base
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data = { tecnologias: [] as any[] };
    if (fs.existsSync(jsonPath)) {
      const fileContent = fs.readFileSync(jsonPath, "utf-8");
      if (fileContent.trim().length > 0) {
        data = JSON.parse(fileContent);
      }
    }

    // Generar nuevo id
    const newId =
      data.tecnologias.length > 0
        ? Math.max(...data.tecnologias.map((t) => t.id)) + 1
        : 1;

    // Crear nuevo objeto
    const newTecnologia = {
      id: newId,
      imagen: imagenPath,
      texto,
      visible: true,
    };

    // Agregar al array
    data.tecnologias.push(newTecnologia);

    // Guardar de nuevo
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

    return NextResponse.json({ message: "Datos guardados ✅, por favor actualiza", newTecnologia });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al guardar los datos" },
      { status: 500 }
    );
  }
}
