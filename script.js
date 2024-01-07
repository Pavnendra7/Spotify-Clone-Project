console.log("Welcome to Spotify");



// Initialization of Variables
let songIndex = 0;
let audioElement = new Audio('Songs/1.mp3');
let masterPlay=document.querySelector('#masterPlay');
let myProgressBar=document.querySelector('#myProgressBar');
let gif=document.querySelector('#gif');
let songItems = Array.from(document.querySelectorAll('.songItem'));
let songPlayButton = Array.from(document.getElementsByClassName('songItemPlay'));
let previous = document.querySelector('#previous');
let next = document.querySelector('#next');
let masterSong = document.querySelector('#masterSong');


let songs = [
    {songName: "Hey How you doin?", filePath: "Songs/1.mp3", coverPath:"Cover/1.jfif"},
    {songName: "Let me Love you", filePath: "Songs/2.mp3", coverPath:"Cover/2.jfif"},
    {songName: "All I want", filePath: "Songs/3.mp3", coverPath:"Cover/3.jfif"},
    {songName: "Beethoven Symphony", filePath: "Songs/4.mp3", coverPath:"Cover/4.jfif"},
]


songItems.forEach((element,i) => {
    console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText= songs[i].songName;
})

// Handle play/pause clicks
masterPlay.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity = 0;
    }
})


// Listen to Events 

audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = () => {

    songPlayButton.forEach((elem) => {
        elem.classList.remove('fa-pause-circle');
        elem.classList.add('fa-play-circle');
    })
}


songPlayButton.forEach((element) => {
    element.addEventListener('click', (e) =>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        
        element.classList.remove('fa-play-circle');
        element.classList.add('fa-pause-circle');
        audioElement.src= `Songs/${songIndex}.mp3`;
        masterSong.innerText=songs[songIndex].songName; 
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

previous.addEventListener('click', () => {
    if(songIndex<=0){
       
        songIndex=0;
    }
    else{
    songIndex -=1;
    }
    audioElement.src= `Songs/${songIndex+1}.mp3`;
    masterSong.innerText=songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

next.addEventListener('click', () => {
    if(songIndex>=4){
       
        songIndex=0;
    }
    else{
    songIndex +=1;
    }
    audioElement.src= `Songs/${songIndex+1}.mp3`;
    masterSong.innerText=songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})