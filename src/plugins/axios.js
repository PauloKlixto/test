import axios from 'axios'

const axiosInstance = () => {
  const instance = axios.create({
    headers: { 'Content-Type': 'application/json' },
    baseURL: process.env.VUE_APP_BASE_URL
  })

  instance.interceptors.request.use(
    function(config) {
      return config
    },
    function(error) {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    function(response) {
      const regex = /(document)/gm
      const typeDocument = regex.exec(response.headers['content-type'])

      if (typeDocument) return response.data

      if (response.data.status) {
        return response.data.result
      } else {
        if (response.data.result.validation) {
          return Promise.reject(response.data.result)
        } else {
          return Promise.reject(response.data.result)
        }
      }
    },
    function(error) {
      return Promise.reject(error)
    }
  )

  return instance
}

export default axiosInstance()
