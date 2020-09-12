import React from "react";

import filesize from "filesize";
import { Node } from "../../types/Node";

import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NodeLink } from "./NodeLink";
import "./NodePanel.scss";

interface NodePanelProps {
  node: Node;
  showLink?: boolean;
}

export function NodePanel({ node, showLink }: NodePanelProps) {
  if (!node) return null;
  const icon = node.type === "file" ? faFile : faFolder;
  return (
    <section className="node-panel">
      <h5>
        <FontAwesomeIcon color="#0090FF" icon={icon} />
        Name: {node.path}
        {showLink && <NodeLink node={node} />}
      </h5>
      <p>Size: {filesize(node.size)}</p>
    </section>
  );
}
