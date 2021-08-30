const screens = document.querySelectorAll('.screen')
const chooseInsectButtons = document.querySelectorAll('.choose-insect-btn')
const startButton = document.querySelector('.start-btn')

const closeButton = document.querySelector('.close')
const alert = document.querySelector('.alert')

const gameContainer = document.querySelector('.game-container')

const timeEl = document.querySelector('.time')
const scoreEl = document.querySelector('.score')
const message = document.querySelector('.message')


let seconds = 0
let score = 0
let selectedInsect = {}

startButton.addEventListener('click', ()=>{
    screens[0].classList.add('up')
})

closeButton.addEventListener('click', ()=> {
    message.classList.remove('visible')
    
})


//What to do when an insect is selected
chooseInsectButtons.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        //Extract src and alt from selected insect
        selectedInsect = {src, alt}
        screens[1].classList.add('up')
        setTimeout(createInsect, 1000)
        startGame()

    })
})

function startGame(){
    setInterval(increaseTime, 1000 );
}

function increaseTime(){
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time ${m}:${s} `
    seconds++
}
//Create an insect element with the selected insect and place it in random locations
function createInsect(){
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const {x , y} = getRandomLocation()
    insect.style.left = `${x}px`
    insect.style.top = `${y}px`
    insect.innerHTML = `<img src="${selectedInsect.src}" alt="${selectedInsect.alt}" style="transform : rotate(${Math.random()*360}deg)" />`

    insect.addEventListener('click', catchInsect)
    gameContainer.appendChild(insect)

}

function getRandomLocation(){
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 150) + 100
    const y = Math.random() * (height - 150) + 100
    return {x , y}
}

function catchInsect(){
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove() , 2000 );
    addInsects()
}

function addInsects(){
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1600);

}

function increaseScore(){
    score++

    if(score == 20){
        message.classList.add('visible')
    }
    if(score==50){
        message.classList.add('visible')
        alert.innerHTML = `Oh boi you are persistant ! <br> But you're still playing an impossible game!`   
    }
    if(score==65){
        message.classList.add('visible')
        alert.innerHTML = ` Dayum! I'm impressed by your commitment! <br> You still wanna continue?`   
    }
    if(score==100){
        message.classList.add('visible')
        alert.innerHTML = ` Okay you win lmao! <br> You can stop now please! Like really stop now!`   
    }
    if(score==100){
        message.classList.add('visible')
        alert.innerHTML = ` Or you could go on you know! <br> I'm not your mother!`   
    }

    scoreEl.innerHTML = `Score: ${score}`
}