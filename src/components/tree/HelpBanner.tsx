import React from "react";

import './HelpBanner.scss';
import { RandomOwnerButton } from "../form/RandomOwnerButton";

export function HelpBanner() {
  return (
    <div className="help-banner">
      <h1>Hi!</h1>
      <p>
        This is
        <span role="img" aria-label="">
          {" "}
          🌳{" "}
        </span>
        Gitree.
      </p>
      <p>You can map a GitHub repository like in WinDirStat or SpaceSniffer.</p>
      <p>
        Please set a GitHub username or organisation name on the right panel, then follow the steps!
      </p>
      <p>
        You can always press the <RandomOwnerButton /> to choose a popular random repo.
      </p>
    </div>
  );
}
