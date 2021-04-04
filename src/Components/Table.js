import React, { useState, useEffect } from 'react'
import Label from './Label';
import FilterDropdown from './FilterDropdown'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styling/Table.css'
import uniqid from 'uniqid'

// Column resize enabling
const columnResizer = () => {
    var thElm;
    var startOffset;

    Array.prototype.forEach.call(
        document.querySelectorAll(".pr-table th"),
        function (th) {
            th.style.position = 'relative';

            var grip = document.createElement('div');
            grip.innerHTML = "&nbsp;";
            grip.style.top = 0;
            grip.style.right = 0;
            grip.style.bottom = 0;
            grip.style.width = '5px';
            grip.style.position = 'absolute';
            grip.style.cursor = 'col-resize';
            grip.addEventListener('mousedown', function (e) {
                thElm = th;
                startOffset = th.offsetWidth - e.pageX;
            });

            th.appendChild(grip);
        });

    document.addEventListener('mousemove', function (e) {
        if (thElm) {
            thElm.style.width = startOffset + e.pageX + 'px';
        }
    });

    document.addEventListener('mouseup', function () {
        thElm = undefined;
    });
}

export default function Table({ prs, SetCurrPR, SetSortManner, prState, currLabelsList, SetPrState, stateList, SetCurrLabelsList, labelsList }) {
    const [numberAsc, SetNumberAsc] = useState(false)
    const [titleAsc, SetTitleAsc] = useState(false)

    // convert timestamp to date
    const getDate = (date) => {
        const pr_date = new Date(date)
        return pr_date.toDateString()
    }

    // select pull request to display
    function getPr(pr) {
        SetCurrPR(pr)
    }

    // sort by number
    function number_sort_handler() {
        const number_sort_btn = document.querySelector('#number_sort_btn')
        if (!numberAsc) {
            SetSortManner('pr-number')
            SetNumberAsc(true)
            number_sort_btn.setAttribute('class', 'fas fa-sort-numeric-up')
        }
        else {
            SetSortManner('r-pr-number')
            SetNumberAsc(false)
            number_sort_btn.setAttribute('class', 'fas fa-sort-numeric-down')
        }
    }

    // sort by title
    function title_sort_handler() {
        const title_sort_btn = document.querySelector('#title_sort_btn')
        if (!titleAsc) {
            SetSortManner('pr-title')
            SetTitleAsc(true)
            title_sort_btn.setAttribute('class', 'fas fa-sort-alpha-up')
        }
        else {
            SetSortManner('r-pr-title')
            SetTitleAsc(false)
            title_sort_btn.setAttribute('class', 'fas fa-sort-alpha-down')
        }
    }

    useEffect(() => {
        columnResizer()
    }, [prs])

    return (
        <div className='Card log'>
            <table className='pr-table'>
                <thead>
                    <tr>
                        <th>Number
                            <span onClick={() => number_sort_handler()}>
                                <i id='number_sort_btn' className="fas fa-sort-numeric-down" style={{ marginLeft: 6, cursor: 'pointer' }}></i>
                            </span>
                        </th>
                        <th>Title
                            <span onClick={() => title_sort_handler()}>
                                <i id='title_sort_btn' className="fas fa-sort-alpha-down" style={{ marginLeft: 6, cursor: 'pointer' }}></i>
                            </span>
                        </th>
                        <th id='state_header'>
                            State
                            <FilterDropdown filter='state' prState={prState} SetPrState={SetPrState} stateList={stateList}
                                currLabelsList={currLabelsList} SetCurrLabelsList={SetCurrLabelsList} labelsList={labelsList}></FilterDropdown>
                        </th>
                        <th id='label_header'>
                            Labels
                            <FilterDropdown filter='label' prState={prState} SetPrState={SetPrState} stateList={stateList}
                                currLabelsList={currLabelsList} SetCurrLabelsList={SetCurrLabelsList} labelsList={labelsList}></FilterDropdown>
                        </th>
                        <th>Created On</th>
                    </tr>
                </thead>
                <tbody>
                    {prs.map(pr => (
                        prState.includes(pr.state) && (pr.labels.map(label => label.name)).some(label => currLabelsList.indexOf(label) >= 0) &&
                        <tr key={uniqid()} onClick={() => getPr(pr)}>
                            < td > {pr.number}</td>
                            <td>{pr.title}</td>
                            <td>{pr.state}</td>
                            <td>
                                {pr.labels.map(label => (
                                    <Label key={uniqid()} label={label} />
                                ))}
                            </td>
                            <td>{getDate(pr.created_at)}</td>
                        </tr>
                    ))}
                </tbody>
            </table >
        </div >
    )
}
