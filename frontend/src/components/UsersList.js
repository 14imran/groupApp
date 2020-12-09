import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import { Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

export default function UsersList() {
  const [users, setUsers] = useState([])
  const [pickedData, setPickedData] = useState(null)
  const [formData, setFormData] = useState()
  const [checked, setChecked] = React.useState(false)

  useEffect(() => {
    axios
      .get(
        'https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json'
      )
      .then((res) => {
        setUsers(res.data)
      })
  }, [])

  const onPick = (user) => {
    setChecked(true)
    setPickedData(user)
  }
  const handleForm = (event) => {
    event.preventDefault()
    const { name, description } = event.target
    setFormData(name.value, description.value)
  }

  return (
    <>
      <div>
        <h1>Create Group</h1>
      </div>
      <form onSubmit={handleForm}>
        <p>Enter group name:</p>
        <input type='text' name='name' />
        <p>Enter description:</p>
        <input type='text' name='description' />
        <div>
          <Button style={{ marginTop: '20px' }} type='submit'>
            Create
          </Button>
        </div>
      </form>
      {users.map((user) => (
        <Card
          bg='info'
          style={{
            width: '10rem',
            marginLeft: '50px',
            float: 'left',
            // display: 'flex',
            // flexDirection: 'column',
            marginTop: '10px',
          }}
        >
          <div style={checked ? { backgroundColor: 'black' } : null}>
            <div
              key={user.id}
              onClick={() => {
                onPick(user)
              }}
            >
              <Card.Img src={user.Image} style={{ width: '150px' }} />
              <Card.Title block>{user.name}</Card.Title>
            </div>
          </div>
        </Card>
      ))}
    </>
  )
}
