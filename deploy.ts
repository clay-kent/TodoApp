import { execSync } from "child_process";

let repoName: string = "";
let repoUrl: string = "";

try {
  repoUrl = execSync("git config --get remote.origin.url").toString().trim();
  repoName = (repoUrl.split("/").pop() || "").replace(".git", "");
  console.log(`Repository name: ${repoName}`);
} catch (error) {
  throw new Error(`Error fetching repository name: ${error.message}`);
}

if (!repoUrl.includes("github.com")) {
  console.warn("This is not a GitHub repository. 'gh-pages' may not work.");
} else if (/[A-Z]/.test(repoName)) {
  throw new Error(
    "Repository name contains uppercase letters, which may cause issues with 'gh-pages'. \nRefer to https://github.com/gitname/react-gh-pages/issues/39 for more details."
  );
}

try {
  console.log("Deploying to gh-pages...");
  execSync("gh-pages -d dist", { stdio: "inherit" });
} catch (error) {
  throw new Error(`Error deploying to gh-pages: ${error.message}`);
}
