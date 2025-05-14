'use client';

import Link from 'next/link';
import {Category} from '@/types/Category';

type CategoryCardProps = {
    category: Category
}

export function CategoryCard(props: CategoryCardProps) {
    const {category} = props;
    return (
        <Link href={`/${category.id}`} className="truncate border-0 min-w-fit bg-white">
            <div className="flex flex-col items-center  w-[100px] md:w-[160px]">
                <div
                    className="flex items-center justify-center rounded-lg p-2 border w-full h-[100px] md:h-[160px] hover:shadow">
                    {/*{*/}
                    {/*    category?.iconUrl */}
                    {/*        ? <Image src={category.iconUrl} alt={category.label}*/}
                    {/*               width={150} objectFit="contain" height={150}*/}
                    {/*               className="hover:scale-110 transition"*/}
                    {/*        />*/}
                    {/*        : <Image src={CategoryDemoIcon} alt={category.label}*/}
                    {/*                 width={150} objectFit="contain" height={150}*/}
                    {/*                 className="hover:scale-110 transition"*/}
                    {/*        />*/}
                    {/*}*/}
                    <img src={category.iconUrl} alt={category.label}
                           width={150}  height={150}
                           className="hover:scale-110 transition object-contain"
                    />

                </div>
                <p className="text-xs md:text-base font-medium truncate w-full text-center leading-6 text-slate-800 mt-2">
                    {category.label}
                </p>
            </div>
        </Link>
    );
}
