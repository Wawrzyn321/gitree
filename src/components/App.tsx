import React from "react";

import { Provider } from "../state";

import { TreeView } from "./tree/TreeView";
import { UserDataForm } from "./form/UserDataForm";
import { RepoForm } from "./form/RepoForm";
import { BranchForm } from "./form/BranchForm";
import { TreePanel } from "./tree/TreePanel";
import { Sidebar } from "./view/Sidebar";

export default function App() {
  return (
    <Provider>
      <TreeView width={960} height={640} />
      <Sidebar>
        <form>
          <UserDataForm />
          <RepoForm />
          <BranchForm />
        </form>
        <TreePanel />
      </Sidebar>
    </Provider>
  );
}
