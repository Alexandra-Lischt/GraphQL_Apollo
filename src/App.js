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

const query = gql`
    query allTodoes {
    allTodoes {
        id 
        text
    }
  }
`

function App() {
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
      {
        data.allTodoes.map((todo) => (
          <div key={todo.id}>
            <h2>{todo.text}</h2>
          </div>
        ))
      }
    </div>
  );
}

export default App;
