import React from "react";

import { PanelBadge, PanelBadgeType } from "./PanelBadge";
import "./CollapsiblePanel.scss";

interface CollapsiblePanelProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  title: string;
  children: React.ReactNode;
  badgeType: PanelBadgeType;
}

export function CollapsiblePanel({
  collapsed,
  setCollapsed,
  title,
  badgeType,
  children,
}: CollapsiblePanelProps) {
  return (
    <div className="collapsible-panel">
      <h4 className="title" onClick={() => setCollapsed(!collapsed)}>
        {title}
        <PanelBadge type={badgeType} />
      </h4>
      <div className={collapsed ? "content collapsed" : "content expanded"}>
        {children}
      </div>
    </div>
  );
}
