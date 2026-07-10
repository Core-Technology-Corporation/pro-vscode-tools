(function () {
  const vscode = acquireVsCodeApi();
  window.addEventListener("message", (event) => {
    console.log("Pro Tools webview received message:", event.data);
  });
})();
