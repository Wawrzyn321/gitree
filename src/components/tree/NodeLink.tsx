import React, { ForwardedRef, forwardRef } from "react";

import { GitreeContext } from "../../state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import useColors from "../../hooks/useColors";
import { Node } from "../../types/Node";

interface NodeLinkProps {
  node: Node;
}

export const NodeLink = forwardRef(function (
  { node }: NodeLinkProps,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  const { getUrl } = React.useContext(GitreeContext);
  const { action } = useColors();

  return (
    <a
      href={getUrl(node)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open on GitHub"
      ref={ref}
    >
      <FontAwesomeIcon color={action} icon={faExternalLinkAlt} />
    </a>
  );
});
