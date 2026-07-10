import { execSync } from "child_process";

execSync("npm run compile", { stdio: "inherit" });
execSync("vsce package", { stdio: "inherit" });
