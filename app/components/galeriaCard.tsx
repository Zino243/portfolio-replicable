import Image from "next/image"
import placeholder from "@/public/placeholder.png"
import editImage from "@/public/pencil.svg"
import papeleraSVG from "@/public/papelera.svg"
import infoSVG from "@/public/info.svg"

export default function GaleriaCard() {
    return (
        <>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Image
            src={placeholder}
            alt="Imagen de ejemplo"
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex items-center justify-between">
            
        <div className="flex items-center space-x-3">
          <button
            className="flex items-center space-x-1 text-blue-500 hover:underline"
            onClick={() => alert("Editar imagen")}
          >
            <Image src={editImage} alt="Editar imagen" className="w-4 h-4" />
          </button>
          <div className="relative group">
            {/* Elemento principal */}
            <button title="holi" className="flex items-center text-gray-600 hover:text-gray-900">
              <Image src={infoSVG} alt="Información" className="w-6 h-6" />
            </button>
        </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="bg-green-500 text-white rounded-full px-3 py-1 h-9 text-sm hover:bg-green-600">
            Visible
          </button>

          <button className="bg-red-600 p-2 rounded-full hover:bg-red-700">
            <Image src={papeleraSVG} alt="Eliminar imagen" className="w-5 h-5" />
          </button>
        </div>
      </div>
      </div>
    </>
    )
}