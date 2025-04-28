import React from "react";
import { FormPanel } from "./FormPanel";
import { useActions, useGitreeState } from "../../state/hooks";

export function RepoForm() {
  const { repoData, branchData } = useGitreeState();
  const { setRepoName, setRepoFormCollapsed, getBranches } =
    useActions("repository");

  const { repoNames, repoName, loading, collapsed, error } = repoData;

  return (
    <FormPanel
      collapsed={collapsed}
      setCollapsed={setRepoFormCollapsed}
      loading={loading}
      error={error}
      isOk={(branchData.branches ?? []).length > 0}
      title="Repository"
    >
      <section>
        <label>
          Choose repo:
          <select
            disabled={!repoNames}
            value={repoName || ".none"}
            onChange={(e) => setRepoName(e.target.value)}
          >
            <option value=".none" disabled hidden>
              Select repo
            </option>
            {(repoNames ?? []).map((repoName: string) => (
              <option key={repoName} value={repoName}>
                {repoName}
              </option>
            ))}
          </select>
        </label>
        <button type="button" disabled={!repoName} onClick={getBranches}>
          Get branches
        </button>
      </section>
    </FormPanel>
  );
}
