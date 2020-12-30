import mongoose from 'mongoose';


export interface CharacterAttrs {
  characterId: string;
  userId: string;
}

interface CharacterModel extends mongoose.Model<CharacterDoc> {
  addToFavorite(attrs: CharacterAttrs): CharacterDoc;
  removeFromFavorite(attrs: CharacterAttrs): CharacterDoc;
  isFavourite(attrs: CharacterAttrs): boolean;
}

export interface CharacterDoc extends mongoose.Document {
  characterId: string;
  userId: string;
}

const characterSchema = new mongoose.Schema(
  {
    characterId: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'users'
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

characterSchema.statics.isFavourite = async (attrs: CharacterAttrs): Promise<boolean> => {
  const count: number = await Character.findOne(attrs).countDocuments();
  return count > 0;
}

characterSchema.statics.addToFavorite = async (attrs: CharacterAttrs) => {
  const response = await new Character(attrs).save();
  return response;
};

characterSchema.statics.removeFromFavorite = async (attrs: CharacterAttrs) => {
  const response = await Character.deleteOne(attrs);
  return response;
};

const Character = mongoose.model<CharacterDoc, CharacterModel>('Character', characterSchema);

export { Character };
