"use client"; // this is a client component
import React from "react";
import Image from "next/image";
import logo_pms from "../public/prefeitura_letra_branca.png";
import gear from "../public/tools.png";

const HeroSection = () => {
  return (
    <section id="home">
      <div className="bg-gray-500 min-h-screen flex flex-col justify-center items-center">
        <Image
          src={logo_pms}
          alt="Logo"
          width={800}
          height={160}
          className="mb-20"
        />
        <div className="flex">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white ">
            Este site está em Manutenção
          </h1>
          <Image
            src={gear}
            alt="Logo"
            width={60}
            height={60}
            className="ml-4 mb-4 hidden sm:block" // Esconde no mobile
          />
        </div>

        <p className="text-center text-white text-lg md:text-xl lg:text-2xl mb-8 mt-2">
          Estamos trabalhando para disponibilizá-lo o mais rápido possível.
        </p>
        <div className="flex space-x-4">
          <a
            href="#"
            className="bg-sky-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded"
          >
            Contate-nos
          </a>
          <button
            onClick={() => window.location.reload()}
            className="border-2 border-sky-500 text-white font-bold py-3 px-6 rounded"
          >
            Atualizar
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;