import fetch from '../../utils/fetch'

export default {
  list(obj, type, id) {
    let path = '/paints/' + type
    if (id) {
      path += '/' + id
    }
    obj.type = 'GET'
    return fetch(path, obj)
  }
}
