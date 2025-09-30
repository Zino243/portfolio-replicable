import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const project = formData.get("project") as string;
    // falta fecha
    const image = formData.get("imagen") as File | null;

    let imagenPath = null;
    if (image) {
        const uploadDir = path.join(process.cwd(), "public/gallery");

        // Crear carpeta si no existe
        if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        }

        const bytes = Buffer.from(await image.arrayBuffer());
        const filePath = path.join(uploadDir, image.name);
        fs.writeFileSync(filePath, bytes);

        imagenPath = `/gallery/${image.name}`;
    }
    const jsonPath = path.join(process.cwd(), "config/galeria.json");
    
    // Leer JSON actual o crear base
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data = { galeria: [] as any[] };
    if (fs.existsSync(jsonPath)) {
        const fileContent = fs.readFileSync(jsonPath, "utf-8");
        if (fileContent.trim().length > 0) {
        data = JSON.parse(fileContent);
        }
    }

    // Generar nuevo id
    const newId =
      data.galeria.length > 0
        ? Math.max(...data.galeria.map((t) => t.id)) + 1
        : 1;
    
    const newGalleryImage = {
        id: newId,
        src: imagenPath,
        title: title,
        project: project,
        visible : true,
        date : Date.now
    }

    data.galeria.push(newGalleryImage)

    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2))

    return NextResponse.json({ message: "Datos guardados, por favor actualiza", newGalleryImage })
} catch (error) {
    console.error(error)
    return NextResponse.json(
        { message: "Error al guardar los datos" },
        { status: 500 } 
    )
    }
}