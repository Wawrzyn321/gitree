import React from "react";
import { FormPanel } from "./FormPanel";
import { RandomOwnerButton } from "./RandomOwnerButton";
import { useGitreeContext } from "../../state/useGitreeContext";

export function OwnerDataForm() {
  const { state, setOwner, setOwnerFormCollapsed, setToken, getRepos } =
    useGitreeContext();
  const { owner, token, loading, collapsed, error } = state.ownerData;
  const { repoNames } = state.repoData;

  return (
    <FormPanel
      collapsed={collapsed}
      setCollapsed={setOwnerFormCollapsed}
      loading={loading}
      error={error}
      isOk={(repoNames ?? []).length > 0}
      title="Owner data"
    >
      <section>
        <label>
          User/organisation <RandomOwnerButton />
          <input
            required
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </label>
        <label>
          GitHub token (optional)
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </label>
        <button type="button" disabled={!owner} onClick={getRepos}>
          Get repos
        </button>
      </section>
    </FormPanel>
  );
}
