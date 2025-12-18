import React, { useState, useEffect } from 'react';
import Banner from './Banner/Banner';
import SuccessStories from './SuccessStories/SuccessStories';
import SectionFAQ from './SectionFAQ/SectionFAQ';
import Loader from '../../Loader/Loader';
import TrustedByMarquee from './TrustedByMarquee/TrustedByMarquee';
import FeaturedScholarships from './FeaturedScholarships/FeaturedScholarships';
import ImpactSection from './ImpactSection/ImpactSection';


const Home = () => {
    const [loading, setLoading] = useState(true);

    // ধরি এখানে Banner/SuccessStories data fetch করছি
    useEffect(() => {
        // Example: Simulate API call with setTimeout
        setTimeout(() => {
            setLoading(false); // Data আসার পর loading false হবে
        }, 2000); // 2 seconds delay
    }, []);

    if (loading) {
        return <Loader />; // loading=true হলে spinner দেখাবে
    }

    return (
        <div>
           
            <Banner />
            <SuccessStories />
            <FeaturedScholarships></FeaturedScholarships>
            <ImpactSection></ImpactSection>
            <SectionFAQ />
            <TrustedByMarquee></TrustedByMarquee>
        </div>
    );
};

export default Home;
