import { execSync } from "child_process";

execSync("npm run compile", { stdio: "inherit" });
execSync("vsce publish", { stdio: "inherit" });
