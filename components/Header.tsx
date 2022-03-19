import React from 'react';

const Header = () => (
  <div>
    <div className=''>
      <div>header</div>
    </div>
    <HeaderBig />
  </div>
);

const HeaderBig = () => (
  <div className='hidden'>
    <div>hola</div>
  </div>
);

export default Header;
