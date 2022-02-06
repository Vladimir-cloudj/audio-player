
const player = document.querySelector('.player'),
			playBtn = document.querySelector('.play'),
			prevBtn = document.querySelector('.prev'),
			nextBtn = document.querySelector('.next'),
			audio = document.querySelector('.audio'),
			progressContainer = document.querySelector('.progress__container'),
			volumeContainer = document.querySelector('.volume__container'),//add
			volume = document.querySelector('.volume'),//add
			progress = document.querySelector('.progress'),
			titleSong = document.querySelector('.song-name'),
			artistSong = document.querySelector('.song-artist'),//add artist
			cover = document.querySelector('.cover__img'),
			imgSrc = document.querySelector('.img__src'),
			currentPosition = document.querySelector('.current-time'),
			totalPosition = document.querySelector('.total-time')


// names songs
const songs = ['Faded', 'Falling_down', 'Ratherbe', 'Stay']
// names artists
const artists = ['Alan Walker', 'Wild Cards', 'Clean Bandit', 'The Kid LAROI']
// song default
let songIndex = 0

// init
function loadSong(song, artist) {
	titleSong.innerHTML = song;
	artistSong.innerHTML = artist;
	audio.src = `audio-player/song/${song}.mp3`
	cover.src = `img/cover${songIndex + 1}.png`
}
loadSong(songs[songIndex], artists[songIndex])

// play
function playSong() {
	player.classList.add('play')
	audio.play()
	cover.classList.add('active')
	imgSrc.src = `img/pause.png`
}

// pause
function pauseSong() {
	player.classList.remove('play')
	audio.pause()
	cover.classList.remove('active')
	imgSrc.src = `img/play.png`
}
playBtn.addEventListener('click', () => {
	const isPlay = player.classList.contains('play')
	if (isPlay) {
		pauseSong()
	} else {
		playSong()
	}
	
})
// next song
function nextSong() {
	songIndex++
	if (songIndex > songs.length - 1) {
		songIndex = 0
	}
	loadSong(songs[songIndex], artists[songIndex])
	playSong()
}
nextBtn.addEventListener('click', nextSong)
// prev song
function prevSong() {
	songIndex--
	if (songIndex < 0) {
		songIndex = songs.length - 1
	}
	loadSong(songs[songIndex], artists[songIndex])
	playSong()
}
prevBtn.addEventListener('click', prevSong)

// progress bar
function updateProgress(e) {
	
	const {duration, currentTime} = e.srcElement
	
	const progressPercent = (currentTime / duration) * 100
	
	progress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress)

// set progress
function setProgress(e) {
	const width = this.clientWidth
				clickX = e.offsetX
				duration = audio.duration

	audio.currentTime = (clickX / width) * duration

}
progressContainer.addEventListener('click', setProgress)

// autoplay
audio.addEventListener('ended', nextSong)

//volume bar

function updateVolume(e) {

	const width = this.clientWidth
	// const currentVolume = e.srcElement
	clickX = e.offsetX	
	// const volumePercent = (currentVolume / width)	
	const volumePercent = (clickX / width) * 100
	volume.style.width = `${volumePercent}%`
}
volumeContainer.addEventListener('click', updateVolume)

// set volume
function setVolume(e) {
	const width = this.clientWidth
				clickX = e.offsetX
				// volume = audio.volume

	audio.volume = (clickX / width)

}
volumeContainer.addEventListener('click', setVolume)


	

audio.onloadeddata = function(){
	// console.log(this.duration);
	let durationMinutes = Math.floor(audio.duration / 60);
	let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);

	if (durationMinutes < 10) {
		durationMinutes = '0' + durationMinutes;
	}
	if (durationSeconds < 10) {
		durationSeconds = '0' + durationSeconds;
	}

	totalPosition.textContent = durationMinutes + ':' + durationSeconds;
};

audio.ontimeupdate = function () {
	let currentMinutes = Math.floor(audio.currentTime / 60);
	let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);

	if (currentSeconds < 10) {
		currentSeconds = '0' + currentSeconds;
	}
	if (currentMinutes < 10) {
			currentMinutes = '0' + currentMinutes;
		}

	currentPosition.textContent = currentMinutes + ':' + currentSeconds;	
}
