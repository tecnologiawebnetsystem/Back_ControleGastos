const { execSync } = require("child_process")

console.log("Installing winston package...")
try {
  execSync("npm install winston", { stdio: "inherit" })
  console.log("Winston package installed successfully!")
} catch (error) {
  console.error("Failed to install winston:", error.message)
}

