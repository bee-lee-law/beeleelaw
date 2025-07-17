'use client'
import styles from "/app/page.module.css"
import { useState, useEffect } from 'react';
import Card from "./Card";

/** AdvTable - A Table for JSON/NoSQL data. Scan data to determine column names and data types. Allow options for filtering(not yet), sorting(not yet), pagination(not yet)
 * @component
 * @param {Array} data - Data to attempt to display in a table
 * @param {boolean} pagination - Allow/deny pagination of data
 * @param {int} pageSize - Page size when pagination is allowed, default 250
*/
export default function AdvTable(props){
    let data = props.data ? props.data.slice() : sampleData.slice();
    const [activeData, setActiveData] = useState(data.slice());
    let schema = dataScan(data);
    let columnList = Object.keys(schema.columns);
    const maxWidth = Math.floor(100/(columnList.length)) + 'vw';
    const [filters, setFilters] = useState({});
    const [toRoll, setToRoll] = useState(false);
    const [sort, setSort] = useState();
    const [page, setPage] = useState(1);
    const pageSize = props.pageSize ? props.pageSize : 250;

    const rollFilters = () => {
        let newData = data.slice();
        let convertData = (datum, type) => {
            //types : date, number, bool, string
            if(type === 'date'){
                return new Date(datum);
            }
            if(type === 'int' || type === 'number'){
                return Number(datum);
            }
            if(datum && type === 'string'){
                return String(datum).toLowerCase();
            }
            return datum ? datum : "";
        }
        for (var col in filters){
            let type = schema.columns[col];
            let filter = filters[col];
            if(!filter){continue;}
            if(filter.op == 'eq'){
                newData = newData.filter((row)=> convertData(row[col], type) === convertData(filter.val, type));
            }
            else if(filter.op == 'neq'){
                newData = newData.filter((row)=> convertData(row[col], type) !== convertData(filter.val, type));
            }
            else if(filter.op == 'like'){
                newData = newData.filter((row)=>convertData(row[col], type).indexOf(convertData(filter.val, type)) != -1);
            }
            else if(filter.op == 'gt'){
                newData = newData.filter((row)=> convertData(row[col], type) > convertData(filter.val, type));
            }
            else if(filter.op == 'gte'){
                newData = newData.filter((row)=> convertData(row[col], type) >= convertData(filter.val, type));
            }
             else if(filter.op == 'lt'){
                newData = newData.filter((row)=> convertData(row[col], type) < convertData(filter.val, type));
            }
            else if(filter.op == 'lte'){
                newData = newData.filter((row)=> convertData(row[col], type) <= convertData(filter.val, type));
            }   
            else{console.log('operator ' + filter.op + ' not found');}     
        }
        return newData;
    }
    const sortData = (col) => {
        let sorter = col;
        let mod = 1;
        if(!col || col == ''){
            return;
        }
        if(sorter[0] == '!'){
            sorter = sorter.substring(1, sorter.length);
            mod = -1;
        }
        setActiveData(activeData.sort((a, b)=>{
            if(a[sorter] < b[sorter] || !b[sorter]){return 1*mod;}
            if(a[sorter] > b[sorter] || !a[sorter]){return -1*mod;}
            return 0;
        }))
    }


    useEffect( () => {
        if(toRoll){
            setActiveData(rollFilters());
            if(sort){
                sortData(sort);
            }
            setToRoll(false);
        }
    }, [toRoll]); 

    if(schema.error){
        return(
            <ErrorMessage error={schema.error} />
        )
    }
    return (
        <>
            <Table schema={schema} columnList={columnList} data={data} activeData={activeData} setActiveData={setActiveData} filters={filters} setFilters={setFilters} setToRoll={setToRoll} sort={sort} setSort={setSort} maxWidth={maxWidth} page={page} pageSize={pageSize} pagination={props.pagination}/>
            {activeData.length > pageSize ? 
            <PageControl activeData={activeData} pagination={props.pagination} page={page} setPage={setPage} pageSize={pageSize} />
            :
            <></>
            }
        </>
    );
};

function Table(props){
    let pageRange = (page, pageSize) => {
    // Output record range based on pagination options
        return {min: (page*pageSize)-pageSize, max: page*pageSize}
    }
    return(
        <table className='advTable' style={{border: '1px solid #333333', width: '99%',}} cellSpacing={0}>
            <thead>
                <tr>
                    {
                        Object.keys(props.schema.columns).map((col, key)=>{
                            let colName = col;
                            let colType = props.schema.columns[colName];
                            return(
                                <HeaderCell colName={colName} colType={colType} key={key} maxWidth={props.maxWidth} data={props.data} activeData={props.activeData} setActiveData={props.setActiveData} filters={props.filters} setFilters={props.setFilters} setToRoll={props.setToRoll} sort={props.sort} setSort={props.setSort} />
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
                    {
                        props.activeData.map((row, key)=>{
                            if(props.pagination){
                                if(key >= pageRange(props.page, props.pageSize).min && key < pageRange(props.page, props.pageSize).max){
                                    return(
                                        <Row schema={props.schema} columnList={props.columnList} row={row} key={key} maxWidth={props.maxWidth} />
                                    )
                                }
                            }
                            else{
                                return(
                                    <Row schema={props.schema} columnList={props.columnList} row={row} key={key} maxWidth={props.maxWidth} />
                                )
                            }
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
        data = <AdvTable data={props.data} pagination={false} />
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
    let handleClick = () => {
        if(props.colType == 'table'){return;}
        if(props.sort == props.colName){
            props.setSort('!' + props.colName);
        }
        else if(props.sort && props.sort == '!' + props.colName){
            props.setSort("");
        }
        else{
            props.setSort(props.colName);
        }
        props.setToRoll(true); 

    }
    return(
        <th className='advTable' style={{maxWidth: props.maxWidth}} >
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
           <span>{props.sort == props.colName ? <>&#10728;</> : props.sort == '!' + props.colName ? <>&#9710;</> : <>&nbsp;</>}</span> <span onClick={handleClick} style={{cursor: 'pointer', userSelect: 'none'}}> {props.colName} </span> <FilterBox colType={props.colType} colName={props.colName} filters={props.filters} setFilters={props.setFilters} setToRoll={props.setToRoll} />
           </div>
        </th>
    )
}

function FilterBox(props){
    const [open, setOpen] = useState(false);
    const [selectOption, setSelectOption] = useState('Equals');
    const [filter, setFilter] = useState({
        op: 'eq',
        val: ""
    })
    let type = props.colType == 'date' ? 'date' : 'text';
    let filterMap = {
        eq: "Equals",
        neq: "Not equal to",
    }
    if(props.colType == 'string'){
        filterMap = {
            ...filterMap,
            like: "Like"
        }
    }
    else{
        filterMap = {
            ...filterMap,
            gt: "Greater than",
            gte: "Greater/equal to",
            lt: "Less than",
            lte: "Less/equal to",
        }

    }
    const handleClick = () => {
        if(props.colType != 'table'){
            setOpen(!open);
        }
    }
    const handleOpChange = (e) => {
        setFilter({
            ...filter,
            op: e.target.value
        })
    }
    const handleChange = (e) => {
        setFilter({
            ...filter,
            val: e.target.value
        })
    }
    const handleSubmit = (e) => {
        if(filter.op && filter.val && filter.val.length > 0){
            props.setFilters({
                ...props.filters,
                [props.colName]: {
                    op: filter.op,
                    val: filter.val
                }
            })
        }
        setOpen(false);
        props.setToRoll(true);
    }
    const handleClear = (e) => {
        props.setFilters({
            ...props.filters,
            [props.colName]: null
        })
        setFilter({
            op: "eq",
            val: ""
        })
        setOpen(false);
        props.setToRoll(true);
    }
    let handleKeyDown = (e) => {
        if(e.key == 'Enter'){
            handleSubmit(e);
        }
        if(e.key == 'Escape'){
            setOpen(false);
        }
    }

    const boxStyle = {
        width: '25%',
        height: 'auto',
        overflow: 'visible',
        background: '#dddddd',
        color: 'black',
        border: '1px solid black',
        position: 'absolute',
        display: 'flex', 
        flexFlow: 'column', 
        paddingTop: '.75em', 
        paddingLeft: '.25em', 
        paddingRight: '.25em', 
        paddingBottom: '.5em', 
        gap: '0.5em'

    };
    const innerBoxStyle = {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
    }
    return(

        <>
            {open ? 
                <div style={boxStyle}>
                    {props.colName}
                    <div style={innerBoxStyle}>
                        <select onChange={handleOpChange} value={filter.op} >
                            {Object.keys(filterMap).map((f, ind)=>{
                            return(
                                <option key={ind} value={f}>{filterMap[f]}</option>
                            )
                            })}
                        </select>
                        <input 
                        style={{width: '65%', height: '100%'}}
                        type={type}
                        onKeyDown={handleKeyDown}
                        onChange={handleChange}
                        value={filter.val}
                        />
                    </div>
                    <div style={innerBoxStyle}>
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={handleClear}>Clear</button>
                        <button onClick={handleClick}>Close</button>
                    </div>
                </div>
            : 
                <span onClick={handleClick} style={{cursor: 'pointer', color: filter.val && filter.val.length > 0 ? 'red' : 'white'}}>{props.colType == 'table' ? <></> : <> &#10983;</>}</span>}
        </>
    )
}

function PageControl(props){
    const pageSize = 5;
    if(!props.pagination){
        return <></>; 
    }
    if(!props.activeData || props.activeData.length == 0){return <></>}
    const pageListLimit = 6;
    let pages = props.activeData.length % pageSize == 0 ? Math.floor(props.activeData.length/pageSize) : (Math.floor(props.activeData.length/pageSize)) + 1;
    let pageList = [...Array(pages).keys()].map(i=>i+1); //Array of numbers representing pages
    let pageRange = (currentPage, limit) => {
        let min = 1;
        let max = limit;
        if(currentPage > limit){
        min = currentPage - Math.floor(limit/2);
        max = currentPage + Math.floor(limit/2) <= pages ? currentPage + Math.floor(limit/2) : pages;
        }
        if(currentPage > pages-limit){
        min = pages-limit > 0 ? pages-limit : 1;
        max = pages;
        }
        return {min: min, max: max};
    }
    let selectPage = (e) => {
        if(e.target.id == 'left'){
        if(props.page > 1){
            props.setPage(Number(props.page) -1)
        }
        }
        else if(e.target.id == 'right'){
        if(props.page < pages){
            props.setPage(Number(props.page) +1)
        }
        }
        else{
        props.setPage(e.target.id);
        }
    }
    return(
        <div style={{display: 'flex', flexFlow: "row nowrap", justifyContent: 'flex-end', gap: '0.5em', userSelect: 'none'}}>
        <div onClick={selectPage} id='left' style={{cursor: 'pointer'}}>{`<`}</div>
        {pageList.map((pageNum, index)=>{
            let range = pageRange(props.page, pageListLimit);
            return(
            <PageSelect key={index} pageNum={pageNum} selectPage={selectPage} show={pageNum >= range.min && pageNum <= range.max} />
            )
        })}
        <div onClick={selectPage} id='right' style={{cursor: 'pointer'}}>{`>`}</div>
        </div>
    )
}

function PageSelect(props){
  if(!props.show){return}
  return(
    <div onClick={props.selectPage} id={props.pageNum} style={{cursor: 'pointer'}} >
      {props.pageNum}
    </div>
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