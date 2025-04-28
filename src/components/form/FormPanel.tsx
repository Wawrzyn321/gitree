import React from "react";
import { CollapsiblePanel } from "../view/CollapsiblePanel";
import { PanelBadgeType } from "../view/PanelBadge";

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
  let type: PanelBadgeType;
  if (error) {
    type = "Error";
  } else if (loading) {
    type = "Loading";
  } else if (isOk) {
    type = "OK";
  } else {
    type = "None";
  }

  return (
    <CollapsiblePanel
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      type={type}
      title={title}
    >
      {children}
      {error && <p className="error">{error}</p>}
    </CollapsiblePanel>
  );
}
