import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Character, CharacterAttrs } from '../models/characters';
import { validateRequest } from '../middlewares/validate-request';
const router = express.Router();

router.patch(
  '/api/characters/:id',
  [
    body('favourite')
      .isBoolean()
      .withMessage('Please provide a favourite flag'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    /**
     * Here we should validate the character id we are updating exists
     * We have a few options:
     * Trust api consumer (not recomended at all), but used for the sake of the challenge
     * Validate through API (second worst as it means one request to external api for each update)
     * Have an UP-TO-DATE cache system like redis so we can query whether the character exists or not
     *
     * Here we should query our cache system and determine if the character exists, if it doesn't just
     * throw a NotFoundError(`/api/characters/${id}`);
     */
    const { favourite } = req.body;
    const userId: string = req.currentUser?.id as string;
    const body: CharacterAttrs = { characterId: id, userId };

    let response: any = null;
    if (favourite) {
      response = await Character.addToFavorite(body);
    } else {
      await Character.removeFromFavorite(body);
      response = {};
    }
    res.status(200).send(response);
  }
);

export { router as favouriteCharacterRouter };
