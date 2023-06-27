import { createContext, useState } from "react";

const initialState = {
	isOpen: false,
	setIsOpen: () => undefined,
};
export const SidebarContext = createContext(initialState);

export default function SidebarProvider({ children }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<SidebarContext.Provider value={{ isOpen, setIsOpen }}>
			{children}
		</SidebarContext.Provider>
	);
}
