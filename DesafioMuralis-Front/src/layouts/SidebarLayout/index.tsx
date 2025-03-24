import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { ResponsiveContainer } from "./styles";

export function SideBarLayout() {
    return (
        <ResponsiveContainer>
            <Sidebar />
            <Outlet />
        </ResponsiveContainer>
    )
}