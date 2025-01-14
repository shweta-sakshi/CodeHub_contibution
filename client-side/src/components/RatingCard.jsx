/**
 * @file Component that displays rank card of the user in specific color based on their rank.
 */
import React from 'react'
import './components.css'

export default function RatingCard( props) {
    const username = props.name;
    const rank = props.rank;

    // set rank color based on the rank of the user to apply specific css class.
    let rankcol = 'unrated';
    let rankname = 'unrated';
    if( rank === 'newbie'){ rankcol = "RatingCard RatingNewbie"; rankname = "Newbie"; }
    else if( rank === 'pupil'){ rankcol = "RatingCard RatingPupil"; rankname = "Pupil"; }
    else if( rank === 'specialist'){ rankcol = "RatingCard RatingSpecialist"; rankname = "Specialist"; }
    else if( rank === 'expert'){ rankcol = "RatingCard RatingExpert"; rankname = "Expert"; }
    else if( rank === 'candidate master'){ rankcol = "RatingCard RatingCandidateMaster"; rankname = "Candidate Master"; }
    else if( rank === 'master'){ rankcol = "RatingCard RatingMaster"; rankname = "Master"; }
    else if( rank === 'international master'){ rankcol = "RatingCard RatingInternationalMaster"; rankname = "International Master"; }
    else if( rank === 'grandmaster'){ rankcol = "RatingCard RatingGrandMaster"; rankname = "Grandmaster"; }
    else if( rank === 'international grandmaster'){ rankcol = "RatingCard RatingInternationalGrandMaster"; rankname = "International Grandmaster"; }
    else if( rank === 'legendary grandmaster'){ rankcol = "RatingCard RatingLegendaryGrandMaster"; rankname = "Legendary Grandmaster"; }

  return (
    <div className={rankcol}>
        <div style={{width : '100%', textAlign : 'left'}}>{username}</div>
        <div style={{width : '100%', textAlign : 'right'}}>{rankname}</div>
    </div>
  )
}
