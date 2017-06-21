import React from 'react';
import StaffMember from './StaffMember.js';

const StaffList = ({array}) => {
  const members = array.map((member, i) => ( <StaffMember key={i} {...member}/> ));
  return (
    <div className='staff-list'>
      {members}
    </div>
  );
}

export default StaffList;
