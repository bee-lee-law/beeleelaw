'use client'
import Image from "next/image";
import styles from "../page.module.css";
import Wrapper from "../components/ui/Wrapper";
import checkMobile from "../components/tools/checkMobile";
import Card from "../components/ui/Card";
import AdvTable from "../components/ui/AdvTable";
import { useState, useEffect } from "react";

const testTable = [
    {
        "PID": 1234,
        "name": "reggy",
        "count": 2
    },
    {
        "PID": 2345,
        "name": "dim",
        "count": 6
    },
    {
        "PID": 1235,
        "name": "val",
        "count": 1
    }
]

const sampleData = [
  {
      "id": 12345,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "zip": "12345"
      },
      "hobbies": ["reading", "hiking"],
      "date": "7/1/2025"
  },
  {
      "id": 2342,
      "name": "Razzle Bin",
      "address": {
      "street": "28 Crosbin",
      "city": "Rislow",
      "zip": "42442",
      "state": "MI"
      },
      "date": "1/12/2025"
  },
  {
      "id": 78966,
      "name": "Fintelin Robrinsla",
      "date": "4/24/2024"
  },
  {
      "id": 5454,
      "name": "Gabe",
      "date": "3/3/2024"
  },
  {
      "id": 1221,
      "name": "Tinlow Freker",
      "date": "4/6/2023"
  },
  {
      "id": 3311,
      "name": "Mick Mock",
      "date": "1/1/2024"
  },
  {
      "id": 2588,
      "name": "Bornin Valley",
      "date": "4/24/2024"
  },
  {
      "id": 1212,
      "name": "Dupe Checker",
      "date": "4/24/2024"
  },
  {
      "id": 1212,
      "name": "Dupe Checker",
      "date": "4/24/2024"
  },
  {
      "id": 22421,
      "name": "Table Checker",
      "date": "4/24/2024",
          "Test Table": testTable
  }
]

const maxTextLength = 1000000;

const pageTitle = "JSON Table";


const pageDescription = [
  <>
    A JSON table is something I've constructed in React many times, so I knew many of the challenges
    going in. Simply displaying a table is easy enough, but when you want to implement features like
    sorting and filtering, things can get tricky, and the customizaiton options can be endless. This is
    why it's important to go into a project with a well defined scope.
  </>,
  <>
    My scope was simple enough. I wanted to filter, sort and paginate. Filtering and sorting accept
    one parameter per column (No sorting by multiple columns, and no multi-filters like greater than X
    AND not equal to Y OR not null). Still, even simple sorting requires some kind of data type defintions.
  </>,
  <>
    The data types I went with are: strings, numbers, dates, and tables. I thought tables would be
    a fun data type to flex some recursion. I've also done this in the past when displaying itemized
    invoices in a React table. For some more recursion flexing, the data type detection function is
    itself recursive.
  </>,
  <>
    The data type detection function may be slow when iterating over every single row and column of data
    when presented with a large data set. To offset this, I set up a system that, when the data count
    is above a certian constant, takes a random sample of the data to iterate through. This system isn't
    perfect, but it's also one of the major difficulties when designing and integrating tables and data,
    and there will never be a perfect solution.
  </>,
  <>
    Will this table work for you? In some capacity, yes. But in my experience, there will always be
    feature requests for further customization. For example, if you wanted to display invoice data,
    you'd want dollar amounts to be represented with a symbol (such as "$"), and trailing zeroes. Imagine
    the challenges this might present: you will definitely need to create a new "data type" (currency),
    and you may need to supply the table with a predefined schema. Not a bad solution! But my scope
    was to simply display any kind of JSON data into a basic table.
  </>,
]



export default function Home() {
  var isMobile = checkMobile();
  const [data, setData] = useState();
  const [text, setText] = useState();
  const [error, setError] = useState();
  const [toRoll, setToRoll] = useState(false);
  const body1 = `JSON (JavaScript Object Notation) is by far the most common data format when communicating
                information through the internet. JSON data appears as a list or array of key value pairs:
                [{key1: value1, key2: value2}, {key1: value3, key2: value4}, {key3: value5} ...]. In a 
                well-structured database, every item in the list would have the same keys. This would be
                commom when using an API to query a relational database. However, in some data storage
                formats, such as NoSQL (which you'll find with MongoDB), there is no such requirement
                when it comes to keys.`;
  const body2 = `In this table component, we can input SQL or NoSQL JSON data and get a multi-featured
                table. The features include: pagination, filtering, and sorting. Data type detection is also
                used to aid in filtering and sorting. Another feature allows recursive tables: if data type
                detection detects a JSON list, it'll attempt to output a table inside the cell.`;
  const body3 = `Copy/paste your own JSON data (with some limitations) to try it out yourself, or use my own
                sample data. When using custom data, keys must be surrounded by double quotes. Use the GitHub link at the bottom of the page if you want to take a look under
                the hood or workshop some ideas.`;
  const handleTextChange = (e) => {
    setText(e.target.value);
    if(error){setError(null);}
  }

  const handleSample = (e) => {
    e.preventDefault();
    setData([]);
    setToRoll("sample")
  }
  const defaultData = () => {
    setData(sampleData);
    setError(null);
  }

  const handleClear = (e) => {
    e.preventDefault();
    setData([]);
    setToRoll("clear");
  }
  const clearData = () => {
    setData([]);
    setError(null);
  }

  const handleCustom = (e) => {
    e.preventDefault();
    setData([]);
    setToRoll("custom");
  }
  const customData = () => {
    let d = [];
    if(text.length > maxTextLength){
      setError(`Custom text over character limit (${maxTextLength})`)
      return;
    }
    try{
      d = JSON.parse(text);
    }catch(e){
      setError("Invalid JSON");
      return;
    }
    setData(d);
    setError(null);
  }
  useEffect( () => {
      if(toRoll == "custom"){
        customData();
      }
      else if(toRoll == "sample"){
        defaultData();
      }
      else if(toRoll == "clear"){
        clearData();
      }
      setToRoll(false);
  }, [toRoll]); 
  return (
    <Wrapper isMobile={isMobile} pageTitle={pageTitle} pageDescription={pageDescription}>
      <main className={styles.main}>
        <Card style={{width: '80vw'}}>
            <div className={isMobile ? styles.innerCardMobile : styles.innerCardDeskop}>
                <span className={isMobile ? styles.cardContentMobile : styles.cardContentDesktop}>
                    <div>{body1}</div>
                    <br/>
                    <div>{body2}</div>
                    <br/>
                    <div>{body3}</div>
                </span>
                <textarea onChange={handleTextChange} value={text} style={{width: '80%', height: 'auto', background: '#dddddd'}} />
            </div>
            <br/>
            <div style={{display: 'flex', flexFlow: 'row', justifyContent: 'space-around'}}>
              <button onClick={handleSample}>Sample Data</button>
              <button onClick={handleClear}>Clear Table</button>
              <button onClick={handleCustom}>Custom Data</button>
            </div>
            {
              error ?
              <ErrorMessage message={error} />
              :
              <></>
            }
        </Card>
        {data && data.length > 0 ?
          <TableCard data={data} isMobile={isMobile} />
          :
          <></>
        }
      </main>
    </Wrapper>
  );
}

function TableCard(props){
  return(
    <Card style={{width: '80vw', height: 'auto', overflow: 'visible', overflowX: props.isMobile ? 'scroll' : ''}}>
        <AdvTable data={props.data} pagination={true} />
    </Card>
  )
}

function ErrorMessage(props){
  return(
    <div style={{textAlign: 'center', color: 'red'}}>{props.message}</div>
  )
}
