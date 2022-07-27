import "./styles.css"
import { render } from "react-dom"
import React, { useState, useEffect, useCallback } from 'react'
import useFetch, { Provider } from 'use-http'
import { Button, Snowflakes, Input, Loading, Col, Row, Center } from './components'

// See auto-managed state here: https://bit.ly/2RPfkBd

// Managed State
const TodoList = () => {
  const [title, setTitle] = useState('')
  const [todos, setTodos] = useState([])
  const { get, post, response, loading, error } = useFetch({ data: [] })

  const loadInitialTodos = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const initialTodos = await get('/todos')
    if (response.ok) setTodos(initialTodos)
  }, [get, response])

  useEffect(() => { loadInitialTodos() }, [loadInitialTodos]) // componentDidMount

  const addNewTodo = useCallback(async () => {
    if (!title) return // if we don't have a title, we don't want to add a new todo
    // const { ok } = response // BAD, DO NOT DO THIS
    const newTodo = await post('/todos', { title, body: title })
    if (response.ok) {
      setTitle('')
      // add the new todo to the front of the list
      setTodos(todos => [newTodo, ...todos])
    }
  }, [post, response, title])

  return (
    <Snowflakes>
      <Center>
        <h1 style={{ marginBottom: 0 }}>useFetch - Managed State</h1>
        <h3 style={{ margin: 0 }}>use-http</h3>
        <a style={{ margin: '4px 0 12px 0', color: 'blue', fontWeight: 'bold' }} target='_link' href='https://www.youtube.com/watch?v=_-GujYZFCKI&list=PLZIwrWkE9rCdUybd8t3tY-mUMvXkCdenW&index=6'>Video</a>
        <Row>
          <Input
            placeholder='Add todo title 🔥'
            value={title}
            onChange={e => setTitle(e.target.value)}
            right={loading && <Loading />}
          />
          <Button onClick={addNewTodo}>
            {loading ? 'Adding Todo...' : 'Add Todo'}
          </Button>
        </Row>
        <Col>
          {error && 'Error!'}
          {todos.map((todo, i) => <div key={i}>{i + 1}. {todo.title}</div>)}
        </Col>
      </Center>
    </Snowflakes>
  )
}

const App = () => (
  <Provider url='https://jsonplaceholder.typicode.com' options={{ cachePolicy: 'no-cache' }}>
    <TodoList />
  </Provider>
)

render(<App />, document.getElementById("root"))

// REST
// const myUrl = window.location.href + "test.json";
// const chuckUrl = 'https://api.icndb.com/jokes/random/%3FlimitTo=[nerdy]&escape=javascript' // handles POST too
// const githubUrl = 'https://api.github.com/search/repositories?q=use-http'
// const slowUrl = 'https://httpbin.org/delay/3'
// const slowUrl2 = 'https://reqres.in/api/users/1?delay=3'
// const postUrl = 'https://jsonplaceholder.typicode.com/posts' // POST
// const allUrl = 'https://jsonplaceholder.typicode.com/posts/1' // all except POST

// GRAPHQL
// https://github.com/APIs-guru/graphql-apis
