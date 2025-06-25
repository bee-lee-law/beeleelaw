'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Wrapper from "./components/ui/Wrapper";
import checkMobile from "./components/tools/checkMobile";


const pageTitle = "Index";

export default function Home() {
  var isMobile = checkMobile();
  return (
    <Wrapper isMobile={isMobile} pageTitle={pageTitle}>
      {/*isMobile ? <a>isMobile {window.innerWidth}</a> : <a>not mobile {window.innerWidth}</a>*/}
      <main className={styles.main}>
        <div className={styles.logo}>testbox</div>
        <ol>
          <li>
            Get started by editing <code>app/page.js</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
      </main>
    </Wrapper>
  );
}
