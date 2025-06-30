'use client'
import styles from "/app/page.module.css";
import { useState } from "react";
import Image from "next/image";
import githubMark from '/public/icons/github-mark.svg';
import linkedInMark from '/public/icons/InBug-White.png';
import instaMark from '/public/icons/Instagram_Glyph_Black.svg';


const style = {
    //position: 'absolute',
    borderTop: '1px solid #333333',
    borderColor: '#333333',
    width: '100%',
    //height: '10vh',
}

const innerStyle = {
    width: '75%',
    margin: 'auto',
    marginTop: '3vh',
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
}

const elementStyle = {
    textAlign: 'center'
}

const imageSize = 30;

/** Top Navigation Bar
 * @component
 * @param {object} navStatus - Status of navigation bars, from Wrapper.js. Keys: left, right
 * @param {function} setNavStatus - Function to change navigation bar status, from Wrapper.js.
 * @param {boolean} isMobile - True if page is viewed from mobile device, else false.
 * */
export default function BottomBar(props){
    return(
        <div style={style}>
            <div style={{...innerStyle, flexFlow: props.isMobile ? 'column' : 'row', gap: props.isMobile ? '1vh' : null}}>
                <div style={elementStyle}>Brandon Lawrence</div>
                <div style={elementStyle}>Grand Rapids, MI 2025</div>
                <div style={{...elementStyle, display: 'flex', flexFlow: 'row', gap: '3vh', justifyContent: 'center'}}>
                    <a href='https://github.com/bee-lee-law/beeleelaw' target="_blank">
                        <Image style={{background: 'white', borderRadius: '50%'}}
                            src={githubMark}
                            width={imageSize}
                            height={imageSize}
                            alt='github-mark'
                        />
                    </a>
                    <a href='https://www.linkedin.com/in/beelaw/' target="_blank">
                        <Image style={{borderRadius: '50%'}}
                            src={linkedInMark}
                            width={imageSize}
                            height={imageSize}
                            alt='linkedIn-mark'
                        />
                    </a>
                    <a href='https://www.instagram.com/les_reves_dun_bee' target="_blank">
                        <Image style={{background: 'white', borderRadius: '50%'}}
                            src={instaMark}
                            width={imageSize}
                            height={imageSize}
                            alt='insta-mark'
                        />  
                    </a>                  
                </div>
            </div>
        </div>
    )
}