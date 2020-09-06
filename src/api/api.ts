import { GithubFile, Branch } from "../types/GithubFile";
import { GithubRepository, GithubBranch, GithubTreeNode } from "./ApiTypes";

export const fetchRepos = async (user: string, token: string): Promise<string[]> => {
  const url = `https://api.github.com/users/${user}/repos`;
  const response = await fetch(url, {
    headers: {
      Authorization: "Basic " + btoa(`${user}:${token}`),
    },
  });
  if (response.ok) {
    const json = await response.json();
    return json.map((repo: GithubRepository) => repo.name);
  } else {
    const error = JSON.parse(await response.text());
    throw Error(error.message);
  }
};

export const fetchBranches = async (user: string, token: string, repo: string): Promise<Branch[]> => {
  const url = `https://api.github.com/repos/${user}/${repo}/branches`
  const response = await fetch(url, {
    headers: {
      Authorization: "Basic " + btoa(`${user}:${token}`),
    },
  });
  if (response.ok) {
    const json = await response.json();
    return json.map((b: GithubBranch) => ({ name: b.name, commitSha: b.commit.sha }));
  } else {
    const error = JSON.parse(await response.text());
    throw Error(error.message);
  }
};

export const fetchFiles = async (user: string, token: string, repo: string, sha: string, ): Promise<GithubFile[]> => {
  const url = `https://api.github.com/repos/${user}/${repo}/git/trees/${sha}?recursive=true`;
  const response = await fetch(url, {
    headers: {
      Authorization: "Basic " + btoa(`${user}:${token}`),
    },
  });
  if (response.ok) {
    const json = await response.json();
    return json.tree
      .filter((t: GithubTreeNode) => t.type === 'blob')
      .map((t: GithubTreeNode) => ({ path: t.path, size: t.size }));
  } else {
    const error = JSON.parse(await response.text());
    throw Error(error.message);
  }
};
