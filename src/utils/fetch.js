import axios from 'axios'
import qs from 'qs'
import router from '../router'
const HOST = 'http://test.api.unart.art-geeks.com.cn/'
// const HOST = 'http://api.unart.art-geeks.com.cn/'
/**
 * [fetch description]
 * @Author   xiao
 * @DateTime 2017-09-27
 * @param    {[string]}   url [description]
 * @param    {[object]}   obj [description]
 * @return   {[promise]}
 */
export default function fetch(url, obj) {
  let headers = { Accept: 'application/vnd.unart.v1+json' }
  localStorage.Token && (headers.Authorization = 'Bearer ' + localStorage.Token)
  localStorage.language === 'en' && (headers['accept-language'] = 'en')
  return new Promise((resolve, reject) => {
    axios({
      method: obj.type ? obj.type : 'post',
      baseURL: HOST,
      url: url,
      // timeout: 5000,
      headers: headers,
      data: obj.data ? qs.stringify(obj.data) : '',
      params: obj.params ? obj.params : ''
    })
      .then(response => {
        if (response.status !== 200) {
        } else {
          if (response.data.code !== 0) {
            obj.error && obj.error(response.data)
          } else {
            obj.success && obj.success(response.data)
          }
          resolve(response)
        }
      })
      .catch(error => {
        console.log(error)
        if ((error.response.status) && error.response.status === 401) {
          localStorage.removeItem('HeadToken')
          localStorage.removeItem('userInfo')
          localStorage.removeItem('Token')
          router.push('/login')
        }
        // Message(error);
      })
  })
}
