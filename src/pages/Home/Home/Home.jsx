import React from 'react';
import Banner from '../../Banner/Banner';
import WhyBookCu from '../../WhyBookCu/WhyBookCu';
import HowBookCourierWorks from '../../HowBookCourierWorks/HowBookCourierWorks';

import Writers from '../../Writers/Writers';
import Coverage from '../../Coverage/Coverage';
import Statistics from '../../Statistics/Statistics';
import Books from '../Books/Books';
const Home = () => {
    return (
        <div className='bg-[#FBF9D1]'>
            <Banner></Banner>
            <Books></Books>
            <Coverage></Coverage>
           <WhyBookCu></WhyBookCu>
           <Writers></Writers>
           <HowBookCourierWorks></HowBookCourierWorks>
            <Statistics></Statistics>
        </div>
    );
};

export default Home;