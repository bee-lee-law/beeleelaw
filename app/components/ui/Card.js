'use client'
import styles from "/app/page.module.css"
import { useState } from 'react';
import Image from "next/image";
import chevron from '/public/icons/chevron.svg';

const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    letterSpacing: '-0.01em',
}
const contentStyle = {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
    marginTop: '0.25rem',
}

/** Card - Modular display of information
 * @component
 * @param {string} headerTitle - Title of card.
 * @param {string} headerContent - Content of header.
 * @param {boolean} minimizeable - Provide the option to minimize the card.
 * */
export default function Card({ children, headerTitle, headerContent, minimizeable, style}){
    const [max, setMax] = useState(true);
    return(
        <div className={`card ${max ? '' : 'minimized'}`} style={{...style}}>
            <MinimizeButton minimizeable={minimizeable} max={max} setMax={setMax} />
            {headerTitle ?
                <div className={styles.cardHeader}>
                    <div style={titleStyle}>{headerTitle}</div>
                    <div style={contentStyle}>{headerContent}</div>
                </div>
             : <></>}
             <div style={{
                 opacity: max ? '1' : '0',
                 visibility: max ? 'visible' : 'hidden',
                 transition: 'opacity 0.2s ease, visibility 0.2s ease'
             }}>
                {children}
             </div>
        </div>
    )
}

function MinimizeButton(props){
    if(!props.minimizeable){return;}
    const [touch, setTouch] = useState(false);
    const buttonStyle = {
        cursor: 'pointer',
        position: 'absolute',
        left: '0.25em',
        top: '0.25em',
        WebkitTapHighlightColor: 'transparent',
        transform: touch ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.15s ease',
    }
    let handleClick = () => {
        props.setMax(!props.max)
    }
    let handleTouchStart = () => {
        setTouch(true);
    }
    let handleTouchEnd = () => {
        setTouch(false);
    }
    return(
        <div style={buttonStyle} onClick={handleClick} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <Image
             src={chevron}
             width={20}
             height={20}
             alt={'chevron'}
             style={{
                filter: 'invert(100%)',
                transform: props.max ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
            }}
             />
        </div>
    )
}