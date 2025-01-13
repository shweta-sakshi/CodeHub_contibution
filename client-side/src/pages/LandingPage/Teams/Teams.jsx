/**
 * @fileoverview provide information about the teams in the CodeHub.
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import "./Teams.css";

export default function Teams() {

    const navigate = useNavigate();// For navigation to other routes.
    
    return (
        <div id='teams1Main'>
            <div id='teams2Main'>
                <div id='teams3Main'>

                    {/*Title*/}
                    <div id='teamsTitleMain'>
                        Teams
                    </div>

                    {/* team and its links for more information */}
                    <div id='teamsFlexContainer'>
                        <div id='teamsContentMain'>
                            <div onClick={() => navigate("/demoLink")} className='teamContentBoxesMain'>
                                <p>CT Admins</p>
                            </div>
                            <div onClick={() => navigate("/demoLink")} className='teamContentBoxesMain'>
                                <p>CT Representatives</p>
                            </div>
                            <div onClick={() => navigate("/demoLink")} className='teamContentBoxesMain'>
                                <p>CT Design Team</p>
                            </div>
                            <div onClick={() => navigate("/demoLink")} className='teamContentBoxesMain'>
                                <p>CT Web Team</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}