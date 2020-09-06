import React from "react";

import { GitreeContext } from "../../state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

interface NodeLinkProps {
  node: React.ReactNode;
  _ref?: any
}

export function NodeLink({ node, _ref }: NodeLinkProps) {
  const { getUrl } = React.useContext(GitreeContext);

  return (
    <a
      href={getUrl(node)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open on GitHub"
      ref={_ref}
    >
      <FontAwesomeIcon color="#0090FF" icon={faExternalLinkAlt} />
    </a>
  );
}
