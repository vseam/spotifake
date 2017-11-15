// Object
function Song(cover, title, group, color, file) {
    this.cover = cover;
    this.title = title;
    this.group = group;
    this.color = color;
    this.file  = file;
}

// Functions
function audioCurrentTime() {
    var currentTime = document.getElementById('file-audio').currentTime;

    var minutes = Math.floor(parseInt(currentTime) / 60);
        seconds = parseInt(currentTime) % 60;

    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return minutes + ':' + seconds;
}

function audioTotalTime() {
    var totalTime = document.getElementById('file-audio').seekable.end(0);

    var minutes   = Math.floor(parseInt(totalTime) / 60);
        seconds   = parseInt(totalTime) % 60;

    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return minutes + ':' + seconds;
}

function loadAudio() {
    // Information
    document.getElementById('bg-audio').style.backgroundColor = listAudios[positionAudio].color;
    document.getElementById('audio-cover').src                = listAudios[positionAudio].cover;
    document.getElementById('info-group').innerHTML           = listAudios[positionAudio].group;
    document.getElementById('info-title').innerHTML           = listAudios[positionAudio].title;

    // Timeline
    document.getElementById('timeline-current').innerHTML     = '00:00';
    document.getElementById('timeline-line').style.width      = '0%';
    // document.getElementById('timeline-total').innerHTML       = audioTotalTime();

    // Audio
    document.getElementById('file-audio').src                 = listAudios[positionAudio].file;
}

function resetAudio() {
    var fileAudio = document.getElementById('file-audio');

    fileAudio.pause();
    fileAudio.currentTime = 0;

    document.getElementById('timeline-current').innerHTML = '00:00';
    document.getElementById('timeline-line').style.width  = '0%';
}

var timeline = null;
function startTimeline() {
    timeline = setInterval(function() {
        var currentTime     = document.getElementById('file-audio').currentTime;
            totalTime       = document.getElementById('file-audio').seekable.end(0);

        document.getElementById('timeline-current').innerHTML = audioCurrentTime();
        document.getElementById('timeline-line').style.width  = ((currentTime * 100) / totalTime) + '%';

        if(currentTime == totalTime) {
            clearInterval(timeline);
            nextAudio();
        }
    }, 1);
}

function previousAudio() {
    if(positionAudio != 0) {
        stopAudio();
        resetAudio();
        positionAudio--;
        loadAudio();
    }
}

function playAudio() {
    document.getElementById('file-audio').play();
    startTimeline();

    var controlPlay = document.getElementById('control-play');
    controlPlay.classList.remove('fa-play-circle-o');
    controlPlay.classList.add('fa-pause-circle-o');
    controlPlay.classList.add('active');

    reproducing = true;
}

function stopAudio() {
    document.getElementById('file-audio').pause();
    clearInterval(timeline);

    var controlPlay = document.getElementById('control-play');
    controlPlay.classList.add('fa-play-circle-o');
    controlPlay.classList.remove('fa-pause-circle-o');
    controlPlay.classList.remove('active');

    reproducing = false;
}

function nextAudio() {
    if(positionAudio != (listAudios.length - 1)) {
        stopAudio();
        resetAudio();
        positionAudio++;
        loadAudio();
    }
}
