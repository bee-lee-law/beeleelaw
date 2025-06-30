'use client'
import styles from "/app/page.module.css";
import { useState } from 'react';
import Card from "./Card";

const style = {
    position: 'fixed',
    zIndex: '10',
    right: '0',
    borderLeft: '1px solid',
    borderTop: '1px solid',
    background: '#222222',
    borderColor: '#333333',
    width: '50vw',
    height: '100vh',
    display: "flex",
    flexDirection: "column",
    gap: '2vh',
    marginTop: '10vh',
    marginRight: '-0.8vh'
}

const liStyle = {
    marginTop: '4vh',
    background: '#222222',
    width: '80%',
    height: 'auto',
    marginLeft: '4vw'
}

const testData = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.'
];

/** Left Navigation Bar
 * @component
 * @param {object} navStatus - Status of navigation bars, from Wrapper.js. Keys: left, right
 * @param {function} setNavStatus - Function to change navigation bar status, from Wrapper.js.
 * @param {boolean} isMobile - true if page is viewed from mobile device, else false
 * @param {JSX.Element[]} pageDescription - Array of JSX.Elements describing the project of the given page
*/
export default function RightBar(props){
    var pageDescription = props.pageDescription ? props.pageDescription : testData;
    let handleMouseEnter = () => {
        props.setNavStatus({
            ...props.navStatus,
            right: true
        })
    }
    let handleMouseLeave = () => {
        props.setNavStatus({
            ...props.navStatus,
            right: false
        })
    }
    return(
        <div 
            style={{...style, width: props.isMobile ? '100%' : '50vw'}}
            className={props.navStatus.right ? styles.slideIn : styles.slideOutRight}
            onMouseEnter={props.isMobile ? null : handleMouseEnter}
            onMouseLeave={props.isMobile ? null : handleMouseLeave}
        >
            <div className={styles.cardHeader} style={{width: '100%', height: '1.2em', background: '#333333', textAlign: 'center', fontSize: '2em'}}>About</div>
            {pageDescription.map((data, index)=>{
                return(
                    <div style={liStyle} key={index}>{data}</div>
                )
            })}
        </div>
    )
}