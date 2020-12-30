import express, { Request, Response } from 'express';
import { query } from 'express-validator';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { fetchCharacterDetail } from '../services/rick-and-morty-api';
import { Character, CharacterAttrs } from '../models/characters';
import { NotFoundError} from '../errors/not-found-error';
const INVALID_ID_ERROR: string = 'Id must be a positive number greater than zero';
const router = express.Router();

router.get(
  '/api/characters/:id',
  currentUser,
  requireAuth,
  [
    query('id')
      .isNumeric()
      .custom(value => {
        if (value < 1) {
          throw new Error(INVALID_ID_ERROR)
        }
      })
      .withMessage(INVALID_ID_ERROR)
  ],
  async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const url: string = `/api/characters/${id}`;
    try {
      let data: any = await fetchCharacterDetail(id);
      if (data) {
        const userId: string = req.currentUser?.id as string;
        const body: CharacterAttrs = { characterId: id, userId };
        const favourite: boolean = await Character.isFavourite(body);
        data = { character: data, favourite };
        return res.status(200).send(data);
      }
      throw  new NotFoundError(url);
    } catch (err) {
      // TODO: Implement proper logging system
      throw new NotFoundError(url);
    }
  }
);

export { router as characterDetailRouter };
