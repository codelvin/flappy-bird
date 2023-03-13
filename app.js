const grid = document.querySelector(".grid")
const gridWidth = 400
const gridHeight = 400
const barWidth = 30
let birdCurrentLocation = [10, 100]

let barTimerId = null
let birdTimerId = null
let checkTimerId = null
let gravity = 2
let birdYSpeed = 0

class Bar {
    constructor(x, y, h) {
        this.top = y
        this.left = x
        this.height = h
        this.topLeft = [x, y]
        this.bottomLeft = [x, y + h]
        this.topRight = [x + barWidth, y]
        this.bottomRight = [x + barWidth, y + h]
    }
}
let bars = [
    new Bar(400, 0, 120),
    new Bar(400, 220, 140),
    new Bar(500, 0, 160),
    new Bar(500, 240, 160),
    new Bar(620, 0, 110),
    new Bar(620, 260, 140)
]

function addBars() {
    for (let i = 0;i < bars.length;i++) {
        const bar = document.createElement('div')
        bar.style.height = bars[i].height + 'px'
        bar.style.top= bars[i].top + 'px'
        bar.style.left = bars[i].left + 'px'
        bar.classList.add('bar')
        grid.appendChild(bar)
    }
}
addBars()

function moveBars() {
    const allbars= document.querySelectorAll('.grid .bar')
    for(let i = 0;i < allbars.length;i++) {
        allbars[i].style.left = (allbars[i].style.left.slice(0, -2) - 2) + 'px'
    }
}
barTimerId = setInterval(moveBars, 50)

// add bird
const bird = document.createElement('div')
bird.classList.add('bird')
bird.style.top = birdCurrentLocation[1] + 'px'
bird.style.left = birdCurrentLocation[0] + 'px'
grid.appendChild(bird)

// move bird
function moveBird(e) {
    switch (e.key) {
        case 'ArrowLeft':
            birdCurrentLocation[0] -= 10
            break;
        case 'ArrowRight':
            birdCurrentLocation[0] += 10
            break;
        case 'ArrowUp':
            birdCurrentLocation[1] -= 50
            birdYSpeed = 0
            break;
        case 'ArrowDown':
            birdCurrentLocation[1] += 10
            break;
    }

    bird.style.top = birdCurrentLocation[1] + 'px'
    bird.style.left = birdCurrentLocation[0] + 'px'
}
document.addEventListener('keydown', moveBird)

// bird natural drop
function dropBird() {
    birdCurrentLocation[1] += birdYSpeed * 0.5 + 0.5 * gravity * 0.25
    birdYSpeed += 0.5 * gravity
    bird.style.top = birdCurrentLocation[1] + 'px'
    bird.style.left = birdCurrentLocation[0] + 'px'
}
birdTimerId = setInterval(dropBird, 50)

// check collision

function checkForCollisions() {
    const allbars= document.querySelectorAll('.grid .bar')
    if (birdCurrentLocation[0] < 0 || 
        birdCurrentLocation[0] > gridWidth ||
        birdCurrentLocation[1] < 0 ||
        birdCurrentLocation[1] > gridHeight) {
            document.getElementById('result').textContent = 'You lose!'
            clearInterval(birdTimerId)
            clearInterval(barTimerId)
            clearInterval(checkTimerId)
            document.removeEventListener('keydown', moveBird)
        }
    
    allbars.forEach(bar => {
        if (birdCurrentLocation[0] <= parseInt(bar.style.left.slice(0, -2)) + barWidth
            && birdCurrentLocation[0] >= bar.style.left.slice(0, -2)
            && birdCurrentLocation[1] <= bar.style.top.slice(0, -2) + bar.style.height.slice(0, -2)
            && birdCurrentLocation[1] >= bar.style.top.slice(0, -2)) {
                document.getElementById('result').textContent = 'You lose!'
                clearInterval(barTimerId)
                clearInterval(birdTimerId)
                clearInterval(checkTimerId)
                document.removeEventListener('keydown', moveBird)
            }
    })
}

checkTimerId = setInterval(checkForCollisions, 100)