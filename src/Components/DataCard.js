import React from 'react'
import { Doughnut } from 'react-chartjs-2'

export default function DataCard({ chart_type, data }) {
    var doughnut_data = {
        labels: ['open', 'closed', 'draft'],
        datasets: [{
            label: ['open', 'closed', 'draft'],
            backgroundColor: ['#86BBD8', '#9EE493'],
            data: data
        }]
    }

    return (
        <div className='Card'>
            <h3>State</h3>
            {chart_type === 'doughnut' && <Doughnut
                data={doughnut_data}
                height={300}
                width={500}
            />}
        </div>
    )
}
