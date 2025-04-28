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

type getBadgeTypeArgs = {
  error: string | null;
  isOk: boolean;
  loading: boolean;
};

function getBadgeType({
  error,
  isOk,
  loading,
}: getBadgeTypeArgs): PanelBadgeType {
  if (error) {
    return "Error";
  } else if (loading) {
    return "Loading";
  } else if (isOk) {
    return "OK";
  } else {
    return "None";
  }
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
