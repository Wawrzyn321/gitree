import React, { CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import { GitreeContext } from "../../state";

const owners = [
  "kubernetes",
  "apache",
  "microsoft",
  "rust-lang",
  "dotnet",
  "nodejs",
  "tensorflow",
  "wordpress",
  "facebook",
  "gatsbyjs",
  "angular",
  "kyma-project",
];

const style = {
  margin: 0,
  padding: 0,
  width: "unset",
} as CSSProperties;

export function RandomOwnerButton() {
  const { state, setOwner } = React.useContext(GitreeContext);
  const { name } = state.ownerData;

  const setRandomOwner = (e: any) => {
    e.preventDefault();
    let nextOwner;
    do {
      nextOwner = owners[Math.floor(Math.random() * owners.length)];
    } while (name === nextOwner);
    setOwner(nextOwner);
  };

  return (
    <button style={style} className="link" onClick={setRandomOwner}>
      <FontAwesomeIcon icon={faDice} />
    </button>
  );
}
