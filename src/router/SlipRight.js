const SlipRight = () => {
  let startX
  let startY
  document.querySelector('body').addEventListener('touchstart', function(e) {
    e.preventDefault()
    startX = e.changedTouches[0].pageX
    startY = e.changedTouches[0].pageY
  })
  document.querySelector('body').addEventListener('touchend', function(e) {
    let moveEndX = e.changedTouches[0].pageX
    let moveEndY = e.changedTouches[0].pageY
    let X = moveEndX - startX
    let Y = moveEndY - startY

    if (Math.abs(X) > Math.abs(Y) && X > 100) {
      localStorage.SlipRight = true
      alert(localStorage.SlipRight)
    }
  })
}

export { SlipRight }
