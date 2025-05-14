import {Brand} from '@/types/Brand';
import {Category} from '@/types/Category';
import {Country} from '@/types/Country';
import {Pagination} from '@/types/Pagination';

export type ProductType = {
    category: Category
    country: Country;
    coupons: string[];
    description: string;
    discount: number;
    expires: string;
    howToUse: string;
    imageUrl: string;
    ingredients: string;
    price: number;
    productId: string;
    productName: string;
    stock: number;
    brand: Brand;
    strength: string;
    composition: string;
    similarProducts: string
}

export type ProductInput = {
    productName: string;
    price: number;
    imageUrl: string;
    categoryId: string;
    discount: number;
    brandId: string;
    expires: string;
    countryId: string;
    description: string;
    howToUse: string;
    ingredients: string;
    stock: number;
    coupons: string[];
    composition: string;
    similarProducts: string
}

export interface PaginatedProduct extends Pagination {
    content: ProductType[];
}