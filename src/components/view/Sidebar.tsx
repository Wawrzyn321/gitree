import React from "react";

// import { faHamburger } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Sidebar.scss";

interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  // const [isSidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  // const className = isSidebarCollapsed
  //   ? "sidebar collapsed"
  //   : "sidebar expanded";

  return (
    // <aside className={className}>
    <aside className="sidebar expanded">
      {/* <button
        onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
        aria-label="expand/collapse"
      >
        <FontAwesomeIcon icon={faHamburger} />
      </button> */}
      {children}
    </aside>
  );
}
