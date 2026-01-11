import mongoose, { Document } from "mongoose"

export interface BookDocument extends Document {
  title: string
  author: string
  publishedYear: number
}

const bookSchema = new mongoose.Schema<BookDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    publishedYear: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

export const Book = mongoose.model<BookDocument>("Book", bookSchema)
