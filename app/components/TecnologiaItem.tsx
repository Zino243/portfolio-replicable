"use client"

import { useState } from "react"
import Image from "next/image"

type Tecnologia = {
    id: number,
    imagen: string,
    texto: string,
    visible: boolean
}

export default function TecnologiaItem({ tecnologia }: { tecnologia: Tecnologia }) {
    const [visible, setVisible] = useState(tecnologia.visible)

    const toggleVisible = () => {
        setVisible( (prev) => !prev )
    }

    async function changeVisible() {
        await fetch("/api/cambiarVisible", {
            method: "PUT",
            body: JSON.stringify(
                { "id": tecnologia.id, "changes":{ "visible": !visible} }
            )
        })
    }

    async function deleteTecnology() {
      const res = await fetch("/api/eliminarTecnologia", {
        method: "DELETE",
        body: JSON.stringify({ "id": tecnologia.id })
      })

      const data = await res.json();
      alert(data.message);
      if (data) {
        
      }
    }

    return (
    <li
      key={tecnologia.id}
      className="flex items-center justify-between bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition"
    >
      {/* Imagen + texto */}
      <div className="flex items-center gap-3">
        <Image
          src={tecnologia.imagen}
          width={48}
          height={48}
          alt="imagen"
          className="h-12 w-12 rounded-full border border-gray-200"
        />
        <span className="font-medium">{tecnologia.texto}</span>
      </div>

      {/* Botones */}
      <div className="flex items-center gap-2">
        <button onClick={() => { deleteTecnology() }} 
        className="text-sm px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          Eliminar
        </button>
        <button
          onClick={() => {
            toggleVisible()
            changeVisible()
          }}
          className={`text-sm px-2 py-1 rounded-lg flex items-center gap-1 transition ${
            visible ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 hover:bg-gray-500"
          } text-white`}
        >
          {visible ? "Visible" : "Oculto"}
        </button>
      </div>
    </li>
  )
}