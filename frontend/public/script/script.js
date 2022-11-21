console.log("welcome to spotify");

//initializing the variable
let songsindex = 0;
let audioelement = new Audio('../songs/back.mp3');
let masterplay = document.getElementById('masterplay');
let mastersongname = document.getElementById('mastersongname');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let songitem = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    { songname: "background music", filepath: "../songs/amandattarval.mp3", coverpath: "../images/mauntain3.jpg" },
    { songname: "mahakaal new song", filepath: "../songs/mahakaal.mp3", coverpath: "../images/page_background.jpg" },
    { songname: "love music", filepath: "../songs/danjer.mp3", coverpath: "../images/mauntain1.jpg" },
    { songname: "sky dance ", filepath: "../songs/lost_sky.mp3", coverpath: "../images/music_girl2.jpg" },
    { songname: "relex music", filepath: "../songs/aman2.mp3", coverpath: "../images/music_background.jpg" },
    { songname: "best backgound music", filepath: "../songs/danjer2.mp3", coverpath: "../images/music_girl.jpg" },
    { songname: "new mahakaal song", filepath: "../songs/har2.mp3", coverpath: "../images/mauntain2.jpg" },
]

songitem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName('song_name')[0].innerHTML = songs[i].songname;

});

// audioelement.play()

// handle play/pouse click
masterplay.addEventListener('click', () => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = '1';
    }
    else {
        audioelement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = '0';
    }
})


//progressbar
audioelement.addEventListener('timeupdate', () => {
    process = parseInt((audioelement.currentTime / audioelement.duration) * 100);
    myprogressbar.value = process;
})
myprogressbar.addEventListener('change', () => {
    audioelement.currentTime = (myprogressbar.value * audioelement.duration) / 100;

});

let songitemplay = Array.from(document.getElementsByClassName('songitemplay'));
const MakeAllPlays = () => {
    songitemplay.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};
songitemplay.forEach((element) => {
    console.log(element);
    element.addEventListener('click', (e) => {
        if (audioelement.paused){
            songsindex = parseInt(e.target.id);
            MakeAllPlays();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioelement.currentTime = 0;
            audioelement.src = songs[songsindex].filepath;
            mastersongname.innerHTML = songs[songsindex].songname;
            audioelement.play();
            gif.style.opacity = '1';
            masterplay.classList.remove('fa-circle-play');
            masterplay.classList.add('fa-circle-pause');
        }
        else {
            audioelement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            gif.style.opacity = '0';
            masterplay.classList.remove('fa-circle-pause');
            masterplay.classList.add('fa-circle-play');
        }
    });
});
document.getElementById('next').addEventListener('click', () => {
    MakeAllPlays();
    if (songsindex >= 7) {
        songsindex = 0;
    }
    else {
        songsindex += 1;
    }
    audioelement.currentTime = 0;
    audioelement.src = songs[songsindex].filepath;
    mastersongname.innerHTML = songs[songsindex].songname;
    audioelement.play();
    gif.style.opacity = '1';
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})
document.getElementById('reverse').addEventListener('click', () => {
    MakeAllPlays();
    if (songsindex <= 0) {
        songsindex = 7;
    }
    else {
        songsindex -= 1;
    }
    audioelement.currentTime = 0;
    audioelement.src = songs[songsindex].filepath;
    mastersongname.innerHTML = songs[songsindex].songname;
    audioelement.play();
    gif.style.opacity = '1';
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})