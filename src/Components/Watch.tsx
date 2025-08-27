import Image from "next/image";
import { Play } from "lucide-react";
import Link from "next/link";

export default function Watch() {
  return (
    <div className="text-white mt-5">
      <h1 className="bg-green-500 p-4 font-bold uppercase rounded-lg">
        streams
      </h1>
      <div className="flex justify-center mt-2">
        <div className="w-dvh h-28 bg-gray-700 rounded-lg mt-4">
          <div className="flex justify-between space-x-15 rounded-l-lg p-5 max-md:grid grid-cols-4 max-md:gap-5 max-md:items-center">
            <Image
              src="/itunes.jpg"
              alt="itunes"
              width={100}
              height={20}
              className="rounded-lg"
            />
            <div className="space-x-1">
              <p className="font-semibold max-md:text-xs">Português, Inglês</p>
              <div className="flex space-x-1">
                <span className="border border-white inline-block text-xs px-1">
                  CC
                </span>
                <span className="border border-green-500 inline-block text-xs px-1">
                  4K
                </span>
              </div>
            </div>
            <div className="max-md:flex flex-col">
              <p className="font-semibold max-md:text-xs">Comprar</p>
              <div className="flex items-center gap-1">
                <span className="text-sm max-md:text-xs">R$</span>
                <span className="text-sm max-md:text-xs">59,90</span>
              </div>
            </div>
            <button className="text-white font-semibold bg-gray-600 rounded-lg py-2 px-4 max-md:text-xs max-md:py-1 max-md:px-1">
              <Link href="https://tv.apple.com/br" target="_blank" rel="noopener noreferrer">
              <div className="flex gap-1 uppercase">
                <Play className="max-sm:hidden" />
                Assista Agora
              </div>
              </Link>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-dvh h-28 bg-gray-800 rounded-lg mt-1">
          <div className=" flex justify-between space-x-15 rounded-l-lg p-5 max-md:grid grid-cols-4 max-md:gap-5 max-md:items-center">
            <Image
              src="/amazon.jpg"
              alt="itunes"
              width={100}
              height={20}
              className="rounded-lg"
            />
            <div className="space-x-1">
              <p className="font-semibold max-md:text-xs">Português, Inglês</p>
              <div className="flex space-x-1">
                <span className="border border-white inline-block text-xs px-1">
                  CC
                </span>
                <span className="border border-green-500 inline-block text-xs px-1">
                  4K
                </span>
              </div>
            </div>
            <div className="max-md:flex flex-col">
              <p className="font-semibold max-md:text-xs">Comprar</p>
              <div className="flex items-center gap-1">
                <span className="text-sm max-md:text-xs">R$</span>
                <span className="text-sm max-md:text-xs">59,90</span>
              </div>
            </div>
            <button className="text-white font-semibold bg-gray-600 rounded-lg py-2 px-4 max-md:text-xs max-md:py-1 max-md:px-1">
              <Link href="https://www.primevideo.com/"  target="_blank" rel="noopener noreferrer">
              <div className="flex gap-1 uppercase">
                <Play className="max-sm:hidden" />
                Assista Agora
              </div>
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-dvh h-28 bg-gray-700 rounded-lg mt-1">
          <div className=" flex justify-between space-x-15 rounded-l-lg p-5 max-md:grid grid-cols-4 max-md:gap-5 max-md:items-center">
            <Image
              src="/amazonprimevideo.jpg"
              alt="itunes"
              width={100}
              height={20}
              className="rounded-lg"
            />
            <div className="space-x-1">
              <p className="font-semibold max-md:text-xs">Português, Inglês</p>
              <div className="flex space-x-1">
                <span className="border border-white inline-block text-xs px-1">
                  CC
                </span>
                <span className="border border-green-500 inline-block text-xs px-1">
                  4K
                </span>
              </div>
            </div>
            <div className="max-md:flex flex-col">
              <p className="font-semibold max-md:text-xs">Comprar</p>
              <div className="flex items-center gap-1">
                <span className="text-sm max-md:text-xs">R$</span>
                <span className="text-sm max-md:text-xs">19,90</span>
              </div>
            </div>
            <button className="text-white font-semibold bg-gray-600 rounded-lg py-2 px-4 max-md:text-xs max-md:py-1 max-md:px-1">
              <Link href="https://www.primevideo.com/" target="_blank" rel="noopener noreferrer">
              <div className="flex gap-1 uppercase">
                <Play className="max-sm:hidden" />
                Assista Agora
              </div>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
