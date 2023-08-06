import React from 'react'
import style from './Home.module.css'
import { Link } from 'react-router-dom'
function Home() {
    return (
        <div className={style.parentcont}>
           <h1 className={style.heading} data-text='Welcome To Typing Master'>Welcome To Typing Master!</h1>
           <p className={style.para}>Wanna test and increase  your typing skill lets take a challenge. </p>
           <Link className={style.linkbtn} to='/typingtest'>Test</Link>
        </div>
    )
}

export default Home