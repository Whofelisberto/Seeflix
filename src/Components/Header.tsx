"use client";
import Link from "next/link";
import { Home, Film, LogIn, Tv, TvMinimalPlay, Menu, X , Search } from "lucide-react";
import { useState, useEffect, use } from "react";
import Image from "next/image";

 interface Movie {
  id: number;
  title: string;
  name: string;
  media_type: string;
  poster_path: string;
  overview: string;
 }
 interface Tv {
  id: number;
  title: string;
  name: string;
  media_type: string;
  poster_path: string;
  overview: string;
 }

 type SearchResult = Movie | Tv;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [busca , setBusca] = useState("");
  const [resultadosBusca , setResultadosBusca] = useState<SearchResult[]>([]);

   const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;


  useEffect(() => {
    const handleSearch = async ()  => {
  const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=pt-BR&query=${busca}`);
  const data = await response.json();
  setResultadosBusca(data.results);
}
    
    handleSearch();
}, [busca, apiKey]);

const getLink = (item: SearchResult) => {
    if (item.media_type === "movie") return `/movie/${item.id}`;
    if (item.media_type === "tv") return `/tv/${item.id}`;
    return "/";
  };


  return (
    <header className="bg-gray-800 text-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
       <div className="flex items-center gap-4 w-full max-sm:gap-2">
        <Link href="/" className="text-2xl font-semibold font-serif hover:text-green-500 transition">
          SeeFlix 
        </Link>
        <div className="relative w-full max-w-3xs max-sm:w-25">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="Pesquisar..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="bg-gray-700 text-white pl-10 pr-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
      />
    </div>

          {busca && resultadosBusca.length > 0 && (
        <div className="absolute top-full left-0 bg-gray-800 text-white max-h-62 shadow-lg z-100 overflow-y-auto max-w-lg max-sm:w-xs">
          {resultadosBusca.map((item) => (
            <Link
              key={item.id}
              href={getLink(item)}
              onClick={() => {setBusca(""); setResultadosBusca([])}}
              className="block p-2"
            >
              <div className="flex space-x-2 hover:bg-gray-500 rounded p-2">
              <Image src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name}
              width={120}
              height={20}
              className="bg-cover rounded-lg" 
              />
              <p className="font-semibold max-sm:text-sm">{item.title || item.name}
                <br/>
                <br/>
              <span className="text-xs line-clamp-6">{item.overview}</span></p>
              
              </div>
            </Link>
          ))}
        </div>
      )}</div>

       
        <nav className="hidden md:flex gap-6 text-sm items-center">
          <Link
            href="/"
            className="hover:text-green-500 transition flex items-center gap-2"
          >
            <Home size={18} />
            Home
          </Link>

          <Link
            href="/lista-de-filmes"
            className="hover:text-green-500 transition flex items-center gap-2"
          >
            <Film size={18} />
            Filmes
          </Link>

          <Link
            href="/lista-de-series"
            className="hover:text-green-500 transition flex items-center gap-2"
          >
            <Tv size={18} />
            Séries
          </Link>

          <Link
            href="/lista-de-animes"
            className="hover:text-green-500 transition flex items-center gap-2"
          >
            <TvMinimalPlay size={18} />
            Animes
          </Link>

          <Link
            href="/login"
            className="hover:text-green-500 transition flex items-center gap-2"
          >
            <LogIn size={18} />
            Login
          </Link>

        </nav>

      
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

   
      {isOpen && (
        <nav className="md:hidden flex flex-col p-4 bg-gray-900 font-semibold space-y-4">
          <Link
            href="/"
            className="hover:text-green-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/lista-de-filmes"
            className="hover:text-green-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Filmes
          </Link>
          <Link
            href="/lista-de-series"
            className="hover:text-green-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Séries
          </Link>
          <Link
            href="/lista-de-animes"
            className="hover:text-green-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Animes
          </Link>
          <Link
            href="/login"
            className="hover:text-green-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </nav>
      )}
    </header>
  );
}