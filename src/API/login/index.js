import fetch from '../../utils/fetch'

export default {
  authorizations(obj) {
    return fetch('authorizations', obj)
  }
}
