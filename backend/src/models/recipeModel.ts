import { Schema, model } from 'mongoose'
import { IRecipe, IIngredient } from '../types'
import slugify from 'slugify'
// import { NextFunction } from 'express'
import validator from 'validator'

const recipeSchema = new Schema<IRecipe>({
  name: {
    type: String,
    required: [true, 'A recipe must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'Max 40 characters allowed'],
    minlength: [10, 'At least 10 characters required'],
  },
  slug: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  ingredients: [{
    name: String,
    amount: Number,
    unit: {
      type: String,
      enum: ['gram', 'kilo', 'ml', 'l', 'theelepel', 'eetlepel', 'pond'],
    },
  }],
  steps: {
    type: [String],
    required: [true, 'A recipe must have steps'],
  },

}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
// doc middleware, runs before .save() and create()
recipeSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next();
})

const Recipe = model('Recipe', recipeSchema)
export default Recipe