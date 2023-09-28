
export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  taxes?: number;
}


export interface UpdateProductDTO extends Omit<Product, 'id'> {

}



