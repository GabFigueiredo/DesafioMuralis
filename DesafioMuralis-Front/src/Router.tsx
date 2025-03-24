import { Route, Routes } from "react-router-dom";
import { Contatos } from "./pages/Contatos";
import { Clientes } from "./pages/Clientes";
import { SideBarLayout } from "./layouts/SidebarLayout";

export function Router() {
    return (
        <Routes>
            <Route path='/' element={<SideBarLayout />}>
                <Route path="/contatos" element={<Contatos />}/>
                <Route path="/clientes" element={<Clientes />}/>
            </Route>
        </Routes>
    )
}