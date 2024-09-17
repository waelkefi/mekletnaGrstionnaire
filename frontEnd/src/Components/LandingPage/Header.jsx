import React from 'react'
import './Landing.css'
import HeaderImg from "../../images/Groupe 3055.png"
import HeaderImgM from "../../images/bgmb.png"
function Header() {
    return (
        <div className="header-container-landing mt-5">
             <img src={HeaderImg} alt="mekletna" className='header-image-w' />
             <img src={HeaderImgM} alt="mekletna" className='header-image-m' />
        </div>
    )
}

export default Header