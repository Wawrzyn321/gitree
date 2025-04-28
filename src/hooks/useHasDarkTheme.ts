export default function useHasDarkTheme() {
  return matchMedia("(prefers-color-scheme: dark)").matches;
}
