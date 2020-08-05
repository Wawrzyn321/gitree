import React from "react";
import { Branch } from "../types/GithubFile";
import { fetchFiles } from "../api/api";
import { buildTree } from "../domain/fileTree";
import { TreeView } from "./TreeRenderer";

interface ChooseBranchProps {
    user: string;
    repo: string;
    token: string;
    branches: Branch[];
}

export function ChooseBranch(props: ChooseBranchProps) {
  const { user, repo, token, branches } = props;

  const [branch, setBranch] = React.useState<Branch | null>(
    branches.find((b: Branch) => b.name === "master") || null
  );
  const [tree, setTree] = React.useState<any>(null);

  if (!branches.length) {
    return <p>No repos found.</p>;
  } else {
    return (
      <div>
        <label>
          Choose branch:
          <select
            value={branch ? branch.name : ".none"}
            onChange={(e) => {
              setBranch(
                branches.find((b: Branch) => b.name === e.target.value)!
              );
              if (branch === null || branch.name !== e.target.value) {
                setTree(null);
              }
            }}
          >
            <option value=".none" disabled hidden>
              Select branch
            </option>
            {branches.map((b: Branch) => (
              <option key={b.name} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
        <button
          disabled={!branch}
          onClick={async () => {
            const files = await fetchFiles(user, repo, branch!.commitSha, token);
            if (files) {
              setTree(buildTree(files));
            }
          }}
        >
          Build tree
        </button>
        {tree && <TreeView width={900} height={600} tree={tree} />}
      </div>
    );
  }
}
