'use client'
import styles from "/app/page.module.css"
import { useState } from 'react';

/*
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
	}
]
*/

const sampleData = 'hi';

/** AdvTable - A Table for JSON/NoSQL data. Scan data to determine column names and data types. Allow options for filtering(not yet), sorting(not yet), pagination(not yet)
 * @component
 * @param {Array} data - Data to attempt to display in a table
*/
export default function AdvTable(props){
    let data = props.data ? props.data : sampleData;
    let schema = dataScan(data);

    if(schema.error){
        return(
            <ErrorMessage error={schema.error} />
        )
    }
    return (
        <Card>
            <Table />
        </Card>
    );
};

function Table(props){
    return(
        <table>
            <thead>

            </thead>
            <tbody>

            </tbody>
        </table>
    )
}

function Row(props){
    return(
        <tr>
        
        </tr>
    );
}

function Cell(props){
    return(
        <td>

        </td>
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

    let validate = validateTable(inData);
    if(validate.error){return {...out, "error": validate.error}}

    let sampleData = inData.length > maxScan ? getRandomSample(inData) : inData;
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
            new Date(inDatum);
            return 'date';
        }
        catch(e){
            return 'string';
        }
    }
    if(datumType === 'number'){
        try{
            let check = Number(inDatum);
            return 'number';
        }
        catch(e){
            return dataTypeCheck(inDatum, 'date');
        }
    }
    if(datumType === 'int'){
        try{
            let test = Number(inDatum);
            if(Number.isInteger(inDatum)){return 'int';}
            else{return test;}
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