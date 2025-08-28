"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDownToLine } from "lucide-react";
import Image from "next/image";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export default function ListaFilmes() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=${page}`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Erro ao buscar filmes");
        }
        const data = await response.json();
        setMovies((prevMovies) => {
        const newMovie = [...prevMovies, ...data.results];
        const uniqueMovies = newMovie.filter((movie, index, array) => index === array.findIndex((m) => m.id === movie.id));
        return uniqueMovies;
        });
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };
    fetchMovies();
  }, [page]);

  return (
    <div className="p-6 container mx-auto ">
      <h1 className="text-white text-2xl font-bold mb-4">Lista de Filmes</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
              {/* transição que adorei para colocar nas imagens */}
            <div className="bg-gray-800 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 relative overflow-hidden">
              
              <div className="w-full h-[400px] max-sm:h-[300px] overflow-hidden">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={400}
              height={200}
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>
              <div className="absolute top-2 left-2 bg-black/80 text-green-400 text-sm font-semibold px-2 py-1 rounded-l-full border border-green-400">
                  {movie.vote_average.toFixed(1)}
                </div>

              <div className="p-3">
                  {/* usando o truncate as palavras colocam ... quando n cabem no container */}
                <h2 className="text-sm sm:text-base font-bold truncate text-white text-center">
                  {movie.title}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition font-semibold"
        >Exibir Mais <ArrowDownToLine size={20} className="inline ml-1" />
        </button>
      </div>
    </div>
  );
}
