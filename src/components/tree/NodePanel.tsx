import React, { CSSProperties } from "react";

import filesize from "filesize";
import { Node } from "../../types/Node";
import { GitreeContext } from "../../state";

import { faFile, faFolder, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const style = {marginLeft: '8px'} as CSSProperties;

interface NodePanelProps {
    node: Node,
}

export function NodePanel({ node }: NodePanelProps) {
  const { getUrl } = React.useContext(GitreeContext);

  if (!node) return null;
    const icon = node.type === "file" ? faFile : faFolder;
    return (
      <section className="node-panel">
        <h5>
          <FontAwesomeIcon color="#0090FF" icon={icon} />
          Name: {node.path || 'root'}
          <a
            href={getUrl(node)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open on GitHub"
          >
            <FontAwesomeIcon color="#0090FF" icon={faExternalLinkAlt} style={style}/>
          </a>
        </h5>
        <p>Size: {filesize(node.size)}</p>
      </section>
    );
  };
