/**
 * @fileoverview provide useful links and information about the CodeHub.
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./QuickLinkAboutUs.css";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function QuickLinkAboutUs() {

    const navigate = useNavigate();// For navigation to other routes.

    const linkContainer = useRef(); // Ref for the link container.

    return (
        <div id='quickLinksAboutUsMain'>
            <div style={{ height : '15vh'}}></div>

            {/* QUICK LINKS */}
            <div id='quickLinksBoxMain' ref={linkContainer}>
                <div onClick={() => window.location.href = "https://discord.gg/n47J3fxa"} className='quickLinksBoxContents' id='aa'>
                    Join our Discord Server
                </div>
                <div onClick={() => window.location.href = "https://codeforces.com/group/hUywLYmr80/blog"} className='quickLinksBoxContents'>
                    Join CodeForces Group
                </div>
                <div onClick={() => navigate("/notice-board")} className='quickLinksBoxContents'>
                    Visit our Notice Board
                </div>
                <div onClick={() => navigate("/demoLink")} className='quickLinksBoxContents'>
                    Visit our Education Section
                </div>
            </div>

            <div style={{ height : '15vh'}}></div>

            {/* ABOUT US */}
            <div id='aboutUsMain'>
                <div id='aboutUsTitleMain'>
                    About CodeHub
                </div>
                <div id='aboutUsContentMain'>
                CodeHub is a comprehensive online platform developed by the Computer Coding Club at MNNIT to support its events, workshops, seminars, and more. Serving as the central hub for all club activities, CodeHub offers easy access to resources and updates related to the club's initiatives. Additionally, the platform features a detailed CodeForces ranking system, tailored to foster a competitive coding environment within the college community.
                </div>
            </div>

        </div>
    )
}
