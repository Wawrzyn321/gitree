export const fetchFiles = async (user, repo, sha, token) => {
  const url = `https://api.github.com/repos/${user}/${repo}/git/trees/${sha}?recursive=true`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Basic " + btoa(`${user}:${token}`),
      },
    });
    const json = await response.json();
    return json.tree;
  } catch (e) {
    console.warn(e);
    return null;
  }
};
