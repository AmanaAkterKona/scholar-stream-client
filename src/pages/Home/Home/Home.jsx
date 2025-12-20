import React, { useState, useEffect } from 'react';
import Banner from './Banner/Banner';
import SuccessStories from './SuccessStories/SuccessStories';
import SectionFAQ from './SectionFAQ/SectionFAQ';
import Loader from '../../Loader/Loader';
import TrustedByMarquee from './TrustedByMarquee/TrustedByMarquee';
import FeaturedScholarships from './FeaturedScholarships/FeaturedScholarships';
import ImpactSection from './ImpactSection/ImpactSection';
import HowItWorks from './HowItWorks/HowItWorks';


const Home = () => {
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        
        setTimeout(() => {
            setLoading(false); 
        }, 2000); 
    }, []);

    if (loading) {
        return <Loader />; 
    }

    return (
        <div>
           
            <Banner />
            <SuccessStories />
            <FeaturedScholarships></FeaturedScholarships>
            <ImpactSection></ImpactSection>
            <HowItWorks></HowItWorks>
            <SectionFAQ />
            <TrustedByMarquee></TrustedByMarquee>
        </div>
    );
};

export default Home;
