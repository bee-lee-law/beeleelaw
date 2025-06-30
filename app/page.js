'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Wrapper from "./components/ui/Wrapper";
import checkMobile from "./components/tools/checkMobile";
import Card from "./components/ui/Card";
import selfie from '/public/pics/bee4-alt.jpg';


const pageTitle = "Home";
const imageSize = '200';

const pageDescription = [
  <>
    This entry point to the web page is the first thing I started working on, and the work here serves as a blueprint for future pages.
    This page is built with React, and my goal was to build simple, intuitive components to be re-used, giving the project some visual cohesion.
  </>,
  <>
    The first component is the "Wrapper", which organizes UI elements around the main body of the page. These sub-elements include the header and footer, and the left and right menus.
    The second main component is the "Card". The card has options to be minimized, and also include a header and header description. Cards can be organized in a grid on the main body of the page,
    and provide some neat visual organization.
  </>
]



export default function Home() {
  var isMobile = checkMobile();
  return (
    <Wrapper isMobile={isMobile} pageTitle={pageTitle} pageDescription={pageDescription}>
      {/*isMobile ? <a>isMobile {window.innerWidth}</a> : <a>not mobile {window.innerWidth}</a>*/}
      <main className={styles.main}>
        <Card style={{width: '80vw'}} minimizeable={false}>
          <div className={isMobile ? styles.innerCardMobile : styles.innerCardDeskop}>
          <Image style={{background: 'white', borderRadius: '10%', margin: 'auto'}}
                            src={selfie}
                            width={imageSize}
                            height={'auto'}
                            alt='insta-mark'
          /> 
          <span className={isMobile ? styles.cardContentMobile : styles.cardContentDesktop}>
            My name is Brandon Lawrence; welcome to the home page of my showcase project. You can find the repository for the page in the github link at the bottom, as well as links to my LinkedIn and Instagram.
            The hamburger icon in the top left of the page will open a navigation menu, while the help icon in the top right will show a brief description of the page, including the tools used to build it.
            The intent of this project is to provide information about myself and host a kind of portfolio. My goals include:
            <ul>
              <li>Show off who I am</li>
              <li>Showcase front-end development and React skills by creating a web-app that looks visually cohesive on mobile and desktop</li>
              <li>Utilize Amazon Web Services to get hands-on practice with the cloud while studying for AWS certifications</li>
              <li>Use my data and development skills to create some interactive tools</li>
              <li>Host my personal projects</li>
            </ul>
          </span>

          </div>
        </Card>
      </main>
    </Wrapper>
  );
}
