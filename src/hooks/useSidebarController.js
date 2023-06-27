import { useContext } from "react";
import { SidebarContext } from "../context/SidebarConext";

const useSidebarController = () => useContext(SidebarContext);
export default useSidebarController;
