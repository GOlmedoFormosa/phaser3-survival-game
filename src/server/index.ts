import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';

//These methods discover and serve static files to the http client with the Express module
//Set root directory for static files
let staticDir = path.join(__dirname, '../../dist/static/');

export default function createServer() {
  const app: Application = express();
  app.use(express.static(staticDir));
  return app;
};