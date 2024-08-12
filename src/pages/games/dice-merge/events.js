const getDie = (e) => (e.target.classList.contains('canvas') ? e.target.parentElement : e.target)

function start(e) {
  console.log('Start Event Triggere. Type:' + e.type)

  let die = getDie(e)
  let touch = {}

  if (e.type == 'dragstart') {
    touch.clientX = e.clientX
    touch.clientY = e.clientY
  }

  if (e.type == 'touchstart') {
    touch.clientX = e.clientX
    touch.clientY = e.clientY
  }

  die = e.target.classList.contains('canvas') ? e.target.parentElement : e.target

  console.log(touch)
  // Add Start Styles
  die.style.position = 'absolute'
  die.style.left = touch.clientX + 'px'
  die.style.top = touch.clientY + 'px'
}

function move(e) {
  let die = getDie(e)
  const touch = e.touches[0]

  die.style.top = touch.clientY + 'px'
  die.style.left = touch.clientX + 'px'
}

function end(e) {
  console.log('Touch Ended', e)
}

function cancel(e) {
  console.log(e)
}

const dragover = (ev) => ev.preventDefault()

function drop(ev) {
  ev.preventDefault()
  console.log('DROPPED')
}

export { start, end, move, cancel, drop, dragover }
