import React from "react";
import { FormPanel } from "./FormPanel";
import { useGitreeContext } from "../../state/useGitreeContext";

export function RepoForm() {
  const { state, setRepo, setRepoFormCollapsed, getBranches } =
    useGitreeContext();
  const { repoNames, repo, loading, collapsed, error } = state.repoData;
  const { branches } = state.branchData;

  return (
    <FormPanel
      collapsed={collapsed}
      setCollapsed={setRepoFormCollapsed}
      loading={loading}
      error={error}
      isOk={(branches ?? []).length > 0}
      title="Repository"
    >
      <section>
        <label>
          Choose repo:
          <select
            disabled={!repoNames}
            value={repo || ".none"}
            onChange={(e) => setRepo(e.target.value)}
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
        <button type="button" disabled={!repo} onClick={getBranches}>
          Get branches
        </button>
      </section>
    </FormPanel>
  );
}
