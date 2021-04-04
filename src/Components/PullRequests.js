import '../Styling/PullRequest.css'
import React, { useState } from 'react'
import { Card, Button, Collapse, Badge } from 'react-bootstrap'
import ReactMarkdown from "react-markdown"
import Label from './Label'
import uniqid from 'uniqid'

export default function PullRequests({ pr }) {
    const [open, setOpen] = useState(false) // show or hide description

    // convert timestamp to date
    const getDate = (date) => {
        const pr_date = new Date(date)
        return pr_date.toDateString()
    }

    return (
        <div className='pull-request'>
            < Card key={pr.id} className='mb-3' >
                <Card.Body className='d-flex justify-content-between'>
                    <div>
                        <Card.Title>
                            {pr.title}
                        </Card.Title>
                        <Card.Subtitle className='mb-3'>
                            #{pr.number}
                        </Card.Subtitle>
                        <div style={{ wordBreak: 'break-all' }}>
                            Created on:
                            <ReactMarkdown children={getDate(pr.created_at)} allowDangerousHtml={true}></ReactMarkdown>
                        </div>
                        <Badge className='bg-secondary mb-2 mx-1'>{pr.state}</Badge>
                        {
                            pr.labels.map(label => <Label key={uniqid} label={label} />)
                        }
                        <Card.Text>
                            <Button variant="primary" onClick={() => setOpen(!open)}>{open ? 'Hide' : 'Show'} Description</Button>
                            <Collapse in={open}>
                                <div className='mt-3'>
                                    <ReactMarkdown children={pr.body} allowDangerousHtml={true} />
                                </div>
                            </Collapse>
                        </Card.Text>
                    </div>
                    <div className='d-flex'>
                        <span className='px-3 mt-2'>{pr.user.login}</span>
                        <img className='d-none d-md-block' height='50' src={pr.user.avatar_url}></img>
                    </div>
                </Card.Body>
            </Card >
        </div >
    )
}
