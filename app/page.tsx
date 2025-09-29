"use client"

export default function Home() {
  const handleClick = () => {
    window.location.href = "/admin/dashboard"; 
  };

  return (
    <button
      onClick={handleClick}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Ir a otra ruta
    </button>
  );
}