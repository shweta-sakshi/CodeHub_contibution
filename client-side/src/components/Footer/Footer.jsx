import React from 'react';

import './Footer.css';
import Contributors from './Contributors';
import NiTLogo from './mnnit_logo.png';
import CTLogo from './logo_half.png';

/**
 * @description This component is used to render the footer of the Project.
 * It displays the following information:
 *              - CodeHub and MNNIT logo.
 *              - list of contributors to the project.
 *              - copyright information.
 *              - contribution link to the GitHub repository.
 */
export default function Footer() {
  const today = new Date();
  const year = today.getFullYear();

  // List of all contributors and their LinkedIn profile link.
  const contributors = [
    { name: 'Aditya Raj Rai', link: 'https://www.linkedin.com/in/link-aditya-rai/' },
    { name: 'Mrinal Varshney', link: 'https://www.linkedin.com/in/mrinal-varshney-971a27250/' },
    { name: 'Ayush Tiwari', link: 'https://www.linkedin.com/in/ayush-tiwari-84a823281/' },
    { name: 'Sumit Verma', link: 'https://www.linkedin.com/in/sumit-verma-smt/' },
    { name: 'Aishwarya Vikram Singh', link: 'https://www.linkedin.com/in/a-v-singh/' },
    { name: 'Aryan Singh', link: 'https://www.linkedin.com/in/aryan-singh-44a931251/' },
    { name: 'Khanak Patwari', link: 'https://www.linkedin.com/in/khanak-patwari/' },
    { name: 'Kavya Agarwal', link: 'https://www.linkedin.com/in/kagarwal1811/' },
    { name: 'Akhil Gupta', link: 'https://www.linkedin.com/in/akhil-g-131923136/' },
    { name: 'Subrat Pandey', link: 'https://www.linkedin.com/in/imsubratpandey/' },
    { name: 'Archana Yadav', link: 'https://www.linkedin.com/in/archana1203/' },
    { name: 'Janhavi Rai', link: 'https://www.linkedin.com/in/janhavi-rai24/' },
    { name: 'Nishant Mohan', link: 'https://www.linkedin.com/in/nishant-mohan-58931927a/' },
  ];

  return (
<footer className="FooterContainer">

  {/*Logos and labels*/}
  <div className="footerLogo">
    <img className= "ct_logo" src={CTLogo} alt="CodeHub Logo" />
    <img className= "nit_logo" src={NiTLogo} alt="Motilal Nehru National Institute of Technology Logo" />
    <span className="mnnitLabel">MNNIT</span>
  </div>

    {/*Copywrite Information*/}
  <div className="footerTitle">
    <span>&#169; {year} CodeHub. All Rights Reserved.</span>
    <br />
  </div>

  <div className="LinkContainer">
<<<<<<< HEAD
    {/* <a href="mailto:computer.club@mnnit.ac.in" className="FooterLink">Contact Us</a> */}
    <a href="https://github.com/adityarai0705/CodeHub/blob/main/LICENSE" className='font-normal FooterLink'>License </a>
    <a href="https://github.com/adityarai0705/CodeHub/blob/main/CODE_OF_CONDUCT.md" className='font-normal FooterLink'> Code of Conduct</a>
=======
>>>>>>> origin/pr/77
  </div>

  <hr className="sectionDivider" />

    {/*Contribution link*/}
    <div className='additionalInfo'>
      <div className='contributors'>
      <h3>Do you wish to contribute to CodeHub?</h3>
      <p className="contributeText">
        CodeHub is open-sourced for MNNIT students to cultivate a vibrant culture of open-source learning within the college community.
      </p>
      <a
        href="https://github.com/adityarai0705/CodeHub"
        className="contributeLink"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="contributeButton">Visit CodeHub on GitHub</button>
      </a>
    </div>

    <hr className="sectionDivider " />

    {/*List of all Contributors with their LinkedIn profile link*/}
    <p className='mt-10'><b>Contributors</b></p>
      <Contributors contributors={contributors}/>
    <br/>
  </div>

</footer>
  )
}
