import React from "react";

import { GitreeProvider } from "../state/GitreeContext";

import { TreeView } from "./tree/TreeView";
import { Sidebar } from "./view/Sidebar";

export default function App() {
  return (
    <GitreeProvider>
      <TreeView width={960} height={640} />
      <Sidebar />
    </GitreeProvider>
  );
}
