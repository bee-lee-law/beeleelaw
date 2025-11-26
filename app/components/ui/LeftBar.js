'use client'
import styles from "/app/page.module.css";
import { useState } from 'react';
import Link from 'next/link'

const style = {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 150,
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'var(--background)',
    width: '15vw',
    height: '100vh',
    display: "flex",
    flexDirection: "column",
    paddingTop: 'var(--spacing-3)',
    paddingBottom: 'var(--spacing-3)',
    gap: 'var(--spacing-1)',
    overflow: 'hidden',
    willChange: 'transform',
}

const liStyle = {
    padding: 'var(--spacing-3) var(--spacing-4)',
    background: 'transparent',
    width: '100%',
    minHeight: '48px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    borderLeft: '2px solid transparent',
    position: 'relative',
}

/** Left Navigation Bar
 * @component
 * @param {object} navStatus - Status of navigation bars, from Wrapper.js. Keys: left, right
 * @param {function} setNavStatus - Function to change navigation bar status, from Wrapper.js.
 * @param {boolean} isMobile - true if page is viewed from mobile device, else false
 * @param {Object[]} directory - Array of Objects in format: {route: routePath, name: URL Name}
*/
function NavItem({ href, children, onClick, index }) {
    const [hover, setHover] = useState(false);

    // Alternate between primary and secondary accent colors
    const accentColor = index % 2 === 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)';

    const itemStyle = {
        ...liStyle,
        background: hover ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
        borderLeftColor: hover ? accentColor : accentColor,
        borderLeftWidth: hover ? '3px' : '2px',
        color: hover ? 'var(--foreground)' : 'var(--text-primary)',
    };

    return (
        <Link
            href={href}
            onClick={onClick}
            style={{
                textDecoration: 'none',
                WebkitTapHighlightColor: 'transparent',
                width: '100%'
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div style={itemStyle}>{children}</div>
        </Link>
    );
}

function CloseButton({ onClick }) {
    const [hover, setHover] = useState(false);

    const buttonStyle = {
        position: 'absolute',
        top: 'var(--spacing-2)',
        right: 'var(--spacing-2)',
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
    let handleLinkClick = () => {
        if(props.isMobile){
            props.setNavStatus({
                ...props.navStatus,
                left: false
            })
        }
    }
    let handleClose = () => {
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
            {props.isMobile && <CloseButton onClick={handleClose} />}
            <NavItem href={'/'} onClick={handleLinkClick} index={0}>Home</NavItem>
            {props.directory.map((obj, ind)=>{
                return(
                    <NavItem href={obj.route} key={ind} onClick={handleLinkClick} index={ind + 1}>{obj.name}</NavItem>
                )
            })}
        </div>
    )
}