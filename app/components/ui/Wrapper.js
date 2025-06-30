'use client'
import styles from "/app/page.module.css"
import TopBar from "./TopBar";
import LeftBar from "./LeftBar";
import { useState } from 'react';
import RightBar from "./RightBar";
import BottomBar from "./BottomBar";


/** Page Wrapper - Wrap the page in header/footer/nav bars
 * @component
 * @param {boolean} isMobile - true if page is viewed from mobile device, else false
 * @param {string} pageTitle - Title of given page.
 * @param {JSX.Element[]} pageDescription - Array of JSX.Elements describing the project of the given page
*/
export default function Wrapper({ children, isMobile, pageTitle, pageDescription}){
    const [navStatus, setNavStatus] = useState({
        left: false,
        right: false,
    })
    return (
        <span style={{overflowX: 'hidden', position: isMobile ? 'relative' : 'inherit'}}>
            <TopBar navStatus={navStatus} setNavStatus={setNavStatus} isMobile={isMobile} pageTitle={pageTitle} />
            <LeftBar navStatus={navStatus} setNavStatus={setNavStatus} isMobile={isMobile} />
            <RightBar navStatus={navStatus} setNavStatus={setNavStatus} isMobile={isMobile} pageDescription={pageDescription} />
            <div className={styles.page}>
                {children}
            </div>
            <BottomBar navStatus={navStatus} setNavStatus={setNavStatus} isMobile={isMobile}/>
        </span>
    );
  };