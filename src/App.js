import React from "react";
import {
  useLocalStorageState,
  useSessionStorageState,
} from "./domain/useStorage";
import { buildTree } from "./domain/fileTree";
import { fetchFiles } from "./domain/api";
import { draw } from "./domain/draw";

function App() {
  const [user, setUser] = useLocalStorageState("", "user");
  const [token, setToken] = useSessionStorageState("", "token");
  const [repo, setRepo] = useLocalStorageState("", "repo");
  const [files, setFiles] = React.useState(null);
  const canvasRef = React.useRef();
  const selectionRef = React.useRef();

  const canFetchFiles = !!user && !!repo && !!token;

  return (
    <div>
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
          Repo
          <input
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
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
        disabled={!canFetchFiles}
        onClick={async () => {
          const sha = "f1cb5d581d9eac2764515a5ddb837bd838626bb2";
          const files = await fetchFiles(user, repo, sha, token);
          setFiles(files);
        }}
      >
        Fetch files
      </button>
      <button
        disabled={!files}
        onClick={() => {
          const obj = buildTree(files);
          draw(obj, canvasRef.current, selectionRef.current);
        }}
      >
        Build tree
      </button>
      <div style={{ position: "relative" }}>
        <svg
          width="1100"
          height="800"
          style={{ position: "absolute", zIndex: 1000, pointerEvents: "none" }}
        >
          <rect ref={selectionRef} fill="transparent" strokeWidth="5" stroke="white"/>
        </svg>
        <canvas
          ref={canvasRef}
          width="1100"
          height="800"
          style={{ display: "block", border: "1px solid black" }}
        ></canvas>
      </div>
    </div>
  );
}

export default App;
