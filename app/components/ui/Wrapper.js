'use client'
import styles from "/app/page.module.css"
import TopBar from "./TopBar";
import LeftBar from "./LeftBar";
import { useState } from 'react';
import RightBar from "./RightBar";
import BottomBar from "./BottomBar";

const DIRECTORY = [
    {
        'route': '/personalSummary', 
        'name': 'Personal Summary'
    },    
    {
        'route': '/jsonTable', 
        'name': 'JSON Table'
    },
  ]

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

    const handleOverlayClick = () => {
        if(isMobile && (navStatus.left || navStatus.right)){
            setNavStatus({
                left: false,
                right: false
            })
        }
    }

    return (
        <div style={{overflowX: 'hidden', position: 'relative', width: '100%', minHeight: '100vh'}}>
            {isMobile && (navStatus.left || navStatus.right) && (
                <div
                    onClick={handleOverlayClick}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 25,
                        cursor: 'pointer'
                    }}
                />
            )}
            <TopBar navStatus={navStatus} setNavStatus={setNavStatus} isMobile={isMobile} pageTitle={pageTitle} />
            <LeftBar navStatus={navStatus} setNavStatus={setNavStatus} isMobile={isMobile} directory={DIRECTORY} />
            <RightBar navStatus={navStatus} setNavStatus={setNavStatus} isMobile={isMobile} pageDescription={pageDescription} />
            <div className={styles.page}>
                {children}
            </div>
            <BottomBar navStatus={navStatus} setNavStatus={setNavStatus} isMobile={isMobile}/>
        </div>
    );
  };