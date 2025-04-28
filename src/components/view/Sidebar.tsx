import React from "react";

import "./Sidebar.scss";
import { OwnerDataForm } from "../form/OwnerDataForm";
import { RepoForm } from "../form/RepoForm";
import { BranchForm } from "../form/BranchForm";
import { TreePanel } from "../tree/TreePanel";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <form>
        <OwnerDataForm />
        <RepoForm />
        <BranchForm />
      </form>
      <TreePanel />
    </aside>
  );
}
