'use client';

import Link from 'next/link';
import {Fragment} from 'react';
import {Badge} from '@/components/ui/badge';
import {MedicineUtils} from '@/utils/MedicineUtils';
import {ProductType} from '@/types/ProductType';
import MedicineDemo from './medicine-demo.png';
import Image from 'next/image';

type ProductCardProps = {
    product: ProductType
}

export function ProductCard(props: ProductCardProps) {

    const {product} = props;

    return (
        <Link href={`/${product.category.id}/${product.productId}`} className="border-0 min-w-fit">
            <div className="flex flex-col  w-[120px] md:w-[200px] gap-2">
                <div
                    className="flex items-center justify-center rounded-lg p-2 border w-full h-[120px] md:h-[200px] hover:shadow">
                    {
                        product.imageUrl
                            ? <img src={product.imageUrl} alt={product.productName}
                                   width={160}
                                   className="hover:scale-110 transition w-[100px] md:w-[160px] h-[100px] md:h-[160px] object-fill"
                            />
                            : <Image src={MedicineDemo} alt={'medicine demo image'}/>
                    }
                </div>
                <div>
                    <span
                        className="text-xs md:text-base font-medium line-clamp-2 leading-6 text-wrap truncate text-slate-800">
                          {product.productName}
                     </span>
                    <span className="text-slate-500 font-normal text-xs md:text-sm">
                    MRP:
                        <span className={`${product?.discount ? 'line-through' : ''}`}>৳{product.price}</span>
                        {
                            product?.discount ?
                                <Fragment>
                                    <Badge variant="secondary" className="text-red-500">
                                        {MedicineUtils.calculateDiscountPercentage(product.price, product.discount)}%
                                        OFF
                                    </Badge>
                                    <br/>
                                    <span
                                        className="font-bold text-slate-900">৳{(product.price - product.discount).toFixed(2)}</span>
                                </Fragment>
                                : null
                        }
                    </span>
                </div>
            </div>
        </Link>
    );
}
