"use client"

import { useEffect, useState } from "react";
import GaleriaCard from "./galeriaCard"
import { Image as ImageType } from "@/app/types/Image";
import ModalGallery from "./modalCreate";
import placeholder from "@/public/placeholder.png"
import Image, { StaticImageData } from "next/image"
import pencilEdit from "@/public/pencil.svg"

export default function Gallery() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [isCreatorModalOpen, setCreatorModalOpen] = useState(false)

  // para el modal
  const [modalImage, setModalImage] = useState(placeholder.src)
  const [modalTitle, setModalTitle] = useState("")
  const [modalProject, setModalProject] = useState("")
  const [modalDate, setModalDate] = useState(Date.now())

  useEffect(() => {
    async function fetchGalleryImages() {
      try {
        const response = await fetch("/api/galeria");
        const data = await response.json();
        setImages(data); // guardamos las imágenes en el estado
      } catch (error) {
        console.error("Error al cargar la galería:", error);
      }
    }
    fetchGalleryImages();
  }, []);
  console.log(images);
  async function guardarGaleriaImagen() {
    try {
          const formData = new FormData()
          formData.append("title", modalTitle)
          formData.append("project", modalProject)
          // formData.append("date", modalDate)
          
          const imgFile = (document.querySelector<HTMLInputElement>("#imagenModalGaleria")?.files?.[0])
          if (imgFile) formData.append("imagen", imgFile)
              
          const res = await fetch("/api/guardarGaleria", {
              method: "POST",
              body: formData,
          })

          const data = await res.json()
          alert(data.message)
        } catch (error) {
          console.error("Error guardando las tecnologias:", error)
          alert("Error al guardar las tecnologias")
        }
  }
  return (
    <>
      <h1 className="text-4xl font-bold">Galleria</h1>
      {/* aqui van los botones utiles */}
      <div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-4">
            <button
            onClick={() => setCreatorModalOpen(true)}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
              + Subir imagen
            </button>
            <ModalGallery isOpen={isCreatorModalOpen}
            onClose={() => setCreatorModalOpen(false)}>
              <div className="flex flex-col w-full justify-center items-center">
                <div className="relative w-24 h-24 group">
                {/* Imagen principal */}
                <Image
                    src={modalImage}
                    alt="imagen"
                    fill
                    className="w-2xs h-full rounded-md object-cover"
                />

                {/* Icono de editar */}
                <div className="absolute bottom-8 right-8 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                    <label className="w-full h-full cursor-pointer">
                        {/* Icono de lápiz */}
                        <Image src={pencilEdit} alt="Editar" className="w-full h-full" />
                        
                        {/* Input file oculto pero funcional */}
                        <input
                        type="file"
                        id="imagenModalGaleria"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                            // Aquí guardas el archivo en tu useState
                                setModalImage(URL.createObjectURL(file))
                            }
                        }}
                        />
                    </label>
                    </div>
                </div>
                <input type="text"
                placeholder="Titulo de la imagen"
                onChange={(e) => setModalTitle(e.target.value)}
                className="w-full mt-8 shadow-md pl-4 py-2 bg-[#fafafa] rounded-lg"
                />
                <input type="text"
                placeholder="Proyecto asociado"
                onChange={(e) => setModalProject(e.target.value)}
                className="w-full mt-4 shadow-md pl-4 py-2 bg-[#fafafa] rounded-lg"
                />
                <input type="date"
                placeholder="Proyecto asociado"
                onChange={(e) => setModalProject(e.target.value)}
                className="w-full mt-4 mb-4 shadow-md pl-4 py-2 bg-[#fafafa] rounded-lg"
                />
                <button
                onClick={() => {
                    setCreatorModalOpen(false)
                    guardarGaleriaImagen()
                }}
                className="py-2 bg-green-500 text-white w-full rounded-lg">Guardar</button>
            </div>
            </ModalGallery>
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
        {images.map((image) => (
          <GaleriaCard key={image.id} {...image} />
        ))}
      </div>
    </>
  )
}