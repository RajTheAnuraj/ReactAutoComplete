import React from "react";
import { Line } from 'react-chartjs-2'
import {ColorHelper} from '../helpers/colorhelper';

const colorHelper = new ColorHelper();

export default function ChartTest(){
   
    var data= {
            labels: ['12:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
            datasets: [{
                label: '# of Votes',
                backgroundColor:colorHelper.GetColorArray(1,1),
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
            },
            {
                label: 'Qty',
                backgroundColor:colorHelper.GetColorArray(1,2),
                data: [1, 8, 4, 6, 4, 1],
                borderWidth: 1
            }
        ]
        };
        var options ={
            maintainAspectRatio:false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
    

    return (<div style={{width:400}}>
        <Line 
            data={data}
            height={400}
            options={options}
        />
    </div>);
}