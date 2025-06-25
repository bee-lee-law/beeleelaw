'use client'
import styles from "/app/page.module.css";
import { useState } from 'react';

const style = {
    position: 'absolute',
    zIndex: '10',
    borderRight: '1px solid',
    borderTop: '1px solid',
    background: '#222222',
    borderColor: '#333333',
    width: '15vw',
    height: '100vh',
    display: "flex",
    flexDirection: "column",
    gap: '2vh',
    marginTop: '10vh',
    marginLeft: '-0.8vh'
}

const liStyle = {
    marginTop: '4vh',
    background: '#333333',
    width: '100%',
    height: '5vh'
}

/** Left Navigation Bar
 * @component
 * @param {object} navStatus - Status of navigation bars, from Wrapper.js. Keys: left, right
 * @param {function} setNavStatus - Function to change navigation bar status, from Wrapper.js.
 * @param {boolean} isMobile - true if page is viewed from mobile device, else false
*/
export default function LeftBar(props){
    let handleMouseEnter = () => {
        props.setNavStatus({
            ...props.navStatus,
            left: true
        })
    }
    let handleMouseLeave = () => {
        props.setNavStatus({
            ...props.navStatus,
            left: false
        })
    }
    return(
        <div 
            style={{...style, width: props.isMobile ? '100%' : '15vw'}}
            className={props.navStatus.left ? styles.slideIn : styles.slideOutLeft}
            onMouseEnter={props.isMobile ? null : handleMouseEnter}
            onMouseLeave={props.isMobile ? null : handleMouseLeave}
        >
            <div style={liStyle}>TestSite 1</div>
            <div style={liStyle}>TestSite 2</div>
            <div style={liStyle}>TestSite 3</div>
        </div>
    )
}