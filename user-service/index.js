const loader = require('./src/loaders/loader');

const setupServer = async () => {
  const app = await loader.load();

  app.listen(5000, () => console.log(' server, running on port '));
};

setupServer();
