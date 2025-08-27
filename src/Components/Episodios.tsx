"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Temporada {
  id: number;
  name: string;
  season_number: number;
  air_date: string;
  episode_count: number;
}

interface Episodio {
  id: number;
  name: string;
  episode_number: number;
  overview: string;
  air_date: string;
  still_path: string | null;
}

export default function Episodios() {
  const { id } = useParams();
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const [temporadas, setTemporadas] = useState<Temporada[]>([]);
  const [selecionarTemporada, setSelecionarTemporada] = useState<number>(1);
  const [episodios, setEpisodios] = useState<Episodio[]>([]);

 
  useEffect(() => {
    const fetchTemporadas = async () => {
      try {
        const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro ao buscar a série");
        const data = await response.json();
        setTemporadas(data.seasons);

        setSelecionarTemporada(data.seasons[0].season_number);
      } catch (error) {
        console.error("Erro:", error);
      }
    };
    fetchTemporadas();
  }, [id]);

  useEffect(() => {
    if (!selecionarTemporada) return;

    const fetchEpisodios = async () => {
      try {
        const url = `https://api.themoviedb.org/3/tv/${id}/season/${selecionarTemporada}?api_key=${apiKey}&language=pt-BR`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro ao buscar episódios");
        const data = await response.json();
        setEpisodios(data.episodes);
      } catch (error) {
        console.error("Erro:", error);
      }
    };
    fetchEpisodios();
  }, [id, selecionarTemporada]);

  return (
    <div>
      <h2 className="text-lg bg-green-500 mt-5 rounded p-4 font-bold">
        Episódios
      </h2>

     
      <select
        value={selecionarTemporada}
        onChange={(e) => setSelecionarTemporada(Number(e.target.value))}
        className="mb-4 p-2 rounded bg-green-500 mt-5 font-bold  max-w-3xs"
      >
        {temporadas.map((temp) => (
          <option className="font-semibold text-sm" key={temp.id} value={temp.season_number}>
            {temp.name}
          </option>
        ))}
      </select>

     
      <div className="w-full">
        <ul>
          {episodios.map((episodio) => (
            <li key={episodio.id} className="mb-2 bg-gray-800 p-4 rounded-lg">
              <div className="flex max-sm:flex-col max-sm:items-center ">
                {episodio.still_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${episodio.still_path}`}
                  alt={episodio.name}
                  width={250}
                  height={40}
                  className="bg-cover rounded hover:scale-105 transition-transform duration-300 "
                />
                ) : (
                  <div className="w-62 h-36 bg-gray-600 flex items-center justify-center rounded">
                    <span className="text-gray-300 font-semibold uppercase">Em Breve</span>
                  </div>
                )}
                <div className="flex-col ml-4">
                  <h1 className="font-bold max-sm:text-sm sm:text-sm md:text-md lg:text-lg">
                    {episodio.episode_number}. {episodio.name}
                  </h1>
                  <p className="max-sm:text-xs sm:text-sm md:text-md lg:text-lg mt-1">
                    {episodio.overview}
                  </p>
                  <p className="max-sm:text-xs sm:text-sm md:text-md lg:text-md mt-1"><span className="font-bold">Lançamento: </span>{episodio.air_date}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
