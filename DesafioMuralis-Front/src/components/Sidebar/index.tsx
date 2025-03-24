import { ActionsContainer, Asidebar } from "./styles";
import LogoMuralis from '../../assets/LogoMuralis.png'
import { AddressBook, UserCircle,   } from '@phosphor-icons/react'
import { NavLink } from "react-router-dom";


export function Sidebar() {
    return (
        <Asidebar>
            <div>
                <img src={LogoMuralis} alt=""/>
                <ActionsContainer>
                    <NavLink to="clientes">
                        <UserCircle size={38}/>
                        <p>Clientes</p>
                    </NavLink>
                    <NavLink to="contatos">   
                        <AddressBook size={38}/>
                        <p>Contatos</p>
                    </NavLink>
                </ActionsContainer>
            </div>
            <div>
                <p>Comércio S.A por:</p>
                <a href="https://www.linkedin.com/in/gabrielfigueiredodeandrade/"
                target="_blank"> Gabriel Figueiredo de Andrade | Linkedin
                </a>
            </div>
        </Asidebar>
    )
}