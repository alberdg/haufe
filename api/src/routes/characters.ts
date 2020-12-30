import express, { Request, Response } from 'express';
import { query } from 'express-validator';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { fetchCharacters } from '../services/rick-and-morty-api';
import { CharacterListResponse } from '../interfaces/icharacter-list-response';
import { NotFoundError} from '../errors/not-found-error';
const INVALID_PAGE_ERROR: string = 'Page must be a positive number greater than zero';
const router = express.Router();

router.get(
  '/api/characters',
  currentUser,
  requireAuth,
  [
    query('page')
      .isNumeric()
      .custom(value => {
        if (value < 1) {
          throw new Error(INVALID_PAGE_ERROR)
        }
      })
      .withMessage(INVALID_PAGE_ERROR)
  ],
  async (req: Request, res: Response) => {
    const page: any = req.query.page;
    const url: string = `/api/characters?page=${page}`;
    try {
      const data: CharacterListResponse = await fetchCharacters(page);
      if (data) {
        return res.status(200).send(data);
      }
      throw new NotFoundError(url);
    } catch (err) {
      // TODO: Implement proper logging system
      throw new NotFoundError(url);
    }
  }
);

export { router as charactersRouter };
