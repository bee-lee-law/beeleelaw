'use client'
import styles from "/app/page.module.css"
import { useState } from 'react';
import Card from "./Card";

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


//const sampleData = 'hi';

/** AdvTable - A Table for JSON/NoSQL data. Scan data to determine column names and data types. Allow options for filtering(not yet), sorting(not yet), pagination(not yet)
 * @component
 * @param {Array} data - Data to attempt to display in a table
*/
export default function AdvTable(props){
    let data = props.data ? props.data : sampleData;
    const [activeData, setActiveData] = useState(data.slice());
    let schema = dataScan(data);
    let columnList = Object.keys(schema.columns);
    console.log('col list length: ' + columnList.length)
    const maxWidth = Math.floor(100/(columnList.length)) + 'vw';

    if(schema.error){
        return(
            <ErrorMessage error={schema.error} />
        )
    }
    return (
        <Table schema={schema} columnList={columnList} activeData={activeData} setActiveData={setActiveData} maxWidth={maxWidth} />
    );
};

function Table(props){
    return(
        <table className='advTable' style={{border: '1px solid #333333'}} cellSpacing={0}>
            <thead>
                <tr>
                    {
                        Object.keys(props.schema.columns).map((col, key)=>{
                            let colName = col;
                            let colType = col[colName];
                            console.log(colName + ' ' + colType)
                            return(
                                <HeaderCell colName={colName} colType={colType} key={key} maxWidth={props.maxWidth} />
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
                    {
                        props.activeData.map((row, key)=>{
                            return(
                                <Row schema={props.schema} columnList={props.columnList} row={row} key={key} maxWidth={props.maxWidth} />
                            )
                        })
                    }
            </tbody>
        </table>
    )
}

function Row(props){
    return(
        <tr>
            {
                props.columnList.map((col, key)=>{
                    return(
                        <Cell data={props.row[col] ? props.row[col] : null} key={key} schema={props.schema} col={col} maxWidth={props.maxWidth} />
                    )
                })
            }
        </tr>
    );
}

function Cell(props){
    if(!props.data){
        return(<td style={{maxWidth: props.maxWidth}}></td>)
    }
    let data = props.data;

    if(props.data && props.schema.columns[props.col] == 'table'){
        data = <AdvTable data={props.data} />
    }
    else if(isObject(data)){
        data = JSON.stringify(data);
    }
    else{
        data = String(data);
    }
    return(
        <td style={{maxWidth: props.maxWidth}}>
            {data}
        </td>
    )
}

function HeaderCell(props){

    return(
        <th className='advTable' style={{maxWidth: props.maxWidth}} >
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
           <span>{true ? <>&#10728;</> : <>&#9710;</>}</span> <span style={{cursor: 'pointer'}}> {props.colName} </span> <span style={{cursor: 'pointer'}}>&#10983;</span>
           </div>
        </th>
    )
}

function ErrorMessage(props){
    return(
        <>Error: {props.error}</>
    )
}

/** getRandomSample - Use a Fisher-Yates shuffle and return a sample of a given array
 * @function
 * @param {Array} inData - Datum to analyze
 * @param {int} size - Size of random sample to return
 * @returns {Array} - Random sample of given data
*/
function getRandomSample(inData, size) {
  const length = inData.length;
  const shuffledArray = inData.slice(); 

  for (let i = length - 1; i > length - 1 - size; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]]; 
  }

  return shuffledArray.slice(length - size); 
}

/** isObject - Determine if datum is an object
 * @function
 * @param {any} inDatum - Datum to analyze
 * @returns {boolean} - Returns true if datum is a plain object, ex : {key: value}
*/
function isObject(inDatum){
    return typeof inDatum === 'object' && inDatum !== null && !Array.isArray(inDatum) && Object.prototype.toString.call(inDatum) !== '[object Date]';
}

/** validateTable - Determine if data can be expressed as a table
 * @function
 * @param {Array} inData - Data to validate
 * @returns {Object} - Returns {"error": false} if data can be expressed as a table; else {"error": "reason for error"}
*/
function validateTable(inData){
    if(!Array.isArray(inData)){return {"error": "Input data is not an array."}}

    let objCheck = inData.filter(datum=>!isObject(datum));
    if(objCheck.length > 0){return {"error": "Data has non-object elements"}}

    return {"error": false};
}

/** dataScan - Scan data to determine what the table structure will look like. Idea: Take a random sample for large datasets
 * @function
 * @param {Array} inData - Data to attempt to display in a table
 * @returns {Object} - Schema of the table to be used with given data, include list of columns and data types, and error if necessary. Ex: {"columns": {"name": "type"}, "error": "false", }
*/
function dataScan(inData){
    const maxScan = 10000;
    let out = {"columns": [], "error": false};
    let dataScanError = '';
    let columnObj = {};

    let iterateRows = (inData) => {
        for(let i=0; i<inData.length; i++){
            if(dataScanError){break;}
            let row = sampleData[i];
            try{
                iterateColumns(row);
            }catch(e){
                dataScanError += `Error iterating column row ${i}; ${row}\n${e}\n`
                break;
            }
        }
    }
    let iterateColumns = (inRow) => {
        let columns = Object.keys(inRow);
        for(let i=0; i<columns.length; i++){
            let column = columns[i];
            let data = inRow[column];
            let dataType = columnObj[column] ? columnObj[column] : 'table';
            columnObj[column] = dataTypeCheck(data, dataType);
        }
    }

    let validate = validateTable(inData);
    if(validate.error){return {...out, "error": validate.error}}

    let sampleData = inData.length > maxScan ? getRandomSample(inData) : inData;

    try{
        iterateRows(sampleData);
    }catch(e){
        dataScanError += `Error iterating rows;\n${e}\n`
    }

    if(dataScanError){
        out.error = dataScanError;
        return out;
    }
    console.log(columnObj);

    /*
    let columns = Object.keys(columnObj);
    for(let i=0; i<columns.length; i++){
        let column = String(columns[i]);
        let dataType = columnObj[column];
        let obj = {[column]: dataType}
        out.columns.push(obj);
    }
    */
    out.columns = columnObj;
    return out;
}

/** dataTypeCheck - Check piece of data against a given type. Return an estimated data type. Follow a heirarchy of most to least restrictive data types: table, boolean, int, number, date, string
 *                  Convert non-table arrays and objects to strings.
 * @function
 * @param {any} inDatum - Given element of data to analyze
 * @param {string} datumType - Given predicted data type
 * @returns {string} - Estimated data type
*/
function dataTypeCheck(inDatum, datumType){
    if(datumType === 'string'){return datumType;}
    if(datumType === 'date'){
        try{
            let test = new Date(inDatum);
            if(test instanceof Date && !isNaN(test)){return 'date';}
            else{return 'string'}
        }
        catch(e){
            return 'string';
        }
    }
    if(datumType === 'number'){
        try{
            let check = Number(inDatum);
            if(!Number.isNaN(check)){return 'number';}
            else{return dataTypeCheck(inDatum, 'date')}
            
        }
        catch(e){
            return dataTypeCheck(inDatum, 'date');
        }
    }
    if(datumType === 'int'){
        try{
            let test = Number(inDatum);
            if(Number.isInteger(inDatum)){return 'int';}
            else{return dataTypeCheck(inDatum, 'number');}
        }catch(e){
            return dataTypeCheck(inDatum, 'date');
        }
    }
    if(datumType === 'bool'){
        if(typeof inDatum === 'boolean'){return 'boolean';}
        else{return dataTypeCheck(inDatum, 'int');}
    }
    if(datumType === 'table'){
        if(!validateTable(inDatum).error){return 'table';}
        else if(Array.isArray(inDatum)){return dataTypeCheck(String(inDatum), 'string');}
        else{return dataTypeCheck(inDatum, 'bool');}
    }
}