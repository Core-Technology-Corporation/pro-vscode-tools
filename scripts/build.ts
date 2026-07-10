import { execSync } from "child_process";

execSync("tsc -p ./", { stdio: "inherit" });
