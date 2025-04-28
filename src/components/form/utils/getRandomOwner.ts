const OWNERS = [
  "kubernetes",
  "apache",
  "rust-lang",
  "dotnet",
  "nodejs",
  "tensorflow",
  "wordpress",
  "facebook",
  "gatsbyjs",
  "angular",
  "kyma-project",
];

export function getRandomOwner(prevOwner: string) {
  let nextOwner;
  do {
    nextOwner = OWNERS[Math.floor(Math.random() * OWNERS.length)];
  } while (prevOwner === nextOwner);
  return nextOwner;
}
