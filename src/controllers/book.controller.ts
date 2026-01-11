import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/AsyncHandler";
import { Book } from "../models/book.model";
import { ApiResponse } from "../utils/ApiResponse";

const createBook = asyncHandler(async (req, res) => {
    const { title, author, publishedYear } = req.body;

    if (!title || !author || !publishedYear) {
        throw new ApiError(400, "all fields are required");
    }

    const book = await Book.create({ title, author, publishedYear });

    return res.status(201).json(
        new ApiResponse(201, book, "book created successfully")
    )
})

const getBooks = asyncHandler(async (req, res) => {
    const books = await Book.find()

    return res.status(201).json(
        new ApiResponse(201, books)
    )
})

const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)

    if (!book) {
        throw new ApiError(404, "book not found");
    }

    return res.status(201).json(
        new ApiResponse(201, book)
    )
})

const updateBook = asyncHandler(async (req, res) => {
    const { title, author, publishedYear } = req.body;
    if (!title || !author || !publishedYear) {
        throw new ApiError(400, "all fields are required");
    }

    const book = await Book.findByIdAndUpdate(
        req.params._id,
        {
            $set: {
                title,
                author,
                publishedYear
            }
        },
        { new: true }
    )

    return res.status(201).json(
        new ApiResponse(201, book, "book updated successfully")
    )

})


const deleteBook = asyncHandler(async (req: Request, res: Response) => {
    const deleted = await Book.findByIdAndDelete(req.params.id)

    if (!deleted) {
        throw new ApiError(404, "Book not found")
    }

    res.status(200).json(new ApiResponse(200, null, "Book deleted"))
})

const importBooks = asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
        throw new ApiError(400, "CSV file is required")
    }


    const fileContent = req.file.buffer.toString()


    const lines = fileContent.split("\n").map(line => line.trim())

    const nonEmptyLines = lines.filter(line => line.length > 0)

    const header = nonEmptyLines[0].split(",")

    if (
        header[0] !== "title" ||
        header[1] !== "author" ||
        header[2] !== "publishedYear"
    ) {
        throw new ApiError(400, "Invalid CSV header format")
    }

    const errors: { row: number; reason: string }[] = []
    const validBooks: { title: string; author: string; publishedYear: number }[] = []

    for (let i = 1; i < nonEmptyLines.length; i++) {
        const row = nonEmptyLines[i].split(",")

        const title = row[0]?.trim()
        const author = row[1]?.trim()
        const yearStr = row[2]?.trim()

        if (!title) {
            errors.push({ row: i + 1, reason: "Title is missing" })
            continue
        }

        if (!author) {
            errors.push({ row: i + 1, reason: "Author is missing" })
            continue
        }

        const publishedYear = Number(yearStr)
        if (!yearStr || isNaN(publishedYear)) {
            errors.push({ row: i + 1, reason: "Published year must be a number" })
            continue
        }

        validBooks.push({ title, author, publishedYear })
    }

    let Count = 0
    if (validBooks.length > 0) {
        const inserted = await Book.insertMany(validBooks)
        Count = inserted.length
    }

    res.status(200).json(
        new ApiResponse(200, {
            added: Count,
            errors
        }, "Import completed")
    )
})


export { createBook, getBooks, getBookById, updateBook, deleteBook, importBooks };
