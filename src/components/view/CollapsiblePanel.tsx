import React from "react";

import { PanelBadge, PanelBadgeType } from "./PanelBadge";
import "./CollapsiblePanel.scss";

interface CollapsiblePanelProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  title: string;
  children: React.ReactNode;
  type: PanelBadgeType;
}

export function CollapsiblePanel(props: CollapsiblePanelProps) {
  const { collapsed, setCollapsed, title, type, children } = props;

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
