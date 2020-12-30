import express, { Express, Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import helmet from 'helmet';
import cookieSession from 'cookie-session';
import { errorHandler } from './middlewares/error-handler';
import { currentUser } from './middlewares/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { charactersRouter } from './routes/characters';
import { characterDetailRouter } from './routes/character-detail';
import { favouriteCharacterRouter } from './routes/update-favourite';
import { NotFoundError } from './errors/not-found-error';


const allowedOrigins = [ 'http://localhost:3002', 'http://localhost' ];

const setCorsHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Powered-By', 'HAUFE API');
  const origin: string = req.headers.origin!;
  if(allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  next();
}


const app: Express = express();
app.use(json());
app.use(helmet());
app.use(setCorsHeaders);
app.use(
  cookieSession({
    signed: false,
    secure: false,
    path: '/'
  })
);

app.use(currentUser);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(charactersRouter);
app.use(characterDetailRouter);
app.use(favouriteCharacterRouter);

app.all('*', (req: Request, res: Response) => {
  res.status(404).send(new NotFoundError(req.url).serializeErrors());
});

app.use(errorHandler);

export { app };
