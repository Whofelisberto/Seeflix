'use client'
import React, { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { ArrowDownToLine } from 'lucide-react'
import Image from 'next/image'

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}
export interface Genre {
  id: number;
  name: string;
}

export default function PageGeneros({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY

  const [movies, setMovies] = useState<Movie[]>([])
  const [generoName , setGeneroName] = useState<string>('') 
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        setLoading(true)
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}&language=pt-BR&page=${page}`
        const response = await fetch(url)
        if (!response.ok) throw new Error('Erro ao buscar gênero')
        const data = await response.json()
        setMovies((PrevMovies) => {
          const newMovies = [...PrevMovies, ...data.results]
          const uniqueMovies = newMovies.filter(
            (movie, index, array) =>
              index === array.findIndex((m) => m.id === movie.id)
          )
          return uniqueMovies
        })
      } catch (error) {
        console.error('Erro:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGeneros()
  }, [id, apiKey, page])

  useEffect(() => {
    const fetchGeneroName = async () => {
      try {
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=pt-BR`
        const response = await fetch(url)
        if (!response.ok) throw new Error('Erro ao buscar nome do gênero')
        const data = await response.json()
        const genero = data.genres.find((g: Genre) => g.id === parseInt(id))
        setGeneroName(genero ? genero.name : 'Gênero Desconhecido')
      } catch (error) {
        console.error('Erro:', error)
      }
    }
    fetchGeneroName()
  }, [id, apiKey])

  return (
    <div className="min-h-screen p-6 text-white w-full">
      <h1 className="italic font-semibold text-2xl mb-6">
        Filmes do Gênero {generoName}
      </h1>

      {loading ? (
        <p>Carregando...</p>
      ) : movies.length === 0 ? (
        <p>Nenhum filme encontrado para esse gênero</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 container mx-auto">
          {movies.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              <div className="bg-gray-800 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                <div className="w-full h-[400px] max-sm:h-[300px] overflow-hidden">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={400}
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>

                <div className="absolute top-2 left-2 bg-black/80 text-green-400 text-sm font-semibold px-2 py-1 rounded-l-full border border-green-400">
                  {movie.vote_average.toFixed(1)}
                </div>

                <div className="p-3">
                  <h2 className="text-sm sm:text-base font-bold truncate text-center">
                    {movie.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6">
        <button type='button'
          onClick={() =>  setPage((prevPage) => prevPage + 1)}
          className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition font-semibold"
        >
          Exibir Mais <ArrowDownToLine size={20} className="inline ml-1" />
        </button>
      </div>
    </div>
  )
}
