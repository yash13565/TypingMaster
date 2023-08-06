import React from 'react'
import style from './Navbar.module.css'

function Navbar({ children }) {

    return (
        <div className={style.maincont}>
            <div className={style.parent}>
                <img src='https://wallpapercave.com/wp/wp6688406.jpg' alt='homeprofile.jpeg' />
                <h1 className={style.navheading}>TypingMaster</h1>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Navbar