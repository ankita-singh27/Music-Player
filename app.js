const myAudio = document.querySelector("audio")
const playButton = document.querySelector("#play")
const myShuffle = document.querySelector("#shuffle")


let isAudioPlaying = false

function playTheAudio()
{
    myAudio.play()
    //Audio is playing => PLAY to PAUSE
    playButton.classList.replace("fa-play", "fa-pause")
    isAudioPlaying = true
    myImage.classList.add("rotateimage")
}

function pauseTheAudio()
{
    myAudio.pause()
    playButton.classList.replace("fa-pause", "fa-play")
    isAudioPlaying = false
    myImage.classList.remove("rotateimage")
}


playButton.addEventListener("click", function()
{
    if(isAudioPlaying)
        pauseTheAudio()
    else
        playTheAudio() 
})


const info = [
    {
       songName: "All the way in to the Desert",
       singerName: "Lil Nas X",
       data: 2
    },
    {
        songName: "In to the Sky",
        singerName: "ATB/Topic/A7S",
        data: 3
    },
    {
        songName: "Sing a SongC",
        singerName: "Ella Henderson & Tom Grennan",
        data: 4
    }
]

const forwardButton = document.querySelector("#forward")
const mySongName = document.querySelector("h3")
const mySingerName = document.querySelector("h4")
const backwardButton = document.querySelector("#backward")
const myImage = document.querySelector("#image")
const myLike = document.querySelector("#like")

function updateSong(songData){

    mySongName.textContent = songData.songName
    mySingerName.textContent = songData.singerName
    myImage.src = `./images/image-${songData.data}.jpg`
    myAudio.src = `./musics/music-${songData.data}.mp3`
}

let songPosition = 0

forwardButton.addEventListener("click", function()
{    
    myLike.style.color = "white"
    // Update the Song data(image, singer name, song name, audio file)
    if(songPosition > info.length - 1)
    {
        songPosition = 0
    }
    updateSong(info[songPosition])
    console.log(songPosition)
     songPosition++
    playTheAudio()
    

})

backwardButton.addEventListener("click", function()
{ 
    // 2 1 0 2 1 0 2 1 0
    myLike.style.color = "white"
    songPosition--
   
    if(songPosition < 0)
    {
        songPosition = info.length - 1
    }
    updateSong(info[songPosition])
    console.log(songPosition);
    playTheAudio() 
})

// timeupdate event gives the time related information

const htmlTotalDuration = document.querySelector(".totalDuration")
const htmlCurrentTime = document.querySelector(".currentTime")
const ChildProgressBar = document.querySelector(".childProgressBar")

myAudio.addEventListener("timeupdate", function(output)
{
    let myCurrentTime = output.srcElement.currentTime
    let myTotalDuration = output.srcElement.duration
    //console.log(myTotalDuration)

    let totalDurationInMinutes = Math.floor(myTotalDuration / 60)
   // console.log(totalDurationInMinutes) 
    let totalDurationInSeconds = Math.floor(myTotalDuration % 60)//remainder

    if(totalDurationInSeconds < 10)
    {
        totalDurationInSeconds = `0${totalDurationInSeconds}`
    }

    htmlTotalDuration.textContent = `${totalDurationInMinutes}:${totalDurationInSeconds}`

    let currentTimeInMinutes = Math.floor(myCurrentTime / 60)
    let currentTimeInSeconds = Math.floor(myCurrentTime % 60)//remainder

    if(currentTimeInSeconds < 10)
    {
        currentTimeInSeconds = `0${currentTimeInSeconds}`
    }

    htmlCurrentTime.textContent = `${currentTimeInMinutes}:${currentTimeInSeconds}`

    ChildProgressBar.style.width = `${myCurrentTime / myTotalDuration * 100}%`
})

// Local Storage(Container)store the data in Key - Value pair --> Inside the Browser

myLike.addEventListener("click", function()
{
    myLike.style.color = "red"
    // Adding the details to local storage
    localStorage.setItem(mySingerName.textContent, mySongName.textContent)
    
})

myLike.addEventListener("dblclick", function()
{
    myLike.style.color = "white"
    localStorage.removeItem(mySingerName.textContent)
})

// 3 songs -> 0 or 1 or 2
myShuffle.addEventListener("click", function()
{
    const songPositionNo = Math.floor(Math.random() * info.length)
    updateSong(info[songPositionNo])
    playTheAudio()
})

//seeking
// Click --> ChildProgressBar should Move to that location --> currentTime should be updated

const ParentProgressBar = document.querySelector(".parentProgressBar")
ParentProgressBar.addEventListener("click", function(output)
{
    const clickPercentage = output.offsetX / output.srcElement.offsetWidth * 100
    ChildProgressBar.style.width = `${clickPercentage}%`
    myAudio.currentTime = (output.offsetX / output.srcElement.offsetWidth) * myAudio.duration

    // (output.offsetX / output.srcElement.offsetWidth) ==> disatnce covered not in % 
})


