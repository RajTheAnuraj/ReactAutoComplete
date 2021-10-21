import React, { useState } from "react";
import AutoSuggest  from './AutoSuggest';
import ChartTest from "./ChartTest";

import '../style.css';

export default function App() {
    const [showChart,setShowChart] = useState(false);


const showGraph = () => {
    if(showChart) return <ChartTest/>;
    return (<></>);
}

    const services = ["protobuf", "uploadconfig", "download", "devicedetails", "deviceconfig"];
    const dcs = ["ola", "kcg", "china"];
    const systems = ["analytics", "consul", "prometheus"];
    const timeRanges = ["now","now-1m","now-1h","now-1d","now-1s"];
    const chumma = ["kadal","like","poem","urla","moscow"];

    const commandCollection = {
        "s":services,
        "d":dcs,
        "y":systems,
        "t":timeRanges,
        "c":chumma,
    }

    
    return (<>
    <AutoSuggest OnCommandCompleted={(text)=> setShowChart(val => !val)} commandCollection={commandCollection}/>
    
{showGraph()}
    
    </>);
}