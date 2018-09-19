import fetch from '../../utils/fetch'

export default {
  verificationCode(obj, Vtype) {
    return fetch('captcha/' + Vtype, obj)
  }
}
