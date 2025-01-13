/**
 * @fileoverview displays the profile image of the user using the ImageContainer component.
 */
import React from 'react'
import './ProfileImg.css'
import ImageContainer from '../../../components/ImageContainer'

export default function ProfileImg( props) {
  return (
    <div className='ProfileImgContainer'>
        <ImageContainer image={props.image} />
    </div>
  )
}
