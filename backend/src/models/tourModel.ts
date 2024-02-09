import { Schema, model } from 'mongoose'
import { ITour } from '../types'
import slugify from 'slugify'
// import { NextFunction } from 'express'
import validator from 'validator'

const tourSchema = new Schema<ITour>({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim: true,
        maxlength: [40, 'Max 40 characters allowed'],
        minlength: [10, 'At least 10 characters required'],
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty'],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty is easy, medium or difficult'
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Min value is 1'],
        max: [5, 'Maxvalue is 5']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have have price']
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (this: ITour, val: any,) {
                return val < this.price;
            },
            message: 'Must be lower than price'
        }
    },
    summary: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description']
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date],
    slug: String,
    queryStart: {
        type: Date
    },
    secretTour: {
        type: Boolean,
        default: false
    },

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
})

// doc middleware, runs before .save() and create()
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next();
})

// tourSchema.pre('save', function (next) {
//     console.log("About to save doc to db")
//     next();
// })


// tourSchema.post('save', function (doc, next) {
//     console.log('Finished')
//     next();
// })

// Query middleware
tourSchema.pre<ITour>(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } })
    this.queryStart = Date.now();
    next();
})

tourSchema.post<ITour>(/^find/, function (docs, next) {
    console.log(`Query took ${Date.now() - this.queryStart} miliseconds`)
    // console.log(docs)
    next();
})

// Aggregation middleware
// skipping due to outdated course
// tourSchema.pre('aggregate', function (next) {
//     console.log(this)
//     next();
// })
const Tour = model('Tour', tourSchema)
export default Tour