import React from "react";
import { fetchBranches } from "../domain/api";
import { Branch } from "../types/GithubFile";
import { ChooseBranch } from "./ChooseBranch";

interface ChooseRepoProps {
    user: string;
    token: string;
    repos: string[];
}

export function ChooseRepo(props: ChooseRepoProps) {
  const { user, token, repos } = props;

  const [repo, setRepo] = React.useState("");
  const [branches, setBranches] = React.useState<Branch[] | null>(null);

  if (!repos.length) {
    return <p>No repos found.</p>;
  } else {
    return (
      <div>
        <label>
          Choose repo:
          <select
            value={repo || ".none"}
            onChange={(e) => {
              setRepo(e.target.value);
              if (e.target.value !== repo) {
                setBranches(null);
              }
            }}
          >
            <option value=".none" disabled hidden>
              Select repo
            </option>
            {repos.map((r: string) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
        <button
          disabled={!repo}
          onClick={async () =>
            setBranches(await fetchBranches(user, token, repo))
          }
        >
          Get branches
        </button>
        {branches && (
          <ChooseBranch
            user={user}
            repo={repo}
            token={token}
            branches={branches}
          />
        )}
      </div>
    );
  }
}
