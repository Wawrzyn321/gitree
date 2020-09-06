import React from "react";

import filesize from "filesize";
import { Node } from "../../types/Node";
import { GitreeContext } from "../../state";

import {
  faFile,
  faFolder,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NodePanel.scss";

interface NodePanelProps {
  node: Node;
  showLink?: boolean;
}

export function NodePanel({ node, showLink }: NodePanelProps) {
  const { getUrl } = React.useContext(GitreeContext);

  if (!node) return null;
  const icon = node.type === "file" ? faFile : faFolder;
  return (
    <section className="node-panel">
      <h5>
        <FontAwesomeIcon color="#0090FF" icon={icon} />
        Name: {node.path || "root"}
        <a
          href={getUrl(node)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open on GitHub"
        >
          {showLink && (
            <FontAwesomeIcon color="#0090FF" icon={faExternalLinkAlt} />
          )}
        </a>
      </h5>
      <p>Size: {filesize(node.size)}</p>
    </section>
  );
}
