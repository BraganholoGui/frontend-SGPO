import axios from 'axios'

export default axios.create({
  timeout: 30000,
  baseURL: 'http://localhost:300',
  headers: {
    'Content-Type': 'application/json'
  }  
});


