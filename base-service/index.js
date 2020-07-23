// const https = require('https');
const http = require('http');
// const fs = require('fs');
const loader = require('./src/loaders/loader');

const setupServer = async () => {
  const app = await loader.load();

  /*
  const httpsCertificate = {
    key: fs.readFileSync('./src/resources/ssl-tls/certificate.key', 'utf-8'),
    cert: fs.readFileSync('./src/resources/ssl-tls/certificate.crt', 'utf-8'),
  };
  const httpsServer = https.createServer(httpsCertificate, app);
  */
  const httpServer = http.createServer(app);
  /*
  httpsServer.listen(process.env.PORT_HTTPS, () => {
    console.log(`${process.env.NODE_ENV} HTTPS server, running on port ${process.env.PORT_HTTPS}`));
  }
  */
  httpServer.listen(process.env.PORT_HTTP, () => console.log(`${process.env.NODE_ENV} HTTP server, running on port ${process.env.PORT_HTTP}`));
};

setupServer();
