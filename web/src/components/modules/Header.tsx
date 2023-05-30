import React from 'react';

import logo from '../../img/image_FILL0_wght400_GRAD0_opsz48.svg';

function Header() {
    return (
        <nav className='navbaer'>
            <div className='navbar-brand'>
            <div className='navbar-item columns'>
                        <div className='column'>
                            <img src={logo} alt="logo" />
                        </div>
                        <div className='column is-four-fifths'>
                            <h1>icon-kunn</h1>
                        </div>
                    </div>
            </div>
        </nav>
    );
}

export default Header;
