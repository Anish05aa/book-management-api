import { Router } from "express";
import { createBook, deleteBook, getBookById, getBooks, updateBook ,importBooks} from "../controllers/book.controller";
import  upload  from "../middlewares/multer.middleware";

const router=Router();

router.route('/').get(getBooks)
router.route('/').post(createBook)
router.route('/:id').get(getBookById)
router.route('/:id').put(updateBook)
router.route('/:id').delete(deleteBook)
router.post("/import", upload.single("file"), importBooks)


export default router;