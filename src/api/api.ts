import * as ApiTypes from "./ApiTypes";

type FetchArgs = {
  owner: string;
  token?: string;
  url: string;
};

async function doFetch<T>({ owner, token, url }: FetchArgs) {
  const API_URL = "https://api.github.com";

  function makeHeaders(owner: string, token?: string) {
    if (!token) {
      return {};
    }
    return {
      headers: {
        Authorization: "Basic " + btoa(`${owner}:${token}`),
      },
    };
  }

  const response = await fetch(API_URL + url, makeHeaders(owner, token));
  if (response.ok) {
    return response.json() as T;
  } else {
    const error = JSON.parse(await response.text());
    throw Error(error.message);
  }
}

export const fetchRepoNames = async (
  owner: string,
  token: string | undefined,
) => {
  const url = `/users/${owner}/repos?per_page=100`;
  const repositories = await doFetch<ApiTypes.Repository[]>({
    owner,
    token,
    url,
  });

  return repositories.map((repo) => repo.name);
};

export const fetchBranches = async (
  owner: string,
  token: string | undefined,
  repoName: string,
) => {
  const url = `/repos/${owner}/${repoName}/branches?per_page=100`;
  const branches = await doFetch<ApiTypes.Branch[]>({ url, owner, token });

  return branches.map((branch) => ({
    name: branch.name,
    commitSha: branch.commit.sha,
  }));
};

export const fetchFiles = async (
  owner: string,
  token: string | undefined,
  repoName: string,
  sha: string,
) => {
  const url = `/repos/${owner}/${repoName}/git/trees/${sha}?recursive=true`;
  const response = await doFetch<ApiTypes.Tree>({ url, owner, token });
  const files = response.tree
    .filter((node) => node.type === "blob")
    .map((node) => ({ path: node.path, size: node.size }));

  return { files, truncated: response.truncated };
};
