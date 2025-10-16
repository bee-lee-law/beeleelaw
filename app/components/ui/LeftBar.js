'use client'
import styles from "/app/page.module.css";
import { useState } from 'react';
import Link from 'next/link'

const style = {
    position: 'absolute',
    zIndex: '10',
    borderRight: '1px solid',
    borderTop: '1px solid',
    background: '#222222',
    borderColor: '#333333',
    width: '15vw',
    height: 'calc(100vh - 10vh)',
    minHeight: '-webkit-fill-available',
    display: "flex",
    flexDirection: "column",
    gap: '2vh',
    marginTop: '10vh',
    marginLeft: '-0.8vh',
    overflow: 'hidden',
}

const liStyle = {
    paddingTop: '1em',
    paddingLeft: '1em',
    background: '#333333',
    width: '100%',
    height: '5vh'
}

/** Left Navigation Bar
 * @component
 * @param {object} navStatus - Status of navigation bars, from Wrapper.js. Keys: left, right
 * @param {function} setNavStatus - Function to change navigation bar status, from Wrapper.js.
 * @param {boolean} isMobile - true if page is viewed from mobile device, else false
 * @param {Object[]} directory - Array of Objects in format: {route: routePath, name: URL Name}
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
            <Link href={'/'} style={{WebkitTapHighlightColor: 'transparent'}}><div style={liStyle}>Home</div></Link>
            {props.directory.map((obj, ind)=>{
                return(
                    <Link href={obj.route} key={ind} style={{WebkitTapHighlightColor: 'transparent'}}><div style={{...liStyle, maxWidth: props.isMobile ? '100%' : '15vw'}}> {obj.name}</div></Link>
                )
            })}
        </div>
    )
}