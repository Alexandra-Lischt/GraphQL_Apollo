import React, { useState } from 'react';

import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

const mutation = gql`
    mutation createTodo($text: String!) {
      createTodo(text: $text){
        id
        text
      }
    }
`

const DELETE_TODO = gql`
mutation deleteTodo($id: ID!) {
  deleteTodo (id: $id ){
    id
    }
}
`
const UPDATE_TODO = gql`
mutation updateTodo($text: String! , $id: ID!) {
  updateTodo (text: $text, id: $id){
    id
    text
    }
}
`
const query = gql`
    query allTodoes {
    allTodoes {
        id
        text
    }
  }
`
function App() {
  const [id, setId] = useState('')
  const [deleteTodo, { loading: deleting }] = useMutation(DELETE_TODO, {
   refetchQueries:["allTodoes"]
  })

  const [updateTodo, { loading: updating }] = useMutation(UPDATE_TODO, {
    refetchQueries:["allTodoes"]
   })

  const remove = () => {
    if (deleting) return;
    deleteTodo({
      variables: { id: id }
    });
  };

  const update = () => {
    if (updating) return;
    updateTodo({
      variables: { todo: upcate }
    });
  };
 

  const [upcate, setUpcate] = useState('')
  const { loading, data } = useQuery(query)
  const [text, setText] = useState('')

  const [createTodo, { error}] = useMutation(mutation, {
    variables: { text }, refetchQueries:["allTodoes"]
  })
  if(error) {
    console.log('error', error)
  }
   if (loading) return <h2>Loading...</h2>
  return (
    <div className="App">
      <input onChange={e=> setText(e.target.value)}/>
      <button onClick={createTodo}>Create Todo</button>

      <button onClick={remove}>Delete Todo</button>

      <input onChange={e=> setUpcate(e.target.value)}/>
      <button onClick={update}>Update Todo</button>

      {
        data.allTodoes.map((todo) => (
          <div key={todo.id}>
            <h2 onClick={() => setId(todo.id)}>{todo.text}</h2>
          </div>
        ))
      }
    </div>
  );
}

export default App;
