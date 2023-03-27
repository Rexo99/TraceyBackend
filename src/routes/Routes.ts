import express from 'express';
import categoryController from "../controllers/CategoryController";
import expenditureController from "../controllers/ExpenditureController"
import userController from "../controllers/UserController";
import {auth} from "../middleware/auth";

const router = express.Router();

router.get('/users/:userid/categories/:id',auth,categoryController.getCategory)
router.post('/users/:userid/categories',auth,categoryController.createCategory)
router.put('/users/:userid/categories/:id',auth,categoryController.updateCategory)
router.delete('/users/:userid/categories/:id',auth,categoryController.deleteCategory)
router.get('/users/:userid/categories',auth,categoryController.getAllCategoriesByUser)
router.get('/users/:userid/categories/:id/expenditures',auth,categoryController.getAllExpendituresByCategory)

router.post('/users/:userid/expenditures',auth,expenditureController.createExpenditure)
router.get('/users/:userid/expenditures',auth,expenditureController.getAllExpendituresByUser)
router.get('/users/:userid/expenditures/:id',auth,expenditureController.getExpenditure)
router.put('/users/:userid/expenditures/:id',auth,expenditureController.updateExpenditure)
router.delete('/users/:userid/expenditures/:id',auth,expenditureController.deleteExpenditure)

router.post('/login', userController.login)
router.post('/register', userController.register)
export = router;