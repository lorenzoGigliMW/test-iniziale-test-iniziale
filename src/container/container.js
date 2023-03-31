import { connect } from 'react-redux';
import { tasksFetchEdit, tasksFetchSeeAll, tasksFetchToggle, tasksFetchAdd, tasksFetchCancel, tasksFetchFulfilled, tasksFetchRejected, visualizzaTutto } from "../redux/actions/todos";
import App from "../App";


const mapStateToProps = (state) => {
  return {
    tasks: state.todos.tasks,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
    // onTodoClick: (id, name) => {
     

    //   dispatch(tasksFetchFulfilled());
    //   dispatch(tasksFetchRejected());

    //   //GET      
    //   dispatch(visualizzaTutto());
    //   //POST
    //   dispatch(tasksFetchCancel(id));
    //   dispatch(tasksFetchToggle(id));
    //   dispatch(tasksFetchAdd(name));
    //   dispatch(tasksFetchEdit(id, name));
    //   dispatch(tasksFetchSeeAll());

      //visualizzaTutto:()=>({type:'VISUALIZZA_TUTTO'})
      // tasksFetchCancel:()=>dispatch({type:'TASKS_FETCH_CANCEL'});
      // tasksFetchToggle:()=>dispatch({type:'TASKS_FETCH_TOGGLE'});
      // tasksFetchAdd:()=>dispatch({type:'TASKS_FETCH_ADD'});
      // tasksFetchEdit:()=>dispatch({type:'TASKS_FETCH_EDIT'});
      // tasksFetchSeeAll:()=>dispatch({type:'TASKS_FETCH_SEEALL'});
  //   }
  // };

  const mapDispatchToProps = {

    visualizzaTutto,
    tasksFetchFulfilled,
    tasksFetchRejected,

    tasksFetchEdit, 
    tasksFetchSeeAll, 
    tasksFetchToggle,
    tasksFetchAdd,
    tasksFetchCancel,

  };

export default connect(mapStateToProps, mapDispatchToProps)(App);