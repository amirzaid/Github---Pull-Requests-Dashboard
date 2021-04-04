import React from 'react'
import { Badge } from 'react-bootstrap'

export default function Label({ label }) {
    // Label coloring
    const labelStyle = {
        backgroundColor: `#${label.color}`
    }
    return (
        <Badge className='mb-2 mx-1'
            style={labelStyle}
            data-toggle="tooltip" data-placement="top" title={label.description}>
            {label.name}
        </Badge>
    )
}
