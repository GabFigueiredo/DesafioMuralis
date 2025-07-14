import { NavLink } from "./navlink";
import Link from "next/link";

export function SideBar() {
  return (
    <div className="max-w-[337px] w-full h-screen flex flex-col justify-between p-16 px-8 bg-BlueMuralis text-white">
        <div>
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
