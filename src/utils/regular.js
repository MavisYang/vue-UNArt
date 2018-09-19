//验证
const regular = (val, type) => {
  if (type === 'account') {
    if (!/^1[3|4|5|8][0-9]\d{4,8}$/.test(val)) {
      let email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      if (email.test(val)) return true
      else return false
    } else {
      return true
    }
  } else if (type === 'password') {
    if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,16}$/.test(val)) return true
    else return false
  }
}

export { regular }
