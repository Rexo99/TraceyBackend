import express from 'express';
import categoryController from "../controllers/CategoryController";
import expenditureController from "../controllers/ExpenditureController"
import userController from "../controllers/UserController";

const router = express.Router();

router.get('/category/:name',categoryController.getCategory)
router.post('/category',categoryController.createCategory)
router.put('/category/:id',categoryController.updateCategory)
router.delete('/category/:id',categoryController.deleteCategory)
router.get('/category',categoryController.getAllCategories)

router.get('/expenditure/:id',expenditureController.getExpenditure)
router.post('/expenditure',expenditureController.createExpenditure)
router.put('/expenditure/:id',expenditureController.updateExpenditure)
router.delete('/expenditure/:id',expenditureController.deleteExpenditure)
router.get('/expenditure',expenditureController.getAllExpenditures)

router.post('/login', userController.login);
router.post('/register', userController.register);
export = router;