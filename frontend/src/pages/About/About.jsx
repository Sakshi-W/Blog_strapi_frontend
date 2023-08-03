import React from 'react';

const About = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div
        title="About"
        style={{
          flexGrow: '1',
          padding: '0 20px', // Add some horizontal padding
          textAlign: 'center',
          paddingTop: '50px', // Add top padding for content
        }}
      >
        <h1>About page</h1>
        {/* Your main content here */}
      </div>
      <footer
        style={{
          backgroundColor: 'gray',
          padding: '10px 0',
          textAlign: 'center',
          position: 'fixed',
          bottom: '0',
          left: '0',
          width: '100%',
        }}
      >
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default About;
