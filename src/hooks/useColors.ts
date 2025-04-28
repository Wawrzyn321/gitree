import useHasDarkTheme from "./useHasDarkTheme";

export interface Colors {
  actionDark: string;
  actionLight: string;
  action: string;
}

export default function useColors(): Colors {
  const style = window.getComputedStyle(document.documentElement);
  const hasDarkTheme = useHasDarkTheme();

  const actionDark = style.getPropertyValue("--action-dark");
  const actionLight = style.getPropertyValue("--action");

  return {
    actionDark,
    actionLight,
    action: hasDarkTheme ? actionDark : actionLight,
  };
}
