import React from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import uniqid from 'uniqid'

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        style={{ color: '#888!important' }}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {/* Render custom icon here */}
        <i className="fas fa-filter"></i>
        {children}
    </a>
));

export default function FilterDropdown({ filter, prState, SetPrState, stateList, currLabelsList, SetCurrLabelsList, labelsList }) {

    // add or remove all states from current states list
    const select_all_states = (target) => {
        const checkboxes = target.parentElement.parentElement.parentElement.getElementsByTagName('input')
        if (target.checked) {
            Array.from(checkboxes).map(checkbox => checkbox.checked = true)
            SetPrState(stateList)
        }
        else {
            Array.from(checkboxes).map(checkbox => checkbox.checked = false)
            SetPrState([])
        }
    }

    // add or remove selected state from current state list
    const toggle_state = (target) => {
        const state = target.value // selected state
        const idx = prState.indexOf(state) // get state inedx in stateList
        const newPrState = [...prState]
        if (target.checked) newPrState.push(state) // if checked add to showed state list
        else newPrState.splice(idx, 1) // else remove from showed state list
        SetPrState(newPrState)
    }

    // add or remove all labels from current labels list
    const select_all_labels = (target) => {
        const checkboxes = target.parentElement.parentElement.parentElement.getElementsByTagName('input')
        if (target.checked) {
            Array.from(checkboxes).map(checkbox => checkbox.checked = true)
            SetCurrLabelsList(labelsList)
        }
        else {
            Array.from(checkboxes).map(checkbox => checkbox.checked = false)
            SetCurrLabelsList([])
        }
    }

    // add or remove selected state from current label list
    const toggle_label = (target) => {
        const label = target.value // selected state
        const idx = currLabelsList.indexOf(label) // get state inedx in stateList
        const newLabelList = [...currLabelsList]
        if (target.checked) newLabelList.push(label) // if checked add to showed state list
        else newLabelList.splice(idx, 1) // else remove from showed state list
        SetCurrLabelsList(newLabelList)
    }
    return (
        <Dropdown style={{ display: 'contents' }}>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            </Dropdown.Toggle>

            {filter === 'state' && <Dropdown.Menu>
                <p className='px-2'><Form.Check type="checkbox" label='select all' value='select all' defaultChecked='true' onChange={(e) => select_all_states(e.target)} /></p>
                <p className='px-2'><Form.Check type="checkbox" label='open' value='open' defaultChecked='true' onChange={(e) => toggle_state(e.target)} /></p>
                <p className='px-2'><Form.Check type="checkbox" label='closed' value='closed' defaultChecked='true' onChange={(e) => toggle_state(e.target)} /></p>
                <p className='px-2 my-0'><Form.Check type="checkbox" label='draft' value='draft' defaultChecked='true' onChange={(e) => toggle_state(e.target)} /></p>
            </Dropdown.Menu>}
            {filter === 'label' && <Dropdown.Menu>
                <p className='px-2'><Form.Check type="checkbox" label='select all' value='select all' defaultChecked='true' onChange={(e) => select_all_labels(e.target)} /></p>
                {labelsList.map(label => (
                    <p className='px-2'><Form.Check type="checkbox" label={label} value={label} defaultChecked='true' onChange={(e) => toggle_label(e.target)} /></p>
                ))}
            </Dropdown.Menu>}
        </Dropdown >
    )
}