
import GaleriaCard from "./galeriaCard"

export default function Gallery() {
  return (
    <>
      <h1 className="text-4xl font-bold">Galleria</h1>
      {/* aqui van los botones utiles */}
      <div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-4">
            <button className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
              + Subir imagen
            </button>
          </div>
          <div>
            <button className="py-2 px-4 mr-4 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition">
              Categorias
            </button>
            <input
              type="text"
              placeholder="Buscar..."
              className="py-2 px-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      {/* aqui va la galeria */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        <GaleriaCard/>
      </div>
    </>
  )
}