import React from 'react';
import Banner from '../../Banner/Banner';
import WhyBookCu from '../../WhyBookCu/WhyBookCu';
import HowBookCourierWorks from '../../HowBookCourierWorks/HowBookCourierWorks';

import Writers from '../../Writers/Writers';
import Coverage from '../../Coverage/Coverage';
import Statistics from '../../Statistics/Statistics';
import Books from '../Books/Books';
import FAQ from '../../FAQ/FAQ';
import Newsletter from '../../Newsletter/Newsletter';
import BlogSection from '../../BlogSection/BlogSection';
const Home = () => {
    return (
        <div className='bg-[#FBF9D1]'>
            <Banner></Banner>
            <Books></Books>
            <Statistics></Statistics>
            <Coverage></Coverage>
            <WhyBookCu></WhyBookCu>
            <BlogSection></BlogSection>
            <Writers></Writers>
            <HowBookCourierWorks></HowBookCourierWorks>
            <Newsletter></Newsletter>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;