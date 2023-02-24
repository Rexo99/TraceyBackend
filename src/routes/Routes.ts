import express from 'express';
import categoryController from "../controllers/CategoryController";
import expenditureController from "../controllers/ExpenditureController"
import userController from "../controllers/UserController";
import {auth} from "../middleware/auth";

const router = express.Router();

router.get('/category/:name',auth,categoryController.getCategory)
router.post('/category',auth,categoryController.createCategory)
router.put('/category/:id',auth,categoryController.updateCategory)
router.delete('/category/:id',auth,categoryController.deleteCategory)
router.get('/category',auth,categoryController.getAllCategories)

router.get('/expenditure/:id',auth,expenditureController.getExpenditure)
router.post('/expenditure',auth,expenditureController.createExpenditure)
router.put('/expenditure/:id',auth,expenditureController.updateExpenditure)
router.delete('/expenditure/:id',auth,expenditureController.deleteExpenditure)
router.get('/expenditure',auth,expenditureController.getAllExpenditures)

router.post('/login', userController.login);
router.post('/register', userController.register);
export = router;