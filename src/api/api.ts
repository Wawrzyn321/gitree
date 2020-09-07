import { Branch } from "../types/Branch";
import { GitHubRepository, GitHubBranch, GitHubTreeNode, PossiblyTruncatedFiles } from "./apiTypes";

const apiUrl = 'https://api.github.com';

const makeHeaders = (owner: string, token?: string) => {
  if (!token) {
    return {}
  }
  return {
    headers: {
      Authorization: "Basic " + btoa(`${owner}:${token}`),
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

export const fetchRepos = async (owner: string, token?: string): Promise<string[]> => {
  const url = `${apiUrl}/users/${owner}/repos`;
  const response = await fetch(url, makeHeaders(owner, token));

  return processResponse<string[]>(response, (json: any) => json.map((repo: GitHubRepository) => repo.name));
};

export const fetchBranches = async (owner: string, token: string | undefined, repo: string): Promise<Branch[]> => {
  const url = `${apiUrl}/repos/${owner}/${repo}/branches`
  const response = await fetch(url, makeHeaders(owner, token));

  return processResponse<Branch[]>(response, (json: any) => json.map((branch: GitHubBranch) => ({ name: branch.name, commitSha: branch.commit.sha })));
};

export const fetchFiles = async (owner: string, token: string | undefined, repo: string, sha: string, ): Promise<PossiblyTruncatedFiles> => {
  const url = `${apiUrl}/repos/${owner}/${repo}/git/trees/${sha}?recursive=true`;
  const response = await fetch(url, makeHeaders(owner, token));

  return processResponse<PossiblyTruncatedFiles>(response, (json: any) => {
    const files = json.tree
      .filter((node: GitHubTreeNode) => node.type === 'blob')
      .map((node: GitHubTreeNode) => ({ path: node.path, size: node.size }));
    return { files, truncated: json.truncated };
  });
};
