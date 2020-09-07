import React from "react";
import { GitreeContext } from "../../state";
import { FormPanel } from "./FormPanel";

export function RepoForm() {
  const {
    state,
    setRepo,
    setRepoFormCollapsed,
    getBranches,
  } = React.useContext(GitreeContext);
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
      isOk={branches && branches.length}
      title="Repository"
    >
      {form}
    </FormPanel>
  );
}
