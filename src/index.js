const { createTimer } = require('./timer')

let timer = null
let secondsPerStep = null

const timeRemainingDiv = document.querySelector('.time-remaining')
const cupEmptySpace = document.querySelector('#cup-empty-space')
const startButton = document.querySelector('.start-button')
const refillButton = document.querySelector('.refill-button')
const secondsInput = document.querySelector('.seconds-input')
const sipIntervalInput = document.querySelector('.sip-interval-input')
const fullScreenSpan = document.querySelector('.fullscreen-span')
const form = document.querySelector('form')

function msToSecond(ms) {
  return Math.ceil(ms / 1000)
}

function getEmptySpaceHeight() {
  return document.querySelector('#cup-gap').getBBox().height + 1
}

function calcHeightFromTimeRemaining(remaining) {
  const step = timer.getOptions().ms / 1000 / secondsPerStep
  const heightPerStep =  getEmptySpaceHeight() / step
  return (step - Math.ceil((remaining / 1000) / secondsPerStep)) * heightPerStep
}

function updateDom(remaining) {
  let height = calcHeightFromTimeRemaining(remaining)
  timeRemainingDiv.textContent = msToSecond(remaining)
  cupEmptySpace.style.height = `${height}px`
  if (remaining < 0) {
    refillButton.classList.remove('hide')
  }
}

function refillClickHandler(e) {
  e.target.classList.add('hide')
  form.classList.remove('hide')
  timeRemainingDiv.textContent = ''
  cupEmptySpace.style.height = '0px'
}

function toggleFullScreen() {
  if (document.webkitFullscreenElement) {
    document.webkitExitFullscreen()
  } else {
    document.documentElement.webkitRequestFullscreen()
  }
}

function formSubmitHandler(e) {
  e.preventDefault()
  
  secondsPerStep = sipIntervalInput.value
  timer = createTimer(
    { ms: secondsInput.value * 1000 }, 
    updateDom
  )

  form.classList.add('hide')
  timer.start()
}

form.addEventListener('submit', formSubmitHandler)
refillButton.addEventListener('click', refillClickHandler)
fullScreenSpan.addEventListener('click', toggleFullScreen)