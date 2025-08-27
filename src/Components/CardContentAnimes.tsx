'use client';
import { useState, useEffect } from "react";
import Link from "next/link";

interface Animes {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
}

export default function CardContentAnimes() {

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=16&with_original_language=ja&sort_by=popularity.desc
`;

const [animes, setAnimes] = useState<Animes[]>([]);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Erro ao buscar filmes");
        }
        const data = await response.json();
        setAnimes(data.results);
      } catch (error) {
        console.error("Erro:", error);
      }
    };
    fetchAnimes();
  }, []);

  return (
    <>
    <div className="text-white p-5 py-3 w-full">
    <h1 className="italic font-semibold text-2xl mb-6">Animes Populares</h1>
    <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-10 gap-6">
        {animes.slice(0, 10).map((anime) => (
          <Link key={anime.id} href={`/tv/${anime.id}`}>
            <div className="bg-gray-800 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 relative overflow-hidden">
              
              <img
                src={`https://image.tmdb.org/t/p/w500${anime.poster_path}`}
                alt={anime.name}
                className="w-full h-auto rounded-t-lg object-cover"
              />

              
              <div className="absolute top-2 left-2 bg-black/80 text-green-400 text-sm font-semibold px-2 py-1 rounded-l-full border border-green-400">
                {anime.vote_average.toFixed(1)}
              </div>

              
              <div className="p-3">
                <h2 className="text-sm sm:text-base font-bold truncate">
                  {anime.name}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  )
}
