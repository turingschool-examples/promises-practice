import React from 'react';

const StaffMember = ({ name, bio, image }) => {
  return (
    <div className='staff-member'>
      <h1>{name}</h1>
      <img src={image || 'https://greenhost.net/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'} />
      <p>{bio}</p>
    </div>
  )
}

export default StaffMember;
