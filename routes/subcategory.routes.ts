import { Router } from 'express';
import subcategoryController from '../controllers/subcategory.controller';

const router = Router();

router.post('/', subcategoryController.createSubcategory);
router.get('/category/:id', subcategoryController.getSubcategories);
router.get('/:id', subcategoryController.getSingleSubcategory);
router.delete('/:id', subcategoryController.deleteSubcategories);

export default router;
