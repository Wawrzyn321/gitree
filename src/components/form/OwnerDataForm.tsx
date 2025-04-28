import React from "react";
import { FormPanel } from "./FormPanel";
import { RandomOwnerButton } from "./RandomOwnerButton";
import { useActions, useGitreeState } from "../../state/hooks";

export function OwnerDataForm() {
  const { ownerData, repoData } = useGitreeState();
  const { setOwner, setOwnerFormCollapsed, setToken, getRepos } =
    useActions("owner");
  const { owner, token, loading, collapsed, error } = ownerData;
  const { repoNames } = repoData;

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
