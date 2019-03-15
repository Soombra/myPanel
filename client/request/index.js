import axios from 'axios'

const request = axios
request.interceptors.response.use(res => {
  console.log('拦截器', res)
  return res
}, err => {
  console.log('错误处理', err.response)
  if(err.response.status === 403) {
    location.href = '/login'
  }
})
export default request
