'use client'
import Image from "next/image";
import styles from "../page.module.css";
import Wrapper from "../components/ui/Wrapper";
import checkMobile from "../components/tools/checkMobile";
import Card from "../components/ui/Card";
import img_bee2 from '/public/pics/bee2.jpg';
import img_bee6 from '/public/pics/bee6.jpg';
import work from '/public/icons/work.svg';
import book from '/public/icons/book.svg';


const pageTitle = "Personal Summary";
const imageSizeMain = '350';
const imageSizeAlt = '200';

const pageDescription = [
  <>
    No additional special tools were used here. This page allows me to flex the full use of the React components I built to make a visually pleasing personal summary.
  </>,
]



export default function Home() {
  var isMobile = checkMobile();
  return (
    <Wrapper isMobile={isMobile} pageTitle={pageTitle} pageDescription={pageDescription}>
      <main className={styles.main}>
        <PersonalLife isMobile={isMobile} />
        <Education isMobile={isMobile} />
        <WorkHistory isMobile={isMobile} />
      </main>
    </Wrapper>
  );
}

function PersonalLife(props){
    const headerTitle=`Personal Life`;
    const headerContent=`Want to know if we'd get along? Or how I would fit in your work culture? Let me tell you a little bit about myself`;
    const body1 = `My name is Brandon (my friends call me Bee), and I grew up in the Detroit area. I moved around many times, but most of my time was spent in East Michigan, Tampa FL, Chicago IL, and Grand Rapids MI.
                  After high school, I moved to Tampa with some friends. Here, I worked as a lifeguard while starting community college. After finishing my Associate's degree, I started
                  studying Mathematics at the University of South Florida while discovering my talents as a baker and bakery manager. After a long time spent in Tampa, I moved to Chicago. I was there
                  for less than 1 year before COVID hit and decided to move to Grand Rapids.`;
    const body2 = `Some things that I value are: honesty, vulnerability, empathy, creativity, reliability, and community. I do my best to embody these. Grand Rapids has given me an environment
                  to thrive. I have a solid group of friends and peers, and I actively engage in various clubs, activities, and public events. My main activites right now are Bike Polo and knitting.
                  One recent achievement that I was involved in for bike polo was securing, fundraising, and building new multi-use courts at Highland Park. Our club has a new home to play and host
                  tournaments.`;
    const body3 =`Some of my favorite things are travelling, baking, cycling, coffee, and the French language. I combined all of these loves in one cycling trip around France in 2019 (pictured here).
                  The trip comprised of about 1500 miles around France in about 2 months. I picked up a bicycle for 99 Euros in Nice and started on my journey. I crashed with families, in hostels, or just by
                  camping in a park or the side of a trail. I'd stay for a time in cities visiting museums, getting a taste of local bakeries and coffee ships, and occasionally enjoying the night life.
                  `;
    const body4 = `Outside of the cities, the countryside was breathtaking. I cycled around mountains, pedalled next to the Mediterranean Sea, and spend days riding past miles of grape and olive farms.
                  One of my favorute routes was following the canal from the Mediterranean to the Atlantic. Much of it was a dirt path shared by other cyclists and pedestrians, exhanging friendly greetings
                  while passing by. It was the most memorable time of my life, and I can't wait to visit again.`;
    return(
        <Card style={{width: '80vw'}} minimizeable={true} headerTitle={headerTitle} headerContent={headerContent}>
            <div className={props.isMobile ? styles.innerCardMobile : styles.innerCardDesktop}>
                <Image style={{borderRadius: 'var(--border-radius-lg)', margin: 'auto'}}
                                src={img_bee2}
                                width={imageSizeMain}
                                height={'auto'}
                                alt='Brandon cycling in France'
                /> 
                <span className={props.isMobile ? styles.cardContentMobile : styles.cardContentDesktop}>
                    <p style={{marginBottom: 'var(--spacing-3)', lineHeight: '1.7'}}>{body1}</p>
                    <p style={{marginBottom: 'var(--spacing-3)', lineHeight: '1.7'}}>{body2}</p>
                </span>
            </div>
            <div style={{height: 'var(--spacing-5)'}}></div>
            <div className={props.isMobile ? styles.innerCardMobile : styles.innerCardDesktop}>
                <span className={props.isMobile ? styles.cardContentMobile : styles.cardContentDesktop}>
                    <p style={{marginBottom: 'var(--spacing-3)', lineHeight: '1.7'}}>{body3}</p>
                    <p style={{marginBottom: 'var(--spacing-3)', lineHeight: '1.7'}}>{body4}</p>
                </span>
                <Image style={{borderRadius: 'var(--border-radius-lg)', margin: 'auto'}}
                                src={img_bee6}
                                width={imageSizeMain}
                                height={'auto'}
                                alt='Brandon in France'
                /> 
            </div>
      </Card>
    )
}

function Education(props){
    const headerTitle=`Education`
    const headerContent=`What I know and how I learned it`
    return(
        <Card style={{width: '80vw'}} minimizeable={true} headerTitle={headerTitle} headerContent={headerContent}>
            <div className={props.isMobile ? styles.innerCardMobile : styles.innerCardDesktop}>
                <span className={props.isMobile ? styles.cardContentMobile : styles.cardContentDesktop}>
                    <div style={{display: 'flex', flexFlow: 'row wrap', gap: 'var(--spacing-3)'}}>
                    <Card headerTitle={"Hilssborough Community College"} headerContent={"Associates, Liberal Arts"} style={{width: props.isMobile ? '100%' : 'calc(50% - var(--spacing-2))', flex: '1 1 auto', minWidth: '280px'}}>
                      <p style={{color: 'var(--text-secondary)', marginBottom: 'var(--spacing-2)'}}>
                        August 2011 - May 2013
                      </p>
                      <p style={{lineHeight: '1.7'}}>
                        I studied mostly French and Math. Learning a language is not something I expected to be able to do, but I found great joy in it.
                      </p>
                    </Card>
                    <Card headerTitle={"University of South Florida"} headerContent={"BA, Mathematics"} style={{width: props.isMobile ? '100%' : 'calc(50% - var(--spacing-2))', flex: '1 1 auto', minWidth: '280px'}}>
                      <p style={{color: 'var(--text-secondary)', marginBottom: 'var(--spacing-2)'}}>
                        August 2013 - May 2017
                      </p>
                      <p style={{lineHeight: '1.7'}}>
                        In addition to Math, I also took many software engineering classes, learning core concepts, javascript, Python, SQL, and more.
                      </p>
                    </Card>
                    <Card headerTitle={"Google/Coursera"} headerContent={"Certificate, Data Analytics"} style={{width: props.isMobile ? '100%' : 'calc(50% - var(--spacing-2))', flex: '1 1 auto', minWidth: '280px'}}>
                      <p style={{color: 'var(--text-secondary)', marginBottom: 'var(--spacing-2)'}}>
                        2021
                      </p>
                      <p style={{lineHeight: '1.7'}}>
                        Skills covered in this course include data cleaning, data analysis, SQL, R, and more.
                      </p>
                    </Card>
                    <Card headerTitle={"Amazon"} headerContent={"AWS Certified Cloud Practitioner"} style={{width: props.isMobile ? '100%' : 'calc(50% - var(--spacing-2))', flex: '1 1 auto', minWidth: '280px'}}>
                      <p style={{color: 'var(--text-secondary)', marginBottom: 'var(--spacing-2)'}}>
                        2025 - 2028
                      </p>
                      <p style={{lineHeight: '1.7'}}>
                        Certified as an AWS Cloud Practitioner. More certifications on the way!
                      </p>
                    </Card>
                    </div>
                </span>
                <Image style={{borderRadius: 'var(--border-radius-lg)', margin: 'auto'}}
                                src={book}
                                width={imageSizeAlt}
                                height={'auto'}
                                alt='Education icon'
                /> 
            </div>
      </Card>
    )
}

function WorkHistory(props){
    const headerTitle=`Work History`
    const headerContent=`Some of my more relavent or memorable jobs and what I did there`
    return(
        <Card style={{width: '80vw'}} minimizeable={true} headerTitle={headerTitle} headerContent={headerContent}>
            <div className={props.isMobile ? styles.innerCardMobile : styles.innerCardDesktop}>
            <span className={props.isMobile ? styles.cardContentMobile : styles.cardContentDesktop}>
            <p style={{marginBottom: 'var(--spacing-3)', lineHeight: '1.7'}}>
            Throughout my formal and self-taught education, I ambitiously worked as a full
            time baker, customer support, and as a manager. I developed my professional
            persona with pride in my work and an ability to communicate effectively with my
            team, customers, and stakeholders.
            </p>
            <p style={{marginBottom: 'var(--spacing-2)', lineHeight: '1.7'}}>
            <strong>As an operations analyst and systems developer, I have:</strong>
            </p>
            <ul style={{marginBottom: 'var(--spacing-4)', lineHeight: '1.8'}}>
            <li style={{marginBottom: 'var(--spacing-1)'}}>Automated billing, turning two full-time jobs into just minutes of work</li>
            <li style={{marginBottom: 'var(--spacing-1)'}}>Designed, developed a MSSQL database and node.js API to sync data from warehouse management software</li>
            <li style={{marginBottom: 'var(--spacing-1)'}}>Designed, developed front-end React user interfaces, dashboards</li>
            <li style={{marginBottom: 'var(--spacing-1)'}}>Made various software improvements to increase warehouse productivity</li>
            </ul>
            <hr style={{border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.1)', margin: 'var(--spacing-4) 0'}}/>
            <div style={{display: 'flex', flexFlow: 'row wrap', gap: 'var(--spacing-3)'}}>
              <Card headerTitle={"Sherpack Warehouse and Fulfillment"} headerContent={"Systems Developer"} style={{width: props.isMobile ? '100%' : 'calc(50% - var(--spacing-2))', flex: '1 1 auto', minWidth: '280px'}}>
                <p style={{color: 'var(--text-secondary)', marginBottom: 'var(--spacing-3)'}}>
                  Sept 2021 - June 2025
                </p>
                <p style={{marginBottom: 'var(--spacing-2)', lineHeight: '1.7'}}>Managed integrations between E-Commerce platforms and warehouse management systems.</p>
                <p style={{marginBottom: 'var(--spacing-2)', lineHeight: '1.7'}}>Analyzed workflows and data to identify opportunities for automation and process improvement.</p>
                <p style={{marginBottom: 'var(--spacing-2)', lineHeight: '1.7'}}>Developed full-stack software solutions and dashboards using SQL, JavaScript, and other technologies to support daily business operations.</p>
                <p style={{lineHeight: '1.7'}}>Performed a variety of IT and system administration tasks, contributing to the overall stability and performance of internal systems.</p>
              </Card>
              <Card headerTitle={"Starbucks Reserve Roastery"} headerContent={"Bakery Trainer"} style={{width: props.isMobile ? '100%' : 'calc(50% - var(--spacing-2))', flex: '1 1 auto', minWidth: '280px'}}>
                <p style={{color: 'var(--text-secondary)', marginBottom: 'var(--spacing-3)'}}>
                  Aug 2019 - Mar 2020
                </p>
                <p style={{marginBottom: 'var(--spacing-2)', lineHeight: '1.7'}}>Trained a team of more than 12 bakers in food safety, prep, and technical skills</p>
                <p style={{lineHeight: '1.7'}}>Performed daily operations including food production and customer service</p>
              </Card>
            </div>
            </span> 
            <Image style={{borderRadius: 'var(--border-radius-lg)', margin: 'auto'}}
                                src={work}
                                width={imageSizeAlt}
                                height={'auto'}
                                alt='Work icon'
                /> 
            </div>
      </Card>
    )
}
