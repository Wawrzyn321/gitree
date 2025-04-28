import React from "react";
import { CollapsiblePanel } from "../view/CollapsiblePanel";
import { getBadgeType } from "./utils/getBadgeType";

export interface FormPanelProps {
  title: string;
  isOk: boolean;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
}

export function FormPanel(props: FormPanelProps) {
  const { title, isOk, collapsed, setCollapsed, loading, error, children } =
    props;

  const badgeType = getBadgeType({ error, isOk, loading });

  return (
    <CollapsiblePanel
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      badgeType={badgeType}
      title={title}
    >
      {children}
      {error && <p className="error">{error}</p>}
    </CollapsiblePanel>
  );
}
