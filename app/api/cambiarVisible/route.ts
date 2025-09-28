import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function PUT(req: Request) {
  try {
    const { id, changes } = await req.json(); 
    // 👆 el body debería tener: { id: 2, changes: { visible: false } }

    const jsonPath = path.join(process.cwd(), "config/tecnologias.json");

    if (!fs.existsSync(jsonPath)) {
      return NextResponse.json(
        { message: "Archivo no encontrado" },
        { status: 404 }
      );
    }

    // 1. Leer JSON
    const fileContent = fs.readFileSync(jsonPath, "utf-8");
    const data = JSON.parse(fileContent);

    // 2. Buscar la tecnología por id
    const index = data.tecnologias.findIndex((t: any) => t.id === id);
    if (index === -1) {
      return NextResponse.json(
        { message: `Tecnología con id ${id} no encontrada` },
        { status: 404 }
      );
    }

    // 3. Actualizar el objeto
    data.tecnologias[index] = {
      ...data.tecnologias[index],
      ...changes, // aplica solo lo que venga en "changes"
    };

    // 4. Guardar otra vez
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

    return NextResponse.json({
      message: "Tecnología actualizada ✅",
      tecnologia: data.tecnologias[index],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al modificar el dato" },
      { status: 500 }
    );
  }
}
