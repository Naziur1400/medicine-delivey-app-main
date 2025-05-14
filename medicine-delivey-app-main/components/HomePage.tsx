'use client'

import {CategorySection} from '@/components/categorysection/CategorySection';
import {NewLaunchSection} from '@/components/medicine/NewLaunchSection';
import {Searchbar} from '@/components/Searchbar/Searchbar';
import {OrderWithPrescription} from '@/components/OrderWithPrescription/OrderWithPrescription';
import {Promo} from '@/components/promo/Promo';
import {TrendingNearYouSection} from '@/components/medicine/TrendingNearYouSection';
import {SelfAdvertisement} from '@/components/SelfAdvertisement/SelfAdvertisement';
import {DealsOfTheDay} from '@/components/DealsOfTheDay/DealsOfTheDay';
import {VideoPlayer} from '@/components/VideoSection/VideoPlayer';

export default function HomePage() {

    return (
        <main className="flex flex-col space-y-6 md:space-y-16">
            <Searchbar/>
            <CategorySection/>
            <Promo/>
            <OrderWithPrescription/>
            <NewLaunchSection/>
            <TrendingNearYouSection/>
            <SelfAdvertisement/>
            <DealsOfTheDay/>
            <section className="container mx-auto">
                <VideoPlayer
                    videoSrc="https://pharamatic-storage.sgp1.cdn.digitaloceanspaces.com/V1-1.mp4"
                />
            </section>
            {/*<HealthArticles/>*/}
            {/*<WhyChooseUs/>*/}
        </main>
    );
}
