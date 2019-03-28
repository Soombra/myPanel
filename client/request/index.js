import axios from 'axios'

const request = axios
request.interceptors.response.use(res => {
  return res
}, err => {
  if(err.response.status === 403) {
    location.href = '/login'
  }
})
export default request
