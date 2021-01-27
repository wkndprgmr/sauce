const htmlEntities = require("html-entities");

module.exports = function ({ src, lang }) {
  const code = Buffer.from(src, "base64").toString();
  const codeHtmlized = htmlEntities.encode(code);

  return `<!doctype html>
<html lang="en">
<head>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.1.2/build/styles/default.min.css">
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.1.2/build/highlight.min.js"></script>

<style>
html {
  font-size: 16px;
}

pre {
  display: flex;

  margin: 0;
  padding: 0;

  font-family: inherit;
}

code {
  font-size: 1rem;
  font-family: inherit;
}

.window-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.window {
  box-shadow: 0 1rem 2rem 1rem rgba(0, 0, 0, 0.1),
    0 0.25rem 1rem 1rem rgba(0, 0, 0, 0.05);
  border-radius: 0.3rem;

  padding: 0.5rem;
}

.window__controls {
  height: 0.75rem;
  margin: 0.5rem;
}

.window__controls--mac {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDYiIGhlaWdodD0iMjYiPgogIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEyIiBmaWxsPSIjRkM1QjU3Ij48L2NpcmNsZT4KICA8Y2lyY2xlIGN4PSI1MiIgY3k9IjEyIiByPSIxMiIgZmlsbD0iI0U1QkYzQyI+PC9jaXJjbGU+CiAgPGNpcmNsZSBjeD0iOTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiM1N0MwMzgiPjwvY2lyY2xlPgo8L3N2Zz4K");
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
<body style="background-color: #aaaaaa; font-family: monospace;">

<div class="window-center">
  <div class="window">
    <div class="window__controls window__controls--mac"></div>
    <pre><code class="language-${lang}">${codeHtmlized}</code></pre>
  </div>
</div>

<script>
hljs.initHighlightingOnLoad();

window.addEventListener("load", () => {
  const preferredHeight = (2 * window.innerHeight) / 2.5;
  const preferredWidth = (2 * window.innerWidth) / 2.5;

  const pre = document.querySelector("pre");
  const root = document.querySelector("html");

  pre.closest(".window").style.backgroundColor = window.getComputedStyle(
    pre.querySelector("code")
  ).backgroundColor;

  let fontSize = parseInt(window.getComputedStyle(root).fontSize);
  while (true) {
    fontSize += 1;
    root.style.fontSize = fontSize + "px";
    if (
      pre.clientHeight > preferredHeight ||
      pre.clientWidth > preferredWidth
    ) {
      fontSize -= 1;
      root.style.fontSize = fontSize + "px";
      break;
    }
  }
});
</script>
</body>
</html>`;
};
