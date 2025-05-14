'use client';

import {useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/navigation';
import useSWR from 'swr';
import {Search, X} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Skeleton} from '@/components/ui/skeleton';
import {ScrollArea} from '@/components/ui/scroll-area';
import {SearchResultCard} from '@/components/Searchbar/SearchResultCard';
import {ReactFastMarquee} from '@/components/common/ReactFastMarquee';
import api from '@/lib/apiInstance';
import useProductStore from '@/stores/productStore';
import {ProductType} from '@/types/ProductType';
import {Announcement} from '@/types/Announcement';
import './searchbar.css';

const fetcher = (url: string) => api.get(url).then((res) => res.data);
const DEFAULT_ANNOUNCEMENT_ID = 1;

export const Searchbar = () => {
    const searchInputRef = useRef<HTMLDivElement>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchProducts, setSearchProducts] = useState<ProductType[]>([]);
    const {products, isProductsLoading} = useProductStore();
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchDisabled, setSearchDisabled] = useState(true);
    const router = useRouter();

    const {
        data: announcement,
        isLoading: announcementIsLoading,
    } = useSWR<Announcement>(`/announcement/${DEFAULT_ANNOUNCEMENT_ID}`, fetcher, {revalidateOnFocus: false});

    const gotoSearchPage = () => {
        if (searchQuery === '') return;
        router.push(`/search?name=${searchQuery}`);
    };

    const filterSearch = (query: string) => {
        if (query && products) {
            const filteredProducts = products.filter((product) => product.productName.toLowerCase().includes(query.toLowerCase()));
            setSearchProducts(filteredProducts);
        }
    };

    useEffect(() => {
        setSearchDisabled(searchQuery === '');
    }, [searchQuery]);

    useEffect(() => {
        if (products) {
            setSearchProducts(products);
        }
    }, [products, setSearchProducts]);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (showDropdown && searchInputRef.current && !searchInputRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <div>
            <div
                className="absolute inset-0 -z-10 h-[22rem] md:h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
                <div
                    className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-teal-400 opacity-20 blur-[100px]"></div>
            </div>
            <section
                className="container flex flex-col justify-center items-center py-[3rem] md:py-[6rem]"
            >
                <div className="flex flex-col items-center">
                    <h2 className="p-2 text-2xl text-center md:text-6xl font-medium bg-clip-text text-transparent bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-500 via-teal-500 to-green-500">
                        What are you looking for ?
                    </h2>
                    <p className="text-xs text-center md:text-lg mt-0 md:mt-2 text-gray-500">এক জায়গায় ঔষধ এবং
                        স্বাস্থ্যসেবা পণ্য অর্ডার করতে সার্চ করুন </p>
                    {
                        announcementIsLoading && <Skeleton className="h-8 w-full"/>
                    }
                    {
                        !announcementIsLoading && announcement && announcement.enabled &&
                        <ReactFastMarquee
                            announcement={announcement.description}
                        />

                    }
                </div>
                <div ref={searchInputRef}
                     className="border border-teal-500 rounded-2xl py-2 my-2 md:my-4 w-full max-w-lg bg-white"
                >
                    <div className="flex w-full justify-between items-center space-x-2 px-2">
                        <div className="flex items-center w-full">
                            <Search className="ml-4" size={20} color="gray"/>
                            <Input
                                type="email"
                                value={searchQuery}
                                className="py-2 md:py-4 border-0 outline-none shadow-none focus:ring-0 w-full focus:outline-none focus-visible:ring-0"
                                placeholder="Search for medicines/heathcare products"
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    filterSearch(e.target.value);
                                }}
                                onFocus={() => setShowDropdown(true)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        gotoSearchPage();
                                    }
                                }}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            {
                                !searchDisabled &&
                                <Button className="border-0 p-1 outline-none shadow-none"
                                        variant="outline"
                                        onClick={() => {
                                            setSearchQuery('');
                                            setShowDropdown(false);
                                        }}
                                >
                                    <X size={25} className="border p-1 rounded-full"/>
                                </Button>
                            }

                            <Button variant={'secondary'}
                                    className={`${searchDisabled ? '' : 'hero-cta-button text-white'} `}
                                    disabled={searchDisabled}
                                    type="button"
                                    onClick={gotoSearchPage}
                            >
                                Search
                            </Button>
                        </div>
                    </div>
                    {
                        showDropdown && (
                            <ScrollArea className="h-40 w-full py-4">
                                {
                                    isProductsLoading && <div className="w-full border-0 p-2 rounded-0 space-y-2">
                                        <Skeleton className="h-8 w-full"/>
                                        <Skeleton className="h-8 w-full"/>
                                        <Skeleton className="h-8 w-full"/>
                                    </div>
                                }
                                {
                                    products?.map((product) =>
                                        <SearchResultCard key={product.productId} product={product}/>
                                    )
                                }
                            </ScrollArea>
                        )
                    }
                </div>
            </section>
        </div>
    );
};