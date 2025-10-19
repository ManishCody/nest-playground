import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    private products = [
        { id: 1, name: 'Laptop', price: 1000 },
        { id: 2, name: 'Phone', price: 500 },
    ];
    
    getAllProducts(){
        return this.products;
    }

    getProductById(id: number){
        return this.products.find(product => product.id === id);
    }
}
