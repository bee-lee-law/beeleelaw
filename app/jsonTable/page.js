'use client'
import Image from "next/image";
import styles from "../page.module.css";
import Wrapper from "../components/ui/Wrapper";
import checkMobile from "../components/tools/checkMobile";
import Card from "../components/ui/Card";
import AdvTable from "../components/ui/AdvTable";



const pageTitle = "JSON Table";


const pageDescription = [
  <>
    PH.
  </>,
]



export default function Home() {
  var isMobile = checkMobile();
  return (
    <Wrapper isMobile={isMobile} pageTitle={pageTitle} pageDescription={pageDescription}>
      <main className={styles.main}>
        <Card style={{width: '80vw'}}>
            <AdvTable />
        </Card>
      </main>
    </Wrapper>
  );
}
