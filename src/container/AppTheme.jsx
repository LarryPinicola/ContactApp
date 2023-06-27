import useTheme from "../hooks/useTheme";

export default function AppTheme({ children }) {
	const { theme } = useTheme();
	return (
		<div className={`${theme === "dark" ? "dark" : ""}`}>{children}</div>
	);
}
