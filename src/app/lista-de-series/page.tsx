"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDownToLine } from "lucide-react";

interface Series {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
}

export default function pageSeries() {
  const [series, setSeries] = useState<Series[]>([]);
  const [page, setPage] = useState(1);

  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=pt-BR&page=${page}`;

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Erro ao buscar series");
        }
        const data = await response.json();
  setSeries((prevSeries) => {
    const newSeries = [...prevSeries, ...data.results];
    const uniqueSeries = newSeries.filter((serie, index, array) => index === array.findIndex((s) => 
      s.id === serie.id));
    return uniqueSeries;
  });
      } catch (error) {
        console.error("Erro ao buscar series:", error);
      }
    };
    fetchSeries();
  }, [page]);

  return (
    <div className="p-6 container mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {series.map((serie) => (
          <Link key={serie.id} href={`/tv/${serie.id}`}>
            <div className="bg-gray-800 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 relative overflow-hidden">
              <div className="w-full h-[400px] max-sm:h-[300px] overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
              alt={serie.name}
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>
              <div className="absolute top-2 left-2 bg-black/80 text-green-400 text-sm font-semibold px-2 py-1 rounded-l-full border border-green-400">
                  {serie.vote_average.toFixed(1)}
                </div>
             <div className="p-3">
              <h2 className="text-sm sm:text-base font-bold truncate text-white text-center">
                {serie.name}
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
