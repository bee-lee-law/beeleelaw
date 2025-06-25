'use client'
import styles from "/app/page.module.css"
import { useState } from 'react';
import Image from "next/image";
import chevron from '/public/chevron.svg';

const titleStyle = {
    fontSize: '1.2em',
    fontWeight: 'bold',
}
const contentStyle = {
    fontSize: '1.1em',
    color: '#dddddd',
}

/** Card - Modular display of information
 * @component
 * @param {string} headerTitle - Title of card
 * @param {string} headerContent - Content of header
 * */
export default function Card({ children, headerTitle, headerContent, minimizeable, style}){
    const [max, setMax] = useState(true);
    return(
        <div className={max ? 'card' : 'card minimized'} style={{...style}}>
            <MinimizeButton minimizeable={minimizeable} max={max} setMax={setMax} />
            {headerTitle ? 
                <div className={styles.cardHeader}>
                    <div style={titleStyle}>{headerTitle}</div>
                    <div>{headerContent}</div>
                </div>
             : <></>}
             <div>
                {max ? children : <></>}
             </div>
        </div>
    )
}

function MinimizeButton(props){
    if(!props.minimizeable){return;}
    const buttonStyle = {
        cursor: 'pointer',
        position: 'absolute',
        left: '0.25em',
        top: '0.25em',
    }
    let handleClick = () => {
        props.setMax(!props.max)
    }
    return(
        <div style={buttonStyle} onClick={handleClick}>
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