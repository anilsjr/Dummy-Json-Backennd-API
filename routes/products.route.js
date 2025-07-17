import express from 'express';
import { allProducts, searchProductsByTitle, getAllTags, searchProductById, searchProductsyTagName, addProduct, updateProduct, deleteProduct } from '../controller/products.controller.js';

const router = express.Router();


router.get('/', allProducts);
router.get('/search', searchProductsByTitle);
router.get('/tags', getAllTags);
router.get('/tag/:tagName', searchProductsyTagName);
router.get('/:id', searchProductById);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);


export default router;