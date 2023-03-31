export const TASKS_FETCH_ADD = 'TASKS_FETCH_ADD';
export const TASKS_FETCH_CANCEL = 'TASKS_FETCH_CANCEL';
export const TASKS_FETCH_FULFILLED = 'TASKS_FETCH_FULFILLED';
export const TASKS_FETCH_REJECTED = 'TASKS_FETCH_REJECTED';
export const TASKS_FETCH_EDIT = 'TASKS_FETCH_EDIT';
export const TASKS_FETCH_TOGGLED = 'TASKS_FETCH_TOGGLED';
export const TASKS_FETCH_SEEALL = 'TASKS_FETCH_SEEALL';
export const VISUALIZZA_TUTTO='VISUALIZZA_TUTTO';

export const actionTypes = {
    TASKS_FETCH_ADD,
    TASKS_FETCH_CANCEL,
    TASKS_FETCH_FULFILLED,
    TASKS_FETCH_REJECTED,
    TASKS_FETCH_EDIT,
    TASKS_FETCH_TOGGLED,
    TASKS_FETCH_SEEALL,
    
    VISUALIZZA_TUTTO
  };

  
// action creators
export const tasksFetchAdd = (id,text) => ({
    type: TASKS_FETCH_ADD,
    text,
    id
  });
  export const tasksFetchCancel = (id) => (
    {
      type: TASKS_FETCH_CANCEL,
      id
    }
  );
  export const tasksFetchFulfilled = (data,lastUpdate) => ({
    type: TASKS_FETCH_FULFILLED,
    data,
    lastUpdate
  });
  export const tasksFetchRejected = err => ({
    type: TASKS_FETCH_REJECTED,
    err,
    error: true
  });
  export const tasksFetchEdit = (id,newName) => ({
    type: TASKS_FETCH_EDIT,
    name:newName,
    id
  });
  export const tasksFetchToggle = (id) => ({
    type: TASKS_FETCH_TOGGLED,
   id
  });
  export const tasksFetchSeeAll = () => ({
    type: TASKS_FETCH_SEEALL   
  });
    export const visualizzaTutto=()=>({
    type:VISUALIZZA_TUTTO
    });
  
  
  export const actions = {
    tasksFetchAdd,
    tasksFetchCancel,
    tasksFetchFulfilled,
    tasksFetchRejected,
    tasksFetchEdit,
    tasksFetchToggle,
    tasksFetchSeeAll,
    visualizzaTutto
  };