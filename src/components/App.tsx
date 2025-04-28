import React from "react";

import { Provider } from "../state";

import { TreeView } from "./tree/TreeView";
import { Sidebar } from "./view/Sidebar";

export default function App() {
  return (
    <Provider>
      <TreeView width={960} height={640} />
      <Sidebar />
    </Provider>
  );
}
