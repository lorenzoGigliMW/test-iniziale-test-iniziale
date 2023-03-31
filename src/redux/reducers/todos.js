import {
    TASKS_FETCH_ADD, TASKS_FETCH_CANCEL, TASKS_FETCH_FULFILLED, TASKS_FETCH_REJECTED, TASKS_FETCH_EDIT, TASKS_FETCH_TOGGLED, TASKS_FETCH_SEEALL, VISUALIZZA_TUTTO
} from '../actions/todos';
//import App from '../../../src/App'
// export const selectors = {       ///////////////////////////////////////////////
//     tasks: state => App.state.tasks,//state,
//     fetchStatus: state => state.fetchStatus
// };
// const tasks=[];
// const task=''
// const completed=false;

const initialState = {
    tasks: [],
    fetchStatus: ''
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case TASKS_FETCH_ADD:          
            return {
                ...state,
                tasks: [...state.tasks, action.task],
                fetchStatus: `todo add`
            };
        case TASKS_FETCH_FULFILLED:
            return {
                ...state,
                tasks: action.data,
                fetchStatus: `Results from ${(new Date()).toLocaleString()}`,
            };
        case TASKS_FETCH_REJECTED:
            return {
                ...state,
                fetchStatus: `errored: reject`
            };
        case TASKS_FETCH_CANCEL:
            return {
                ...state,
                tasks: [...state.tasks].filter((elem) => elem.id !== action.id),
                fetchStatus: 'todo cancelled'
            };
        case TASKS_FETCH_EDIT:
            return {
                ...state,
                tasks: state.tasks.map=(task)=>[  {...task, name:action.newName }].filter((elem) => elem.id === action.id),
               // tasks:state.tasks.map(task => task.id === action.id ? {...task, name: action.newName} : task),
                fetchStatus: `todo edit`
            };
        case TASKS_FETCH_TOGGLED:
            return {
                ...state,
                tasks: state.tasks.map=(task)=>[{...task, completed:!task.completed/*!action.completed*/  }].filter((elem) => elem.id === action.id),
                fetchStatus: `todo toggled`
            };
        case TASKS_FETCH_SEEALL:
            return {
                ...state,
              tasks:[...state.tasks,...{completed: true}],
                fetchStatus: `todo all change completed`            
            };
            case VISUALIZZA_TUTTO:
                return {
                    ...state,
                    fetchStatus: `visualizza` 
                }
        default:
            return state;
    }   
}