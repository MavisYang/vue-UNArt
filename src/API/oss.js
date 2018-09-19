import fetch from '../utils/fetch'

export default function getOssSigure(obj = {}) {
  obj.type = 'GET'
  return fetch('oss/getStsToken', obj)
}
