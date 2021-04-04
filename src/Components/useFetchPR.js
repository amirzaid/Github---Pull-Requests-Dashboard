import { useEffect, useReducer } from 'react'

// actions
const ACTIONS = {
    REQUEST_DATA: 'request-data',
    GET_DATA: 'get-data',
    ERROR: 'error',
    SORT_DATA: 'sort-data'
}

// sorting manners
const SORT = {
    NUMBER: 'pr-number',
    R_NUMBER: 'r-pr-number',
    TITLE: 'pr-title',
    R_TITLE: 'r-pr-title'
}

// sort pull request by number - descending
function sort_by_number(pr1, pr2) {
    if (pr1.number < pr2.number) return -1
    if (pr1.number > pr2.number) return 1
    return 0
}
// sort pull request by number - ascending
function reverse_sort_by_number(pr1, pr2) {
    if (pr1.number < pr2.number) return 1
    if (pr1.number > pr2.number) return -1
    return 0
}
// sort pull request by title - descending
function sort_by_title(pr1, pr2) {
    if (pr1.title.toLowerCase() < pr2.title.toLowerCase()) return -1
    if (pr1.title.toLowerCase() > pr2.title.toLowerCase()) return 1
    return 0
}
// sort pull request by title - ascending
function reverse_sort_by_title(pr1, pr2) {
    if (pr1.title.toLowerCase() < pr2.title.toLowerCase()) return 1
    if (pr1.title.toLowerCase() > pr2.title.toLowerCase()) return -1
    return 0
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.REQUEST_DATA:
            return { prs: [], loading: true }

        case ACTIONS.GET_DATA:
            {
                let prs = action.payload.prs
                return { ...state, prs: prs, loading: false }
            }

        case ACTIONS.ERROR:
            return { ...state, prs: [], loading: false, error: action.payload.error }

        case ACTIONS.SORT_DATA:
            {
                switch (action.payload.sortManner) {
                    case SORT.NUMBER:
                        return { ...state, prs: state.prs.sort(sort_by_number) }
                    case SORT.TITLE:
                        return { ...state, prs: state.prs.sort(sort_by_title) }
                    case SORT.R_NUMBER:
                        return { ...state, prs: state.prs.sort(reverse_sort_by_number) }
                    case SORT.R_TITLE:
                        return { ...state, prs: state.prs.sort(reverse_sort_by_title) }
                }
            }
        default:
            return state
    }
}

export default function useFetchPR(sortManner) {
    const [state, dispatch] = useReducer(reducer, { prs: [], loading: false })

    useEffect(() => {
        dispatch({ type: ACTIONS.REQUEST_DATA }) // initialize prs array and set loading to true
        fetch('http://localhost:3000/api/vcs/prs')
            .then(res => res.json())
            .then(data => {
                // save fetched data and set loading to false
                return dispatch({ type: ACTIONS.GET_DATA, payload: { prs: data } })
            })
            .catch(e => {
                // error handling
                dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
            })

        return
    }, [])

    useEffect(() => {
        // sort pull request by given sorting manner
        dispatch({ type: ACTIONS.SORT_DATA, payload: { sortManner: sortManner } })
    }, [sortManner])

    return state
}