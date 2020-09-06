import React from "react";
import { PanelBadgeType, CollapsiblePanel } from "../view/CollapsiblePanel";

export interface FormPanelProps {
  title: string;
  isOk: boolean;
  collapsed: boolean;
  loading: boolean;
  error: string;
  children: React.ReactNode;
}

export function FormPanel(props: FormPanelProps) {
  const { title, isOk, collapsed, loading, error, children } = props;
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
      initialCollapsed={collapsed}
      type={type}
      title={title}
    >
      {children}
      {error && <p className="error">{error}</p>}
    </CollapsiblePanel>
  );
}
