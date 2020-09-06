import { Branch } from "../types/Branch";
import { GithubRepository, GithubBranch, GithubTreeNode, PossiblyTruncatedFiles } from "./apiTypes";

const apiUrl = 'https://api.github.com';

const makeHeaders = (user: string, token?: string) => {
  if (!token) {
    return {}
  }
  return {
    headers: {
      Authorization: "Basic " + btoa(`${user}:${token}`),
    },
  }
}

const processResponse = async <T>(response: Response, fn: (t: any) => T) => {
  if (response.ok) {
    return fn(await response.json());
  } else {
    const error = JSON.parse(await response.text());
    throw Error(error.message);
  }
}

export const fetchRepos = async (user: string, token?: string): Promise<string[]> => {
  const url = `${apiUrl}/users/${user}/repos`;
  const response = await fetch(url, makeHeaders(user, token));

  return processResponse<string[]>(response, (json: any) => json.map((repo: GithubRepository) => repo.name));
};

export const fetchBranches = async (user: string, token: string | undefined, repo: string): Promise<Branch[]> => {
  const url = `${apiUrl}/repos/${user}/${repo}/branches`
  const response = await fetch(url, makeHeaders(user, token));

  return processResponse<Branch[]>(response, (json: any) => json.map((branch: GithubBranch) => ({ name: branch.name, commitSha: branch.commit.sha })));
};

export const fetchFiles = async (user: string, token: string | undefined, repo: string, sha: string, ): Promise<PossiblyTruncatedFiles> => {
  const url = `${apiUrl}/repos/${user}/${repo}/git/trees/${sha}?recursive=true`;
  const response = await fetch(url, makeHeaders(user, token));

  return processResponse<PossiblyTruncatedFiles>(response, (json: any) => {
    const files = json.tree
      .filter((node: GithubTreeNode) => node.type === 'blob')
      .map((node: GithubTreeNode) => ({ path: node.path, size: node.size }));
    return { files, truncated: json.trucated };
  });
};
