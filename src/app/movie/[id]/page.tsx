'use client';
import React, { useEffect, useState } from "react";
import Watch from "@/Components/Watch";
import Image from "next/image";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  title: string;
  genres: Genre[];
  poster_path: string;
  overview: string;
  vote_average: number;
  backdrop_path: string | null;
  release_date?: string;
  status: string;
  popularity: number;
}

export default function PageFilmes({ params }: { params: Promise<{ id: string }> }) {
 
  const { id } = React.use(params);
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`;

  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro ao buscar filme");
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Erro:", error);
      }
    };
    fetchMovie();
  }, [url]);

  return (
    <div className="p-6 text-white min-h-screen">
  {!movie ? (
    <p>Filme não encontrado...</p>
  ) : (
    <div
      className="relative bg-center bg-no-repeat rounded-lg min-h-[400px] p-6 text-white"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
      }}
    >
      {/* efeito para escurecer o fundo do filme*/}
      <div className="absolute inset-0 bg-gray bg-gray-500 opacity-50 rounded-lg"></div>

      {/* conteúdo por cima do fundo */}
      <div className="relative z-10 flex flex-col md:flex-row items-start">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={400}
          height={200}
          className="w-80 h-auto rounded-lg mr-6 shadow-lg"
        />

        <div className="mt-4 md:mt-0 md:w-2/3">
          <h1 className="text-3xl font-bold mb-4 max-md:text-lg">{movie.title}</h1>
          <p className="mb-4 text-lg max-md:text-sm">
            <span className="font-bold uppercase max-md:text-sm">Sinopse:</span> {movie.overview}
          </p>
          <p className="max-md:text-sm"><span className="font-bold uppercase max-md:text-sm">Generos:</span> {movie.genres.map((genre) => genre.name).join(', ')}</p>
          <p className="max-md:text-sm"><span className="font-bold uppercase">Nota:</span> {movie.vote_average.toFixed(1)}</p>
          <p className="max-md:text-sm"><span className="font-bold uppercase">Lançamento:</span> {movie.release_date}</p>
          <p className="max-md:text-sm"><span className="font-bold uppercase">Popularidade:</span> {movie.popularity}</p>
          <p className="max-md:text-sm"><span className="font-bold uppercase">Status:</span> {movie.status}</p>
        </div>
      </div>
    </div>
  )}
      <Watch />
</div>
  );
}
