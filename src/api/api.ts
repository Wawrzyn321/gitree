import { Branch } from "../types/Branch";
import { FileList } from "../types/FileList";
import * as ApiTypes from "./ApiTypes";

const API_URL = "https://api.github.com";

const makeHeaders = (owner: string, token?: string) => {
  if (!token) {
    return {};
  }
  return {
    headers: {
      Authorization: "Basic " + btoa(`${owner}:${token}`),
    },
  };
};

const processResponse = async <TIn, TOut>(
  response: Response,
  fn: (t: TIn) => TOut,
) => {
  if (response.ok) {
    return fn(await response.json());
  } else {
    const error = JSON.parse(await response.text());
    throw Error(error.message);
  }
};

export const fetchRepoNames = async (owner: string, token?: string) => {
  const url = `${API_URL}/users/${owner}/repos?per_page=100`;
  const response = await fetch(url, makeHeaders(owner, token));

  return processResponse<ApiTypes.Repository[], string[]>(response, (data) =>
    data.map((repo) => repo.name),
  );
};

export const fetchBranches = async (
  owner: string,
  token: string | undefined,
  repo: string,
) => {
  const url = `${API_URL}/repos/${owner}/${repo}/branches?per_page=100`;
  const response = await fetch(url, makeHeaders(owner, token));

  return processResponse<ApiTypes.Branch[], Branch[]>(response, (json) =>
    json.map((branch) => ({
      name: branch.name,
      commitSha: branch.commit.sha,
    })),
  );
};

export const fetchFiles = async (
  owner: string,
  token: string | undefined,
  repo: string,
  sha: string,
) => {
  const url = `${API_URL}/repos/${owner}/${repo}/git/trees/${sha}?recursive=true`;
  const response = await fetch(url, makeHeaders(owner, token));

  return processResponse<ApiTypes.Tree, FileList>(response, (data) => {
    const files = data.tree
      .filter((node) => node.type === "blob")
      .map((node) => ({ path: node.path, size: node.size }));

    return { files, truncated: data.truncated };
  });
};
