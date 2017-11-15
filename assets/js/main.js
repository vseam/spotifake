// Object
function Song(cover, title, group, color, file) {
    // Attributes
    this.cover = cover;
    this.title = title;
    this.group = group;
    this.color = color;
    this.file  = file;
}

// Functions
function changeSongData(position) {
    document.getElementById('song-cover').src                    = listSongs[position].cover;
    document.getElementById('song-title').innerHTML              = listSongs[position].title;
    document.getElementById('song-group').innerHTML              = listSongs[position].group;
    document.getElementById('white-layer').style.backgroundColor = listSongs[position].color;

    var totalTime   = listSongs[position].file.seekable.end(0);
    var totalMinutes = Math.floor(parseInt(totalTime) / 60);
    var totalSeconds = parseInt(totalTime) % 60;

    totalMinutes = (totalMinutes < 10) ? '0' + totalMinutes : totalMinutes;
    totalSeconds = (totalSeconds < 10) ? '0' + totalSeconds : totalSeconds;
    document.getElementById('total-time').innerHTML = totalMinutes + ':' + totalSeconds;
}

function startPlayButton() {
    listSongs[currentSong].file.play();
    startTimeline(currentSong);
    document.getElementById('play-stop').innerHTML = '<i class="fa fa-pause-circle-o" aria-hidden="true"></i>';
    document.getElementById('play-stop').classList.add('active');

    reproducing = true;
}

function resetPlayButton() {
    listSongs[currentSong].file.pause();
    clearInterval(timeline);
    document.getElementById('play-stop').innerHTML = '<i class="fa fa-play-circle-o" aria-hidden="true"></i>';
    document.getElementById('play-stop').classList.remove('active');

    reproducing = false;
}

function resetSong(position) {
    listSongs[position].file.pause();
    listSongs[position].file.currentTime = 0;
    resetTimeline();
}

function resetTimeline() {
    document.getElementById('current-timeline').style.width = '0%';
    document.getElementById('current-time').innerHTML = '00:00';
}

function previousSong(position) {
    if(position != 0) {
        resetPlayButton();
        resetSong(currentSong);
        currentSong--;
        changeSongData(currentSong);
    }
}

function nextSong(position) {
    if(position != (listSongs.length - 1)) {
        resetPlayButton();
        resetSong(currentSong);
        currentSong++;
        changeSongData(currentSong);
    }
}

var timeline = null;
function startTimeline(position) {
    timeline = setInterval(function() {
        var currentTime = listSongs[position].file.currentTime;
        var totalTime   = listSongs[position].file.seekable.end(0);

        var barCurrentTime = ((currentTime * 100) / totalTime) + '%';
        document.getElementById('current-timeline').style.width = barCurrentTime;

        var currentMinutes = Math.floor(parseInt(currentTime) / 60);
        var currentSeconds = parseInt(currentTime) % 60;

        currentMinutes = (currentMinutes < 10) ? '0' + currentMinutes : currentMinutes;
        currentSeconds = (currentSeconds < 10) ? '0' + currentSeconds : currentSeconds;
        document.getElementById('current-time').innerHTML = currentMinutes + ':' + currentSeconds;

        var totalMinutes = Math.floor(parseInt(totalTime) / 60);
        var totalSeconds = parseInt(totalTime) % 60;

        totalMinutes = (totalMinutes < 10) ? '0' + totalMinutes : totalMinutes;
        totalSeconds = (totalSeconds < 10) ? '0' + totalSeconds : totalSeconds;
        document.getElementById('total-time').innerHTML = totalMinutes + ':' + totalSeconds;

        if(currentTime == totalTime) {
            resetPlayButton();
            clearInterval(timeline);
            nextSong(currentSong);
        }
    }, 1);
}

// Songs
var listSongs = new Array();
listSongs.push(new Song('./assets/images/pimp-colors.jpg', 'Chemtrails', 'Pimp Flaco & Kinder Malo', '#F7DDE0', new Audio('./assets/sounds/pimp-kinder-chemtrails.mp3')));
listSongs.push(new Song('./assets/images/keo-million.jpg', 'One Million', 'Kidd Keo', '#CFE1EE', new Audio('./assets/sounds/keo-million.mp3')));
listSongs.push(new Song('./assets/images/nyw-rock.jpg', 'Rock n\' Rollas ft. Costa', 'Natos & Waor', '#DFD6DE', new Audio('./assets/sounds/nyw-rock.mp3')));

// Variables
var currentSong = 0;

// Events
document.getElementById('backward').onclick = function() {
    previousSong(currentSong);
}

var reproducing = false;
document.getElementById('play-stop').onclick = function() {
    (!reproducing) ? startPlayButton() : resetPlayButton();
}

document.getElementById('forward').onclick = function() {
    nextSong(currentSong);
}
