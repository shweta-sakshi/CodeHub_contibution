import React from "react";
import './UserDetail.css';

export default function UserDetail({userDetail}) {
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
                <h4>User Details</h4>
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
