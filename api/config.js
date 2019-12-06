import axios from 'axios'
import qs from 'qs' //需开发环境安装 cnpm install --save qs
import main from '@/main.js'
// import router from '../router'
axios.defaults.withCredentials = true

// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'http://192.168.2.108/'
} else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV == 'production') {
  //  axios.defaults.baseURL = 'http://test.360xkw.com/yunmanager/manager/'
}

/** * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, qs.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function upload(url, params) {
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function down(url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      params: params,
      responseType: 'blob',
    }).then(res => {
      resolve(res.data)
    })
    .catch(err =>{
      reject(err.data)
    })
  })

}

/* //添加请求拦截器 axios官网有*/
axios.interceptors.request.use(
  function(config) {
    // let token = localStorage.getItem('mytoken')
    // if (token) {
    //     config.headers['Authorization'] = token
    // }
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
// axios.interceptors.response.use(
//   response => {
//     // console.log(response)
//     if (response.config.url.indexOf('upload') !== -1) {
//       main.$store.commit('set_hasUpload', '')
//     } else if (
//       response.config.url.indexOf('getYunUserInfo.do') !== -1 &&
//       response.data == ''
//     ) {
//       router.replace({
//         path: '/login'
//       })
//     }
//     if (response.data.S == 1001) {
//       router.replace({
//         path: '/login'
//       })
//     }
//     return response
//   },
//   error => {
//     // Do something with response error
//     return Promise.reject(error)
//   }
// )
