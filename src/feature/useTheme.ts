export default function useTheme(theme: string) {
   document.documentElement.setAttribute("data-theme", theme);
}