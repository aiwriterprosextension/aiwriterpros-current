import { marked } from 'marked';

/**
 * Converts markdown content to clean, SEO-optimized HTML
 * @param markdown - The markdown content to convert
 * @returns HTML string
 */
export async function convertMarkdownToHtml(markdown: string): Promise<string> {
  // Convert markdown to HTML with basic options
  const html = await marked.parse(markdown, {
    gfm: true, // GitHub Flavored Markdown
    breaks: true, // Convert \n to <br>
  });

  // Wrap in semantic HTML structure
  const wrappedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="generator" content="AIWriterPros">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    h1, h2, h3, h4, h5, h6 {
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      font-weight: 600;
      line-height: 1.3;
    }
    h1 { font-size: 2.5em; }
    h2 { font-size: 2em; border-bottom: 2px solid #eee; padding-bottom: 0.3em; }
    h3 { font-size: 1.5em; }
    p { margin-bottom: 1em; }
    ul, ol { margin-bottom: 1em; padding-left: 2em; }
    li { margin-bottom: 0.5em; }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
    th {
      background-color: #f8f9fa;
      font-weight: 600;
    }
    tr:nth-child(even) {
      background-color: #f8f9fa;
    }
    code {
      background-color: #f5f5f5;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: "Courier New", monospace;
    }
    pre {
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
    }
    blockquote {
      border-left: 4px solid #ddd;
      margin-left: 0;
      padding-left: 1em;
      color: #666;
      font-style: italic;
    }
    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 1em 0;
    }
    a {
      color: #1e40af;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    @media (max-width: 768px) {
      body {
        padding: 10px;
      }
      h1 { font-size: 2em; }
      h2 { font-size: 1.5em; }
      h3 { font-size: 1.25em; }
    }
  </style>
</head>
<body>
  <article>
    ${html}
  </article>
</body>
</html>`;

  return wrappedHtml;
}

/**
 * Download HTML content as a file
 * @param html - The HTML content to download
 * @param filename - The filename (without extension)
 */
export function downloadHtml(html: string, filename: string = 'article') {
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
