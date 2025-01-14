import React from 'react';

/**
 * @description This component is used to display the list of contributors for this Application.
 * @param contributors - List of contributors with name and LinkedIn profile link.
 */
export default function ContributorList({ contributors }) {
  return (
    <div className="contributors grid-contributors">
      <ul className='contributorsGrid'>
        {contributors.map((contributor) => (
          <li className='contributorItem' key={contributor.name}>
            <a
              href={contributor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="contributorLink"
            >
              {contributor.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
