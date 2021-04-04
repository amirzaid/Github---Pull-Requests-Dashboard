import './Styling/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react'
import DataCard from './Components/DataCard'
import Table from './Components/Table';
import { Spinner, Alert } from 'react-bootstrap'
import * as  Icon from 'react-bootstrap-icons'
import useFetchPR from './Components/useFetchPR'
import PullRequests from './Components/PullRequests';
import '@fortawesome/fontawesome-free/js/all.js';

function App() {
  const [sortManner, SetSortManner] = useState('pr-number') // sort by field
  const { prs, loading, error } = useFetchPR(sortManner); // fetch data hook
  const stateList = ['open', 'closed', 'draft'] // possible states list
  const [prState, SetPrState] = useState(['open', 'closed', 'draft']); // states to display
  const [labelsList, SetLabelsList] = useState([]); // possible labels list
  const [currLabelsList, SetCurrLabelsList] = useState([]); // states to display
  const [currPR, SetCurrPR] = useState(null) // pull reuqest to display

  useEffect(() => {
    // get unique state list
    var pr_labels = [...new Set(prs.map(pr => pr.labels.map(label => label.name)))] // create an array of each pr's labels
    var curr_label_list = [] // temporary array to save labels
    pr_labels.forEach(pr => curr_label_list = [].concat(curr_label_list, pr)) // extract 2d arrays into a single array
    curr_label_list = [...new Set(curr_label_list)] // remove duplicates
    SetLabelsList(curr_label_list); // save labels list
    SetCurrLabelsList(curr_label_list); // initialize to display on labels
  }, [prs])

  return (
    <div className="App">
      <div className='grid-container'>
        <header>
          <p>{new Date().toDateString()}</p>
          <h2>Pull Requests</h2>
        </header>

        {!!prs.length &&
          <Table prs={prs} SetCurrPR={SetCurrPR} SetSortManner={SetSortManner}
            prState={prState} SetPrState={SetPrState} stateList={stateList}
            currLabelsList={currLabelsList} SetCurrLabelsList={SetCurrLabelsList} labelsList={labelsList} />}
        {
          !!loading && <Spinner className='mb-3 mt-2' animation='border' role='status'>
          </Spinner>
        }
        {
          !!error && <Alert variant="danger">
            <Alert.Heading className='ms-2 align-middle'>
              <Icon.ExclamationTriangle />
              <span className='ms-2 align-middle'>
                Oh snap! You got an error!
          </span>
            </Alert.Heading>
            <span>Try refreshing.</span>
          </Alert>
        }
        {!!currPR &&
          < PullRequests pr={currPR} ></PullRequests>
        }
        {!!prs.length &&
          <DataCard className='doughnut' chart_type='doughnut'
            data={[prs.filter(pr => pr.state === 'open').length,
            prs.filter(pr => pr.state === 'closed').length,
            prs.filter(pr => pr.state === 'draft').length]}
          />
        }
      </div>
    </div >
  );
}

export default App;
