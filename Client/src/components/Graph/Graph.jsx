import React from 'react';
import {BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, Legend, Bar} from 'recharts';

import styles from './Graph.module.css'


export default function Graph({data1, data2, data3, name1, name2, name3}){
    const data = [
        {name: name1, data: data1},
        {name: name2, data: data2},
        {name: name3, data: data3}
    ]

    return(
        <ResponsiveContainer width="50%" aspect={2}>
            <BarChart 
            data={data} 
            width={500} 
            height={300}
            margin={{
                top:5,
                right:30,
                left:20,
                bottom:5
            }}
            >
             <CartesianGrid strokeDasharray="4 1 2"/>   
             <XAxis dataKey="name"/>
             {/* <Tooltip/> */}
             {/* <Legend/> */}
             <Bar dataKey='data' fill='#18a0fb'/>
            </BarChart>
        </ResponsiveContainer>
    )
}