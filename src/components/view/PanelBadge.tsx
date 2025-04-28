import React from "react";
import useHasDarkTheme from "./../../hooks/useHasDarkTheme";

import {
  faCheck,
  faTimes,
  faHourglass,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type PanelBadgeType = "OK" | "Error" | "Loading" | "None";

interface PanelBadgeProps {
  type: PanelBadgeType;
}

export function PanelBadge({ type }: PanelBadgeProps) {
  const isDarkTheme = useHasDarkTheme();

  if (type === "None") {
    return null;
  }

  let color: string = "";
  let icon: IconProp | null = null;
  switch (type) {
    case "OK":
      color = "green";
      icon = faCheck;
      break;
    case "Error":
      color = "red";
      icon = faTimes;
      break;
    case "Loading":
      color = isDarkTheme ? "orange" : "black";
      icon = faHourglass;
      break;
    default:
      throw Error(`Unrecognized badge ${type}.`);
  }

  return <FontAwesomeIcon style={{ color }} icon={icon!} />;
}
