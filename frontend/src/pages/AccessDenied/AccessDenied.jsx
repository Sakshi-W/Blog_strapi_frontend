import React from 'react'

import './AccessDenied.css';
 
const AccessDenied = () => {
  return (
    <div className="content-container" style={{marginBottom:'160px'}}>
      <div className="access-denied-container">
        Access Denied! You don't have permission to view this page.
      </div>
    </div>
  );
};
export default AccessDenied;
