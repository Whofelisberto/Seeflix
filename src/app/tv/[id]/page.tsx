'use client';
import React, { useState , useEffect } from 'react'
import Episodios from '@/Components/Episodios';

interface Genre {
  id: number;
  name: string;
}

interface Series {
  name: string;
  genres: Genre[];
  episode_run_time: number;
  first_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  overview: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string | null;
  release_date?: string;
  status: string;
  popularity: number;
}

export default function pageSeries( { params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR&page=1`;

  const [series , setSeries] = useState<Series | null>(null);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro ao buscar série");
        const data = await response.json();
        setSeries(data);
      } catch (error) {
        console.error("Erro:", error);
      }
    };
    fetchSeries();
  }, [url]);

  return (
    <div className='min-h-screen p-6 text-white'>
      {!series ? (
        <p>series não encontrata</p>
      ) : (
        <div className="relative bg-center bg-no-repeat rounded-lg min-h-[400px] p-6 text-white"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${series.backdrop_path})`,
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-gray bg-gray-500 opacity-50 rounded-lg"></div>

         <div className="relative z-10 flex flex-col md:flex-row items-start">
        <img
          src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
          alt={series.name}
          className="w-80 h-auto rounded-lg mr-6 shadow-lg"
        />

        <div className="mt-4 md:mt-0 md:w-2/3">
          <h1 className="text-3xl font-bold mb-4 max-md:text-lg">{series.name}</h1>
          <p className="mb-4 text-lg max-md:text-sm">
            <span className="font-bold uppercase max-md:text-sm">Sinopse:</span> {series.overview}
          </p>
          <p className="max-md:text-sm"><span className="font-bold uppercase max-md:text-sm">Generos:</span> {series.genres.map((genre) => genre.name).join(', ')}</p>
          <p className="max-md:text-sm"><span className="font-bold uppercase">Lançamento:</span> {series.first_air_date}</p>
          <p className="max-md:text-sm"><span className="font-bold uppercase">Nota:</span> {series.vote_average.toFixed(1)}</p>
          <p className="max-md:text-sm"><span className="font-bold uppercase">Popularidade:</span> {series.popularity}</p>
          <p className="max-md:text-sm"><span className="font-bold uppercase">Status:</span> {series.status}</p>
          <p className="max-md:text-sm"><span className="font-bold uppercase">Temporadas:</span> {series.number_of_seasons}</p>
          <p className="max-md:text-sm"><span className="font-bold uppercase">Episódios:</span> {series.number_of_episodes}</p>
        </div>
      </div>
    </div>
      )}
      <Episodios />
      </div>
  )
}
