const timeago = time => {
  let now = new Date().getTime()
  let oldTime = new Date(time).getTime()
  let difference = now - oldTime
  let minute = 1000 * 60
  let hour = minute * 60
  let day = hour * 24
  let halfamonth = day * 15
  let month = day * 30
  let year = month * 12
  let diffValue = now - oldTime //时间差
  let _year = diffValue / year
  let _month = diffValue / month
  let _week = diffValue / (7 * day)
  let _day = diffValue / day
  let _hour = diffValue / hour
  let _min = diffValue / minute
 
  let result = ''
  
  if (diffValue < 0) {
    return
  }

  if (_year >= 1) {
    result = ~~_year + ' 年前'
  } else if (_month >= 1) {
    result = ~~_month + ' 月前'
  } else if (_week >= 1) {
    result = ~~_week + ' 周前'
  } else if (_day >= 1) {
    result = ~~_day + ' 天前'
  } else if (_hour >= 1) {
    result = ~~_hour + ' 小时前'
  } else if (_min >= 1) {
    result = ~~_min + ' 分钟前'
  } else result = '刚刚'
  return result
}

export { timeago }
