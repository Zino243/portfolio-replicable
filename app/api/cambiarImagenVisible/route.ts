import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function PUT(req: Request) {
    try {
        const { id, state } = await req.json()

        const jsonPath = path.join(process.cwd(), "config/imagenes.json")

        if (!fs.existsSync(jsonPath)) {
            return NextResponse.json(
                { message: "Archivo no encontrado" },
                { status: 404 }
            )
        }

        // 1. Leer JSON
        const fileContent = fs.readFileSync(jsonPath, "utf-8");
        const data = JSON.parse(fileContent);

        // 2. Buscar la imagen por id
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const index = data.imagenes.findIndex((img: any) => img.id === id);
        if (index === -1) {
        return NextResponse.json(
            { message: `Imagen con id ${id} no encontrada` },
            { status: 404 }
        );
        }

        // cambiar visibilidad
        data.imagenes[index].isPublic = state;

        // guardar
        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

        return NextResponse.json({
        message: "Visibilidad cambiada ✅",
        imagen: data.imagenes[index], });
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { message: "Error al modificar el dato" },
            { status: 500 }
        )
    }
}