/**
 * @fileoverview UserDetail component displays the details of the user.
 */
import React from "react";
import './UserDetail.css';

export default function UserDetail({userDetail}) {

    // user detail array with label and data property.
    const details = [
        { label: "Name", data: userDetail.name },
        { label: "Handle", data: userDetail.handle },
        { label: "Rating", data: userDetail.rating },
        { label: "Contributions", data: userDetail.contributions },
        { label: "Contests Given", data: userDetail.contestGiven },
        { label: "Problems Solved", data: userDetail.problemSolved },
        { label: "Total Submissions Made", data: userDetail.submissionsMade },
        { label: "Best Rank", data: userDetail.bestRank },
        { label: "Highest Rating Gain", data: userDetail.HighestRatingGain },
    ];

    return (
        <div>
            <div className="UserDetailOuterContainer">

                {/* title */}
                <h4>User Details</h4>

                {/* Display the user details using label and data. */}
                {details.map((detail, index) => (
                    <div className="userdetailtext" key={index}>
                        <div className="userdetaillabel">{detail.label}</div>
                        <div className="userdetaildata">{detail.data}</div>
                    </div>
                ))}

                <hr />
            </div>
            <br />
        </div>
    );
}
