import Image from "next/image";
import { NavLink } from "./navlink";
import Link from "next/link";
import LogoMuralis from "/Users/gabri/OneDrive/Área de Trabalho/code/Muralis/front-next/public/assets/LogoMuralis.png"

export function SideBar() {
  return (
    <div className="max-w-[337px] w-full h-screen flex flex-col justify-between p-16 px-8 bg-BlueMuralis text-white">
        <div>
            <Image
                src={LogoMuralis}
                alt="Logo"
                className="pb-8 border-b border-light-blue-muralis"
            />
            <div className="mt-8 flex flex-col gap-4">
                <NavLink href="/clientes">Clientes</NavLink>
                <NavLink href="/contatos">Contatos</NavLink>
            </div>
        </div>

      <div className="flex justify-center">
            <Link href="https://www.linkedin.com/in/gabrielfigueiredodeandrade/" target="_blank">
            Gabriel Figueiredo | Linkedin
            </Link>
      </div>
    </div>
  );
}
