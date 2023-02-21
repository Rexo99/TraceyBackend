import express from 'express';
import categoryController from "../controllers/CategoryController";

const router = express.Router();

router.get('/category/:name',categoryController.getCategory)
router.post('/category',categoryController.createCategory)
router.put('/category/:id',categoryController.updateCategory)
router.delete('/category/:id',categoryController.deleteCategory)


export = router;