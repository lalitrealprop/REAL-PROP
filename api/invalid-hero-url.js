export default function handler(req, res) {
  res.status(404).setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('404 Not Found');
}
