import React from "react";
import { GitreeContext } from "../../state";
import { FormPanel } from "./FormPanel";

export function OwnerDataForm() {
  const { state, setOwner, setOwnerFormCollapsed, setToken, getRepos } = React.useContext(
    GitreeContext
  );
  const { name, token, loading, collapsed, error } = state.ownerData;
  const { repos } = state.repoData;

  const form = (
    <section>
      <label>
        User/organisation
        <input
          required
          type="text"
          value={name}
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
      <button type="button" disabled={!name} onClick={getRepos}>
        Get repos
      </button>
    </section>
  );

  return (
    <FormPanel
      collapsed={collapsed}
      setCollapsed={setOwnerFormCollapsed}
      loading={loading}
      error={error}
      isOk={repos && repos.length}
      title="Owner data"
    >
      {form}
    </FormPanel>
  );
}
