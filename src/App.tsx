import React from "react";
import {
  useLocalStorageState,
  useSessionStorageState,
} from "./domain/useStorageState";
import {  fetchRepos } from "./api/api";
import { ChooseRepo } from "./components/ChooseRepo";

function App() {
  const [user, setUser] = useLocalStorageState("", "user");
  const [token, setToken] = useSessionStorageState("", "token");
  const [repos, setRepos] = React.useState<string[] | null>(null);

  const canFetchRepos = !!user && !!token;

  return (
    <main style={{margin: "0 auto"}}>
      <form>
        <label>
          User
          <input
            type="text"
            value={user}
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
      </form>
      <button
        disabled={!canFetchRepos}
        onClick={async () => setRepos(await fetchRepos(user, token))}
      >
        Get repos
      </button>
      {repos && <ChooseRepo user={user} token={token} repos={repos} />}
    </main>
  );
}

export default App;
