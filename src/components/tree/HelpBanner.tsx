import React from "react";
import './HelpBanner.scss';

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
    </div>
  );
}
