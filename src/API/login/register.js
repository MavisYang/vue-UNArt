import fetch from '../../utils/fetch'

export default {
  register(obj) {
    return fetch('user/register', obj)
  }
}
