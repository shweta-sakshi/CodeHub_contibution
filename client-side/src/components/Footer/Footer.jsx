import React from 'react';
import './Footer.css';
import NiTLogo from './mnnit_logo.png';
import CTLogo from './logo_half.png';
import Contributors from './Contributors';
export default function Footer() {
  const today = new Date();
  const year = today.getFullYear();
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
  <div className="footerLogo">
    <img className= "ct_logo" src={CTLogo} alt="CodeHub Logo" />
    <img className= "nit_logo" src={NiTLogo} alt="Motilal Nehru National Institute of Technology Logo" />
    <span className="mnnitLabel">MNNIT</span>
  </div>
  <div className="footerTitle">
    <span>&#169; {year} CodeHub. All Rights Reserved.</span>
  </div>
  <div className="LinkContainer">
  </div>
  <hr className="sectionDivider" />
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
    <p className='mt-10'><b>Contributors</b></p>
      <Contributors contributors={contributors}/>
    <br/>
  </div>
</footer>

  )
}

