/**
 * @fileoverview  - LandingPage component which is the main page of the website.
 */
import React from 'react'

import Welcome from './Welcome/Welcome'
import MotiveAchievements from './MotiveAchievements/MotiveAchievements'
import OurEvents from './OurEvents/OurEvents'
import Footer from "../../components/Footer/Footer"
import "./LandingPage.css"

export default function LandingPage() {
    return (
        <div className='bg-black h-auto'>
            {/*  -----------------WELCOME SECTION-------------------  */}
            <div id='welcomeLandingPageContainer'>
                <Welcome />
            </div>
            {/* ---------------------END---------------------- */}
            
            {/*  -----------------MOTIVEACHIEVEMENTS SECTION-------------------  */}
            <div id='motiveAchievementsContainer'>
                <MotiveAchievements />
            </div>
            {/* ---------------------END---------------------- */}

            {/*  -----------------OUREVENTS SECTION-------------------  */}
            <div id='ourEventsContainer'>
                <OurEvents />
            </div>
            {/* ---------------------END---------------------- */}
            
            <Footer />
            {/* ---------------------END---------------------- */}
        </div>
    )
}
