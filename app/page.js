'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Wrapper from "./components/ui/Wrapper";
import checkMobile from "./components/tools/checkMobile";
import Card from "./components/ui/Card";


const pageTitle = "Index";

export default function Home() {
  var isMobile = checkMobile();
  return (
    <Wrapper isMobile={isMobile} pageTitle={pageTitle}>
      {/*isMobile ? <a>isMobile {window.innerWidth}</a> : <a>not mobile {window.innerWidth}</a>*/}
      <main className={styles.main}>
        <Card headerTitle="Test Card" headerContent='This is a test card' style={{width: '60vw'}}>
          Hi
        </Card>
        <Card headerTitle="Test Card" headerContent='This is a test card' minimizeable={true} style={{width: '60vw'}}>
          Hi
        </Card>
        <Card style={{width: '60vw'}}>
          Hi
        </Card>
      </main>
    </Wrapper>
  );
}
