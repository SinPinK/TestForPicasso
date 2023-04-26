import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import React, {useState, useEffect} from 'react'

function App() {
    const [testValue, setTestValue] = useState([])

    /*const loadButton = (event) => {
        event.preventDefault()
        axios({
            method: 'GET',
            url: window.location.origin+'/api/test/',
            //data: JSON.stringify(todj)
            //data: todj
        }).then(response => {
            setTestValue(JSON.parse(response.data))
        }).catch(error => {
            console.log(error)
            setTestValue('no.')
        })
    }*/

    useEffect(() => {
        axios({
            method: 'GET',
            url: window.location.origin+'/api/test/',
        }).then(response => {
            setTestValue(JSON.parse(response.data))
        }).catch(error => {
            console.log(error)
            setTestValue('no.')
        })
    }, [])


  return (
    <div className="App">
      <header className="App-header">
        <p>
            {testValue}
        </p>
      </header>
    </div>
  );
}

export default App;
