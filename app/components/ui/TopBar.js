'use client'
import styles from "/app/page.module.css"
import { useState } from "react"

const style = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    width: '100%',
    minHeight: '10vh',
    background: '#222222',
    zIndex: 100,
    paddingBottom: 'var(--spacing-2)',
}

const innerStyle = {
    width: '95%',
    margin: 'auto',
    paddingTop: 'var(--spacing-3)',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
}

/** Top Navigation Bar
 * @component
 * @param {object} navStatus - Status of navigation bars, from Wrapper.js. Keys: left, right
 * @param {function} setNavStatus - Function to change navigation bar status, from Wrapper.js.
 * @param {boolean} isMobile - True if page is viewed from mobile device, else false.
 * @param {string} pageTitle - Title of given page.
 * */
export default function TopBar(props){
    return(
        <div style={style}>
            <div style={innerStyle}>
                <NavMenuIconLeft navStatus={props.navStatus} setNavStatus={props.setNavStatus} isMobile={props.isMobile} />
                {props.pageTitle ? <div style={{fontSize: '2em', textAlign: 'center', flex: '1'}}>{props.pageTitle}</div> : <div style={{flex: '1'}}></div>}
                <NavMenuIconRight navStatus={props.navStatus} setNavStatus={props.setNavStatus} isMobile={props.isMobile} />
            </div>
        </div>
    )
}

function NavMenuIconLeft(props){
    const [hover, setHover] = useState(false);
    const [touch, setTouch] = useState(false);
    let handleMouseEnter = () => {
        setHover(true);
    }
    let handleMouseLeave = () => {
        setHover(false);
    }
    let handleTouchStart = () => {
        setTouch(true);
    }
    let handleTouchEnd = () => {
        setTouch(false);
    }
    let handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        props.setNavStatus({
            ...props.navStatus,
            left: !props.navStatus.left
        })
    }
    return(
        <div style={{
                cursor: 'pointer',
                fontSize:'2.5em',
                userSelect: 'none',
                transition: 'box-shadow 0.3s ease, color 0.2s ease',
                WebkitTapHighlightColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
                padding: '0.2em 0.3em',
                borderRadius: 'var(--border-radius-sm)',
                boxShadow: (hover || touch) ? '-3px 0 0 0 var(--accent-primary)' : 'none',
                color: (hover || touch) ? 'var(--foreground)' : 'var(--text-primary)',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={handleClick}
        >
            &#9776;
        </div>
    )
}

function NavMenuIconRight(props){
    const [hover, setHover] = useState(false);
    const [touch, setTouch] = useState(false);
    let handleMouseEnter = () => {
        setHover(true);
    }
    let handleMouseLeave = () => {
        setHover(false);
    }
    let handleTouchStart = () => {
        setTouch(true);
    }
    let handleTouchEnd = () => {
        setTouch(false);
    }
    let handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        props.setNavStatus({
            ...props.navStatus,
            right: !props.navStatus.right
        })
    }
    return(
        <div style={{
                cursor: 'pointer',
                fontSize:'2.5em',
                userSelect: 'none',
                transition: 'box-shadow 0.3s ease, color 0.2s ease',
                WebkitTapHighlightColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
                padding: '0.2em 0.3em',
                borderRadius: 'var(--border-radius-sm)',
                boxShadow: (hover || touch) ? '3px 0 0 0 var(--accent-primary)' : 'none',
                color: (hover || touch) ? 'var(--foreground)' : 'var(--text-primary)',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={handleClick}
            className={styles.circledQuestion}
        />
    )
}