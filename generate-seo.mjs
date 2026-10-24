
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

const config = JSON.parse(
  fs.readFileSync(path.join(root, 'seo-pages.json'), 'utf8')
);

const template = fs.readFileSync(
  path.join(dist, 'index.html'),
  'utf8'
);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function replaceOrInsert(html, pattern, replacement) {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }
  return html.replace('</head>', `  ${replacement}\n</head>`);
}

for (const page of config.pages) {
  const canonical =
    new URL(page.path, config.siteUrl).href;

  let html = template;

  html = replaceOrInsert(
    html,
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(page.title)}</title>`
  );

  html = replaceOrInsert(
    html,
    /<meta\s+name="description"[^>]*>/i,
    `<meta name="description" content="${escapeHtml(page.description)}" />`
  );

  const metadata = [
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:type" content="${escapeHtml(page.type || 'website')}" />`,
    `<meta property="og:site_name" content="${escapeHtml(config.siteName)}" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta name="twitter:card" content="${page.image ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`
  ];

  if (page.image) {
    const imageUrl = new URL(page.image, config.siteUrl).href;

    metadata.push(
      `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`,
      `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`
    );
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: canonical,
    isPartOf: {
      '@type': 'WebSite',
      name: config.siteName,
      url: config.siteUrl
    }
  };

  metadata.push(
    `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>`
  );

  html = html.replace(
    '</head>',
    `  ${metadata.join('\n  ')}\n</head>`
  );

  const outputPath =
    page.path === '/'
      ? path.join(dist, 'index.html')
      : path.join(
          dist,
          page.path.replace(/^\/|\/$/g, ''),
          'index.html'
        );

  fs.mkdirSync(path.dirname(outputPath), {
    recursive: true
  });

  fs.writeFileSync(outputPath, html, 'utf8');

  console.log(`SEO HTML generated: ${page.path}`);
}
