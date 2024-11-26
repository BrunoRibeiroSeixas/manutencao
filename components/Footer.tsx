import React from "react"
import {
  
  AiOutlineHome,
  AiOutlineLinkedin,
} from "react-icons/ai"

const Footer = () => {
  return (
    <footer className="mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl ">
      <hr className="w-full h-0.5 mx-auto mt-8 bg-neutral-200 border-0"></hr>
      <div className="mx-auto  p-4 flex flex-col text-center text-neutral-900 md:flex-row md:justify-between">
        <div className="flex flex-row items-center justify-center space-x-1 text-neutral-500 dark:text-neutral-100">
        © 2024 Copyright. Companhia de Governança Eletrônica de Salvador (COGEL).<a href="/" className="hover:underline"></a>
        </div>
        <div className="flex flex-row items-center justify-center space-x-2 mb-1">
          <a
            href="https://www.linkedin.com/company/companhia-de-governanca-eletronica-do-salvador"
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineLinkedin
              className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-100"
              size={30}
            />
          </a>
          <a
            href="https://cogel.salvador.ba.gov.br/"
            rel="noreferrer"
            target="_blank"
            title="cogel.salvador.ba.gov.br"
          >
            <AiOutlineHome
              className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-100"
              size={30}
            />
          </a>
          
        </div>
      </div>
    </footer>
  )
}

export default Footer