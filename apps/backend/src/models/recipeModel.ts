import { Schema, model } from 'mongoose';
import { IRecipe, IRecipeModel } from '@types'
import { IStep } from '@types';

const recipeSchema = new Schema<IRecipe, IRecipeModel>({
  category: {
    id: {
      type: Number,
      required: [true, 'Category required']
    },
    value: {
      type: String,
      required: [true, 'Category required']
    },
    label: {
      type: String,
      required: [true, 'Category required']
    }
  },
  description: {
    type: String,
    required: [true, 'Description required']
  },
  glutefree: {
    type: Boolean,
    default: false
  },
  images: {
    type: [String]
  },
  ingredients: {
    type: [{
      name: {
        type: String,
        required: [true, 'Ingredient name required']
      },
      amount: {
        type: Number,
        required: [true, 'Ingredient amount required']
      },
      unit: {
        type: String,
        required: [true, 'Ingredient unit required']
      }
    }],
    required: [true, 'Ingredients required']
  },
  lactofree: {
    type: Boolean,
    default: false
  },
  requirements: {
    type: [{
      name: {
        type: String,
        required: [true, 'Requirement name required']
      },
      amount: {
        type: Number,
        required: [true, 'Requirement amount required']
      }
    }],
    required: [true, 'Requirements required']
  },
  servings: {
    type: Number,
    required: [true, 'Servings required']
  },
  steps: {
    type: [{ description: String }],
    required: [true, 'Steps required']
  },
  time: {
    type: Number,
    required: [true, 'Time required']
  },
  title: {
    type: String,
    required: [true, 'Title required']
  },
  vegan: {
    type: Boolean,
    default: false
  },
  vegetarian: {
    type: Boolean,
    default: false
  },
});

export default model('Recipe', recipeSchema);