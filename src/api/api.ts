import { GithubFile, Branch } from "../types/GithubFile";
import { GithubRepository, GithubBranch, GithubTreeNode } from "./ApiTypes";

export const fetchRepos = async (user: string, token: string): Promise<string[] | null> => {
  const url = `https://api.github.com/users/${user}/repos`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Basic " + btoa(`${user}:${token}`),
      },
    });
    const json = await response.json();
    return json.map((repo: GithubRepository) => repo.name);
  } catch (e) {
    console.warn(e);
    return null;
  }
};

export const fetchBranches = async (user: string, token: string, repo: string): Promise<Branch[] | null> => {
  const url = `https://api.github.com/repos/${user}/${repo}/branches`
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Basic " + btoa(`${user}:${token}`),
      },
    });
    const json = await response.json();
    return json.map((b: GithubBranch) => ({ name: b.name, commitSha: b.commit.sha }));
  } catch (e) {
    console.warn(e);
    return null;
  }
};

export const fetchFiles = async (user: string, repo: string, sha: string, token: string): Promise<GithubFile[] | null> => {
  const url = `https://api.github.com/repos/${user}/${repo}/git/trees/${sha}?recursive=true`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Basic " + btoa(`${user}:${token}`),
      },
    });
    const json = await response.json();
    return json.tree
      .filter((t: GithubTreeNode) => t.type === 'blob')
      .map((t: GithubTreeNode) => ({ path: t.path, size: t.size }));
  } catch (e) {
    console.warn(e);
    return null;
  }
};
