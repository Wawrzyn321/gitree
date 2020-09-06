import React from "react";
import { GitreeContext } from "../../state";
import { FormPanel } from "./FormPanel";

export function UserDataForm() {
  const { state, setUser, setToken, getRepos } = React.useContext(
    GitreeContext
  );
  const { name, token, loading, collapsed, error } = state.userData;
  const { repos } = state.repoData;

  const form = (
    <section>
      <label>
        User
        <input
          type="text"
          value={name}
          onChange={(e) => setUser(e.target.value)}
        />
      </label>
      <label>
        Github token
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </label>
      <button type="button" disabled={!name || !token} onClick={getRepos}>
        Get repos
      </button>
    </section>
  );

  return (
    <FormPanel
      collapsed={collapsed}
      loading={loading}
      error={error}
      isOk={repos && repos.length}
      title="User data"
    >
      {form}
    </FormPanel>
  );
}
