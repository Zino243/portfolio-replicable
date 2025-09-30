import Image, { StaticImageData } from "next/image"
import placeholderImagen from "@/public/placeholder.png"
import pencilEdit from "@/public/pencil.svg"
import { useState } from "react"
import { Colors } from "@/app/components/colors-config"
import ChargeTechnologies from "@/app/components/chargeTecnologies"
import config from "@/config/personales.json"
import ModalTechnologies from "@/app/components/modalCreate"
import TecnologiaItem from "./TecnologiaItem"


export default function Home() {

    type Tecnologia = {
        id: number,
        imagen: string,
        texto: string,
        visible: boolean
    }

    const [nombre, setNombre] = useState(config.nombre)
    const [sobreMi, setSobreMi] = useState(config.sobreMi)
    const [telefono, setTelefono] = useState(config.telefono)
    const [email, setEmail] = useState(config.email)
    const [tecnologias, setTecnologias] = useState<Tecnologia[]>(ChargeTechnologies())
    const [imagenPerfil, setImagenPerfil] = useState<string | StaticImageData>(config.imagen || placeholderImagen.src)
    const [creadorTecnologiasAbierto, setCreadorTecnologiasAbierto] = useState(false)

    // useStates para el modal
    const [nombreTecnologia, setNombreTecnologia] = useState("")
    const [imagenTecnologia, setImagenTecnologia] = useState<string | StaticImageData>(placeholderImagen.src)

    async function saveData() {
        try {
            const formData = new FormData();
            formData.append("nombre", nombre);
            formData.append("sobreMi", sobreMi);
            formData.append("telefono", telefono);
            formData.append("email", email);

            // Convertimos la URL temporal a File si hay imagen nueva
            const imgFile = (document.querySelector<HTMLInputElement>("#inputImagen")?.files?.[0]);
            if (imgFile) formData.append("imagen", imgFile);

            const res = await fetch("/api/guardarPerfil", {
            method: "POST",
            body: formData,
            });

            const data = await res.json();
            alert(data.message);
        } catch (error) {
            console.error("Error guardando datos:", error);
            alert("Error al guardar los datos");
        }
    }

    async function guardarTecnologia() {
        try {
            const formData = new FormData()
            formData.append("nombre", nombreTecnologia)
            
            const imgFile = (document.querySelector<HTMLInputElement>("#imagenTecnologia")?.files?.[0])
            if (imgFile) formData.append("imagen", imgFile)
                
            const res = await fetch("/api/guardarTecnologias", {
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

        <div className="max-w-3xl mx-auto p-6 space-y-8">

        {/* Perfil */}
        <div className="flex items-center gap-6 bg-white shadow-sm rounded-xl p-6">
            <div className="relative w-24 h-24 group">
                {/* Imagen principal */}
                <Image
                    src={imagenPerfil}
                    alt="imagen"
                    fill
                    className="w-full h-full rounded-full object-cover"
                />

                {/* Icono de editar */}
                <div className="absolute bottom-8 right-8 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                    <label className="w-full h-full cursor-pointer">
                        {/* Icono de lápiz */}
                        <Image src={pencilEdit} alt="Editar" className="w-full h-full" />
                        
                        {/* Input file oculto pero funcional */}
                        <input
                        type="file"
                        id="inputImagen"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                            // Aquí guardas el archivo en tu useState
                                setImagenPerfil(URL.createObjectURL(file))
                            }
                        }}
                        />
                    </label>
                </div>
            </div>
            <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            className="flex-1 rounded-lg px-4 py-2 text-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            style={{ color: Colors.texto }}
            />
        </div>
        <div className="space-y-4">
            <button
            style={{ color: Colors.base }}
            className="w-full h-10 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-sm transition"
            onClick={saveData}
            >
            Guardar
            </button>
        </div>
        {/* Sobre mí */}
        <div className="bg-white shadow-sm rounded-xl p-6 space-y-4">
            <textarea
            placeholder="Sobre mí"
            value={sobreMi}
            onChange={(e) => setSobreMi(e.target.value)}
            className="w-full rounded-lg p-3 h-28 resize-none border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            />

            <div className="grid grid-cols-2 gap-4">
            <input
                type="text"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="rounded-lg px-3 py-2 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            />
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg px-3 py-2 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            />
            </div>
        </div>

        {/* Imagen ejemplo */}
        <div style={{ backgroundColor: Colors.primario }}
        className="h-48 rounded-xl flex items-center justify-center shadow-inner">
            <span className="text-gray-600">Aquí va la imagen de pruebas</span>
        </div>

        {/* Tecnologías */}
        <div className="space-y-4">
            <h1 className="text-2xl font-bold text-center">Tecnologías aprendidas</h1>
            <button
            style={{ color: Colors.base }}
            className="w-full h-10 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-sm transition"
            onClick={() => setCreadorTecnologiasAbierto(true)}
            >
            Añadir
            </button>
        {/* el modal para crear tecnologias aprendidas */}

        <ModalTechnologies isOpen={creadorTecnologiasAbierto} onClose={() => setCreadorTecnologiasAbierto(false)}>
            <div className="flex flex-col w-full justify-center items-center">
                <div className="relative w-24 h-24 group">
                {/* Imagen principal */}
                <Image
                    src={imagenTecnologia}
                    alt="imagen"
                    fill
                    className="w-full h-full rounded-full object-cover"
                />

                {/* Icono de editar */}
                <div className="absolute bottom-8 right-8 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                    <label className="w-full h-full cursor-pointer">
                        {/* Icono de lápiz */}
                        <Image src={pencilEdit} alt="Editar" className="w-full h-full" />
                        
                        {/* Input file oculto pero funcional */}
                        <input
                        type="file"
                        id="imagenTecnologia"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                            // Aquí guardas el archivo en tu useState
                                setImagenTecnologia(URL.createObjectURL(file))
                            }
                        }}
                        />
                    </label>
                    </div>
                </div>
                <input type="text"
                placeholder="nombre de la tecnologia"
                onChange={(e) => setNombreTecnologia(e.target.value)}
                className="w-full mt-8 mb-4 shadow-md pl-4 py-2 bg-[#fafafa] rounded-lg"
                />
                <button
                onClick={() => {
                    setCreadorTecnologiasAbierto(false)
                    guardarTecnologia()
                }}
                className="py-2 bg-green-500 text-white w-full rounded-lg">Guardar</button>
            </div>
        </ModalTechnologies>

        {/* lista de tecnologias */}

        <ul className="space-y-3">
            {tecnologias.map((tec) => (
                <TecnologiaItem key={tec.id} tecnologia={tec} />
            ))}
        </ul>
        </div>

        </div>


    )
}