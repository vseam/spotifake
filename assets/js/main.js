// Songs
var listAudios = new Array();
listAudios.push(new Song('./assets/images/pimp-colors.jpg', 'Chemtrails', 'Pimp Flaco & Kinder Malo', '#F7DDE0', './assets/sounds/pimp-kinder-chemtrails.mp3'));
listAudios.push(new Song('./assets/images/keo-million.jpg', 'One Million', 'Kidd Keo', '#CFE1EE', './assets/sounds/keo-million.mp3'));
listAudios.push(new Song('./assets/images/nyw-rock.jpg', 'Rock n\' Rollas ft. Costa', 'Natos & Waor', '#DFD6DE', './assets/sounds/nyw-rock.mp3'));

// Variables
var positionAudio = 0;

loadAudio(positionAudio); // Load the first audio

// Events
document.getElementById('control-previous').onclick = function() {
    previousAudio();
}

var reproducing = false;
document.getElementById('control-play').onclick = function() {
    (!reproducing) ? playAudio() : stopAudio();
}

document.getElementById('control-next').onclick = function() {
    nextAudio();
}
