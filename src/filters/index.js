import Vue from 'vue'
const textFormatEllipsis = Vue.filter('textFormatEllipsis', function(text) {
  let width = window.innerWidth
  let num = 0
  if (width <= 330) {
    num = 28
  } else if (width > 330 && width <= 375) {
    num = 40
  } else {
    num = 55
  }

  if (text.length > num) {
    text = text.substring(0, num) + '...'
  }
  return text
})

export { textFormatEllipsis }
