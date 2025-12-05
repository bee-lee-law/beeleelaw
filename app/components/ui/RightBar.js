'use client'
import styles from "/app/page.module.css";
import { useState } from 'react';
import Card from "./Card";

const style = {
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: 150,
    borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'var(--background)',
    width: '50vw',
    height: '100vh',
    display: "flex",
    flexDirection: "column",
    paddingTop: 'var(--spacing-3)',
    overflowY: 'auto',
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch',
    willChange: 'transform',
}

const headerStyle = {
    width: '100%',
    padding: 'var(--spacing-4)',
    background: 'rgba(255, 255, 255, 0.02)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: '600',
    fontFamily: 'var(--font-geist-sans)',
    letterSpacing: '-0.01em',
}

const contentStyle = {
    padding: 'var(--spacing-4)',
    paddingLeft: 'var(--spacing-4)',
    paddingRight: 'var(--spacing-4)',
    background: 'transparent',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-3)',
    boxSizing: 'border-box',
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
function CloseButton({ onClick }) {
    const [hover, setHover] = useState(false);

    const buttonStyle = {
        position: 'absolute',
        top: 'var(--spacing-2)',
        left: 'var(--spacing-2)',
        cursor: 'pointer',
        fontSize: '1.5rem',
        padding: '0.3em 0.4em',
        borderRadius: 'var(--border-radius-sm)',
        transition: 'all 0.2s ease',
        background: hover ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
        color: hover ? 'var(--foreground)' : 'var(--text-secondary)',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        lineHeight: 1,
        zIndex: 20,
    };

    return (
        <div
            style={buttonStyle}
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            ×
        </div>
    );
}

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
    let handleClose = () => {
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
            {props.isMobile && <CloseButton onClick={handleClose} />}
            <div style={headerStyle}>About This Page</div>
            <div style={contentStyle}>
                {pageDescription.map((data, index)=>{
                    return(
                        <p key={index} style={{maxWidth: '100%', width: '100%'}}>
                            {data}
                        </p>
                    )
                })}
            </div>
        </div>
    )
}