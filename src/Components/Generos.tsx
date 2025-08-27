'use client'
import { useState , useEffect } from "react";
import Link from "next/link";

export interface Generos {
  id: number;
  name: string;
}



export default function Generos() {

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=pt-BR`;
const [generos , setGeneros] = useState<Generos[]>([]);

useEffect(() => {
  const fetchGeneros = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("erro ao buscar genero")
      }
      const data = await response.json();
    setGeneros(data.genres);
    } catch (error) {
      console.error("Erro:", error);
    }
  };
    
  fetchGeneros();
}, []);


  return (
    <div className="mt-10 text-white p-2 rounded container mx-auto">
      <h2 className="text-2xl font-semibold mb-5 italic">Gêneros</h2>

     <div>
      <ul className="flex w-full gap-2 justify-center flex-wrap">
        {generos.map((genero) => (
          <li key={genero.id}>
            <Link href={`/genre/${genero.id}`}>
            <p className=" p2 
          px-2 text-center font-semibold italic text-sm hover:bg-gray-500 rounded-lg transition">{genero.name}</p>
            </Link>
          </li>
        ))}

      </ul>
     </div>
    </div>
  );
}
