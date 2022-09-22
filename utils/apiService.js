import categoryService from './endpoints/categoryService';
import productService from './endpoints/productService';

let apiService = {
    categories: categoryService,
    products: productService
}

export default apiService;