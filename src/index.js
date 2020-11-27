import {createStore} from 'redux'

const form = document.getElementById('js-form')
const input = form.querySelector('input')
const addBtn = document.getElementById('js-addbtn')
const ul = document.getElementById('js-todoList')

const todos = []

const TODO_LS = 'todos' 

const ADD_TODO = 'ADD_TODO'
const DELETE_TODO = 'DELETE_TODO'

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO :
      return [...state, {text : action.text, id : Date.now()}];
    case DELETE_TODO :
      return state.filter(item => item.id !== action.id)
    default :
      return state;
  }
}

//only returns an action : action creator
const addTodoAction = (text) =>{
  store.dispatch({type : ADD_TODO, text })
}

const delTodoAction = (id) => {
  store.dispatch({type : DELETE_TODO, id})
}

const dispatchDeltodo = (e) => { 
  const id = parseInt(e.target.parentNode.id)
  delTodoAction(parseInt(id))
}

const store = createStore(reducer);

function handleFormSubmit(e) {
  e.preventDefault()
  const todoItem = input.value
  addTodoAction(todoItem)
  paintTodos() 
  input.value = ''
}

const paintTodos = () =>{
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(todo => {
    const li = document.createElement('li');
    const delBtn = document.createElement('button')
    delBtn.innerText = 'X'
    li.id = todo.id;
    li.innerText = todo.text
    li.appendChild(delBtn)
    delBtn.addEventListener('click', dispatchDeltodo)
    ul.appendChild(li) 
  } )
  
}

const init = () => {
  addBtn.addEventListener('click', handleFormSubmit)
  input.addEventListener('submit', handleFormSubmit)

  //enables to paint todolist whenever there's a change in state
  // = execute function when there's state chanage
  store.subscribe(paintTodos)
}
init();