'use client'
import Image from "next/image";
import styles from "../page.module.css";
import Wrapper from "../components/ui/Wrapper";
import checkMobile from "../components/tools/checkMobile";
import Card from "../components/ui/Card";
import img_bee2 from '/public/pics/bee2.jpg';


const pageTitle = "Personal Summary";
const imageSize = '200';

const pageDescription = [
  <>
    Personal Summary page description
  </>,
]



export default function Home() {
  var isMobile = checkMobile();
  return (
    <Wrapper isMobile={isMobile} pageTitle={pageTitle} pageDescription={pageDescription}>
      <main className={styles.main}>
        <PersonalLife isMobile={isMobile} />
        <WorkHistory isMobile={isMobile} />
      </main>
    </Wrapper>
  );
}

function PersonalLife(props){
    return(
        <Card style={{width: '80vw'}} minimizeable={true} headerTitle={'Personal Life'}>
            <div className={props.isMobile ? styles.innerCardMobile : styles.innerCardDeskop}>
                <Image style={{background: 'white', borderRadius: '10%', margin: 'auto'}}
                                src={img_bee2}
                                width={imageSize}
                                height={'auto'}
                                alt='insta-mark'
                /> 
                <span className={props.isMobile ? styles.cardContentMobile : styles.cardContentDesktop}>
                    test
                </span>
            </div>
      </Card>
    )
}

function WorkHistory(props){
    return(
        <Card style={{width: '80vw'}} minimizeable={true} headerTitle={'Work History'}>
            <div className={props.isMobile ? styles.innerCardMobile : styles.innerCardDeskop}>
                <span className={props.isMobile ? styles.cardContentMobile : styles.cardContentDesktop}>
                    test
                </span>
                <Image style={{background: 'white', borderRadius: '10%', margin: 'auto'}}
                                src={img_bee2}
                                width={imageSize}
                                height={'auto'}
                                alt='insta-mark'
                /> 
            </div>
      </Card>
    )
}
