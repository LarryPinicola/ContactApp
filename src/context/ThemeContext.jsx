import { createContext, useState } from "react";

// light | dark | system
export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
	const [theme, setTheme] = useState("dark");
	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}