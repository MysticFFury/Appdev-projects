export interface ProductCategory {
  id?: number;
  name?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description?: string | null;
  image?: string | null;
  category?: ProductCategory | string | null;
}

export interface CartLine {
  productId: number;
  name: string;
  priceNum: number;
  price: string;
  qty: number;
}
