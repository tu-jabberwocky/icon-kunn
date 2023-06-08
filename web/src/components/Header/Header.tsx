import React from 'react';

import logo from './image/image_FILL0_wght400_GRAD0_opsz48.svg'

function Header() {
    return (
        <header>
            <section className='hero is-info'>
                <div className='hero-body columns'>
                    <div className='column is-2'>
                        <a className='nabvar-item' href=''>
                            <img src={logo} alt="logo" />
                        </a>
                    </div>
                    <div className='colmns'>
                        <h1 className='title'>icon-kunn</h1>
                        <h1 className='sybtitle'>画像からアイコンを生成します。</h1>
                    </div>
                </div>
            </section>
        </header>
    );
}

export default Header;
