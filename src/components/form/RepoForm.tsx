import React from "react";
import { FormPanel } from "./FormPanel";
import { useGitreeContext } from "../../state/useGitreeContext";

export function RepoForm() {
  const { state, setRepo, setRepoFormCollapsed, getBranches } =
    useGitreeContext();
  const { repos, repo, loading, collapsed, error } = state.repoData;
  const { branches } = state.branchData;

  const form = (
    <section>
      <label>
        Choose repo:
        <select
          disabled={!repos}
          value={repo || ".none"}
          onChange={(e) => setRepo(e.target.value)}
        >
          <option value=".none" disabled hidden>
            Select repo
          </option>
          {repos &&
            repos.map((r: string) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
        </select>
      </label>
      <button type="button" disabled={!repo} onClick={getBranches}>
        Get branches
      </button>
    </section>
  );

  return (
    <FormPanel
      collapsed={collapsed}
      setCollapsed={setRepoFormCollapsed}
      loading={loading}
      error={error}
      isOk={(branches?.length ?? 0) > 0}
      title="Repository"
    >
      {form}
    </FormPanel>
  );
}
