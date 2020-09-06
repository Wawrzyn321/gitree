import React from "react";
import {
  faCheck,
  faTimes,
  faHourglass,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import './CollapsiblePanel.scss'

interface CollapsiblePanelProps {
  initialCollapsed: boolean;
  title: string;
  children: React.ReactNode;
  type: PanelBadgeType;
}

export type PanelBadgeType = "OK" | "Error" | "Loading" | "None";

interface PanelBadgeProps {
  type: PanelBadgeType;
}

function PanelBadge({ type }: PanelBadgeProps) {
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
      color = "black";
      icon = faHourglass;
      break;
    default:
      throw Error(`Unrecognized badge ${type}.`);
  }

  return <FontAwesomeIcon style={{ color }} icon={icon!} />;
}

export function CollapsiblePanel(props: CollapsiblePanelProps) {
  const { initialCollapsed, title, type, children } = props;
  const [collapsed, setCollapsed] = React.useState(initialCollapsed);

  React.useEffect(() => setCollapsed(initialCollapsed), [initialCollapsed]);

  return (
    <div className="collapsible-panel">
      <h4 className="title" onClick={() => setCollapsed(!collapsed)}>
        {title}
        <PanelBadge type={type} />
      </h4>
      <div className={collapsed ? "content collapsed" : "content expanded"}>
        {children}
      </div>
    </div>
  );
}
