let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let track_art = document.querySelector(".img");


let playpause_btn = document.querySelector('.playpause-track');

let nextbtn = document.getElementById("backward");
let prevbtn = document.getElementById("forward");
let myProgressBar = document.getElementById("progress");

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.fa-shuffle');
let curr_track = document.createElement('audio');

let songIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;


let songs = [
    {
        title:"Bye",
        album:"./asset/Bye_320(PaglaSongs).mp3",
        img:"./asset/bye.jpg",
        artist :"Aditya Bhardwaj"
    },
    {
        title:"Bijlee Bijlee",     
        album:"./asset/Bijlee Bijlee Harrdy Sandhu 320 Kbps.mp3",
        img:"./asset/Bijlee-Bijlee-Harrdy-Sandhu.jpg",
        artist :"Harrdy Sandhu"
    },
    {
        title:"Gallan Goodiyaan",  
        album:"./asset/Gallan Goodiyaan Dil Dhadakne Do 320 Kbps.mp3", 
        img:"./asset/Gallan-Goodiyaan-Dil-Dhadakne-Do.jpg",
        artist :"Yashita Sharma, Manish Kumar Tipu,  Farhan Akhtar, Shankar Mahadevan and Sukhwinder Singh" 
    },
    {
        title:"Gud Naal Ishq Mitha",
        img:"./asset/Gud Naal Ishq Mitha.jpg",
        album:"./asset/Gud Naal Ishq Mitha.mp3",
        artist :"Harshdeep Kaur, Navraj Hans, and Rochak Kohli"
    },
    {
        title:"Banda-Dunki",  
        img:"./asset/Banda - Dunki.jpg",      
        album:"./asset/Banda - Dunki 320 Kbps.mp3",  
        artist :"Diljit Dosanjh"
    },
    {
        title:"Desi Kalakaar", 
        img:"/asset/desi kalakar.webp",   
        album:"./asset/Desi Kalakaar-(PagalWorld).mp3", 
        artist :"Yo Yo Honey Singh"
    }
];

loadTrack(songIndex);

function loadTrack(songIndex){
    clearInterval(updateTimer);
    reset();
    
    // curr_track.pause();
    curr_track.src = songs[songIndex].album;
    curr_track.load();

    track_art.style.backgroundImage = "url("+ songs[songIndex].img +")";
    track_name.textContent = songs[songIndex].title;
    track_artist.textContent = songs[songIndex].artist;

    updateTimer = setInterval(setUpdate, 1000);
    curr_track.addEventListener('ended', nextTrack);
}


function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    if (seek_slider) {
        seek_slider.value = 0;
    }
}

function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}

function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}

function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack(){
    let current_index = songIndex;
    loadTrack(current_index);
    playTrack();
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack(){
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
}

function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
}

function nextTrack(){
    if(songIndex < songs.length - 1 && isRandom === false){
        songIndex += 1;
    }else if(songIndex < songs.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * songs.length);
        songIndex = random_index;
    }else{
        songIndex = 0;
    }
    loadTrack(songIndex);
    playTrack();
}

function prevTrack(){
    if(songIndex > 0){
        songIndex -= 1;
    }else{
        songIndex = songs.length -1;
    }
    loadTrack(songIndex);
    playTrack();
}

function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
 
// let input = document.querySelector("#name");
// let playlist = document.querySelector(".display-playlist");
// let playlist_Items = document.querySelector(".items");


// function create(){
//     let newItem = document.createElement("div");
//     newItem.innerText=input.value;

//     playlist_Items.appendChild(newItem);
//     input.value = "";
// }

// let Prev_playlist = document.querySelector(".prev-playlist");

// function addSong(){
//     Prev_playlist.appendchild(songs[songIndex]);
// }






