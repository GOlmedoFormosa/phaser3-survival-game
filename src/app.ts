
import 'dotenv-safe';
import createServer from './server';

const startServer = () => {
  const app = createServer();
  const port: number = parseInt(<string>process.env.PORT, 10) || 8080;
  app.listen(port, () => console.log(`server running on ${port}`));
}

startServer();