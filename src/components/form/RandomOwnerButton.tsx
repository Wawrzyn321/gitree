import React, { CSSProperties, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import useColors from "../../hooks/useColors";
import { useGitreeContext } from "../../state/useGitreeContext";

const OWNERS = [
  "kubernetes",
  "apache",
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

function getRandomOwner(prevOwner: string) {
  let nextOwner;
  do {
    nextOwner = OWNERS[Math.floor(Math.random() * OWNERS.length)];
  } while (prevOwner === nextOwner);
  return nextOwner;
}

const style = {
  margin: 0,
  padding: 0,
  width: "unset",
} as CSSProperties;

export function RandomOwnerButton() {
  const { action } = useColors();
  const { state, setOwner } = useGitreeContext();
  const { owner } = state.ownerData;

  const setRandomOwner = (e: MouseEvent) => {
    e.preventDefault();
    setOwner(getRandomOwner(owner));
  };

  return (
    <button
      style={style}
      type="button"
      className="link"
      onClick={setRandomOwner}
    >
      <FontAwesomeIcon icon={faDice} color={action} />
    </button>
  );
}
