'use client'
import styles from "/app/page.module.css"
import { useState } from "react"

const style = {
    position: 'absolute',
    borderBottom: '1px solid #333333',
    borderColor: '#333333',
    width: '100%',
    height: '10vh',
}

const innerStyle = {
    width: '95%',
    margin: 'auto',
    marginTop: '2vh',
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
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
                {props.pageTitle ? <div style={{fontSize: '2.5em'}}>{props.pageTitle}</div> : <div></div>}
                <NavMenuIconRight navStatus={props.navStatus} setNavStatus={props.setNavStatus} isMobile={props.isMobile} />
            </div>
        </div>
    )
}

function NavMenuIconLeft(props){
    const [hover, setHover] = useState(false);
    let handleMouseEnter = () => {
        setHover(true);
    }
    let handleMouseLeave = () => {
        setHover(false);
    }
    let handleClick = () => {
        props.setNavStatus({
            ...props.navStatus,
            left: !props.navStatus.left
        })
    }
    return(
        <div style={{
                cursor: 'pointer',
                fontSize:'2.5em', 
                transform: hover ? 'scale(1.3)' : 'scale(1)', 
                marginTop: '-1.5vh',
                userSelect: 'none',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            &#9776;
        </div>
    )
}

function NavMenuIconRight(props){
    const [hover, setHover] = useState(false);
    let handleMouseEnter = () => {
        setHover(true);
    }
    let handleMouseLeave = () => {
        setHover(false);
    }
    let handleClick = () => {
        props.setNavStatus({
            ...props.navStatus,
            right: !props.navStatus.right
        })
    }
    return(
        <span style={{
                cursor: 'pointer',
                fontSize:'2.5em', 
                transform: hover ? 'scale(1.3)' : 'scale(1)', 
                marginTop: '-1.5vh',
                userSelect: 'none',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className={styles.circledQuestion}
        />
    )
}