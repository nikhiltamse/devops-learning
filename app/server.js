const http = require('http');
const redis = require('redis');

const client = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:6379`
});

client.connect().catch(console.error);

const server = http.createServer(async (req, res) => {
  if (req.url === '/health') {
    res.writeHead(200);
    res.end('OK');
    return;
  }

  if (req.url === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }

  const visits = await client.incr('visits');

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html>
      <head><title>DevOps Learning</title></head>
      <body style="font-family: sans-serif; padding: 40px;">
        <h1>DevOps Learning Project</h1>
        <p>Environment: <strong>${process.env.NODE_ENV || 'development'}</strong></p>
        <p>Total visits: <strong>${visits}</strong></p>
        <p>Redis host: <strong>${process.env.REDIS_HOST || 'localhost'}</strong></p>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
