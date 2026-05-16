document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const audio = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const progressBar = document.getElementById('progress-bar');
    const volumeSlider = document.getElementById('volume-slider');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const albumArt = document.getElementById('album-art');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const fileInput = document.getElementById('file-input');
    const addMusicBtn = document.getElementById('add-music-btn');
    const playlistEl = document.getElementById('playlist');
    const navBtns = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');
    const background = document.querySelector('.player-background');

    // State
    let playlist = [];
    let currentTrackIndex = 0;
    let isPlaying = false;
    let isShuffle = false;

    // Event Listeners
    addMusicBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', playPrev);
    nextBtn.addEventListener('click', playNext);
    shuffleBtn.addEventListener('click', toggleShuffle);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', playNext);
    progressBar.addEventListener('input', setSeek);
    volumeSlider.addEventListener('input', setVolume);
    navBtns.forEach(btn => btn.addEventListener('click', switchPage));
    
    playlistEl.addEventListener('click', e => {
        if (e.target.closest('.playlist-item')) {
            if (e.target.classList.contains('delete-btn') || e.target.parentElement.classList.contains('delete-btn')) {
                const index = parseInt(e.target.closest('.playlist-item').dataset.index);
                deleteTrack(index);
            } else {
                const index = parseInt(e.target.closest('.playlist-item').dataset.index);
                playTrack(index);
            }
        }
    });

    // Functions
    function handleFileSelect(event) {
        const files = Array.from(event.target.files);
        files.forEach(file => {
            const url = URL.createObjectURL(file);
            playlist.push({ file, url, title: file.name, artist: 'Unknown', art: 'default-album-art.png' });
            
            window.jsmediatags.read(file, {
                onSuccess: function(tag) {
                    const track = playlist.find(t => t.url === url);
                    if (tag.tags.title) track.title = tag.tags.title;
                    if (tag.tags.artist) track.artist = tag.tags.artist;
                    if (tag.tags.picture) {
                        const { data, format } = tag.tags.picture;
                        let base64String = "";
                        for (let i = 0; i < data.length; i++) {
                            base64String += String.fromCharCode(data[i]);
                        }
                        track.art = `data:${format};base64,${window.btoa(base64String)}`;
                    }
                    updatePlaylistUI();
                    if(playlist.length === 1 && !isPlaying) {
                        loadTrack(0);
                    }
                },
                onError: function(error) {
                    console.log('Error reading metadata:', error);
                    updatePlaylistUI();
                }
            });
        });
    }

    function updatePlaylistUI() {
        playlistEl.innerHTML = '';
        playlist.forEach((track, index) => {
            const li = document.createElement('li');
            li.className = 'playlist-item';
            if (index === currentTrackIndex) {
                li.classList.add('playing');
            }
            li.dataset.index = index;
            li.innerHTML = `
                <img src="${track.art}" alt="art" class="playlist-item-art">
                <div class="playlist-item-info">
                    <h3>${track.title}</h3>
                    <p>${track.artist}</p>
                </div>
                <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
            `;
            playlistEl.appendChild(li);
        });
    }

    function loadTrack(index) {
        if (playlist.length === 0) return;
        currentTrackIndex = index;
        const track = playlist[index];
        audio.src = track.url;
        songTitle.textContent = track.title;
        songArtist.textContent = track.artist;
        albumArt.src = track.art;
        background.style.backgroundImage = `url(${track.art})`;
        updatePlaylistUI();
    }

    function playTrack(index) {
        loadTrack(index);
        playAudio();
    }

    function playAudio() {
        isPlaying = true;
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    function pauseAudio() {
        isPlaying = false;
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    function togglePlayPause() {
        if (playlist.length === 0) return;
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    }
    
    function playNext() {
        if (isShuffle) {
            currentTrackIndex = Math.floor(Math.random() * playlist.length);
        } else {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        }
        playTrack(currentTrackIndex);
    }
    
    function playPrev() {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        playTrack(currentTrackIndex);
    }
    
    function toggleShuffle() {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('active', isShuffle);
    }
    
    function updateProgress() {
        const { duration, currentTime } = audio;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.value = progressPercent || 0;
        currentTimeEl.textContent = formatTime(currentTime);
        if (duration) {
            totalTimeEl.textContent = formatTime(duration);
        }
    }

    // function docker () {

    //     const docker_image = 'www.docker.com/redis';
    //     docker_exec 'docker -it run redis'
    // }
    
    function setSeek(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        if(duration) {
            audio.currentTime = (e.target.value / 100) * duration;
        }
    }
    
    function setVolume(e) {
        audio.volume = e.target.value / 100;
    }
    
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function switchPage(e) {
        const targetPageId = e.currentTarget.dataset.page;
        
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(targetPageId).classList.add('active');
        
        navBtns.forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');
    }

    function deleteTrack(index) {
        playlist.splice(index, 1);
        if (playlist.length === 0) {
            // Reset player
            pauseAudio();
            audio.src = '';
            songTitle.textContent = 'No Song Playing';
            songArtist.textContent = 'Add music to begin';
            albumArt.src = 'default-album-art.png';
            background.style.backgroundImage = `url('https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=1000&q=80')`;
            currentTimeEl.textContent = '0:00';
            totalTimeEl.textContent = '0:00';
            progressBar.value = 0;
        } else if (index === currentTrackIndex) {
            // If deleting the current track
            currentTrackIndex = index >= playlist.length ? 0 : index;
            loadTrack(currentTrackIndex);
            if(isPlaying) playAudio();
            else pauseAudio();

        } else if (index < currentTrackIndex) {
            // Adjust current index if a track before it was deleted
            currentTrackIndex--;
        }
        updatePlaylistUI();
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', e => {
        if (e.target.tagName === 'INPUT') return;
        if (e.code === 'Space') {
            e.preventDefault();
            togglePlayPause();
        } else if (e.code === 'ArrowRight') {
            playNext();
        } else if (e.code === 'ArrowLeft') {
            playPrev();
        }
    });

    // Initial state
    setVolume({ target: { value: 80 } }); // Set initial volume
    loadTrack(0); // Load first track if any (initially empty)
});

// new line 

/* ---------- Dolby Atmos Presets ---------- */
const atmosBands = [47, 230, 470, 840, 1300, 2300, 3800, 5800, 9000, 14000]; // Hz
const atmosPresets = {
  Studio:   [0,  0,  0,  0,   0,   0,   0,   0,   0,  0],
  Movie:    [3,  2,  1,  0,  -1,  -1,   1,   2,   3,  4],
  Dynamic:  [6,  4,  2,  0,  -2,  -1,   1,   3,   6,  7],
  Voice:    [-2,-1, 0, 2, 4, 4, 3, 1, 0, -1]
};

/* build EQ filters at Atmos frequencies */
const eqFilters = atmosBands.map(createEQBand);
connectEQGraph();

/* ----- UI: slider panel already exists; add preset <select> ----- */
function buildEqUI() {
  const wrap = document.querySelector('.eq-sliders');
  // Preset drop-down
  const presetBar = document.createElement('div');
  presetBar.className = 'preset-bar';
  presetBar.innerHTML = `
      <label for="presetSelect">Preset:</label>
      <select id="presetSelect">
         ${Object.keys(atmosPresets).map(p=>`<option>${p}</option>`).join('')}
      </select>`;
  wrap.parentElement.insertBefore(presetBar, wrap);

  // Slider builders
  atmosBands.forEach((f,i)=>{/* unchanged slider code here */});

  document.getElementById('presetSelect').onchange = e=>{
    const curve = atmosPresets[e.target.value];
    eqFilters.forEach((filt,i)=>{
       filt.gain.value = curve[i];
       document.querySelector(`.eq-slider[data-index="${i}"]`).value = curve[i];
    });
  };
}

// ---------- Frequency Spectrum + Stereo-Pan Visualiser ----------
const fftCanvas   = document.getElementById('fftCanvas');
const panCanvas   = document.getElementById('panCanvas');
const fftCtx      = fftCanvas.getContext('2d');
const panCtx      = panCanvas.getContext('2d');

// dual-channel analysers
const splitter = audioCtx.createChannelSplitter(2);
const analyserL = audioCtx.createAnalyser();
const analyserR = audioCtx.createAnalyser();
[analyserL, analyserR].forEach(a => {
   a.fftSize = 256;
   a.smoothingTimeConstant = 0.7;
});

// (re)-wire graph:  player → splitter → L/R analysers → EQ chain…
node.disconnect();            // 'node' is last filter from your connectEQGraph()
audioCtx.createMediaElementSource(audio).connect(splitter);
splitter.connect(analyserL, 0);
splitter.connect(analyserR, 1);
analyserL.connect(eqFilters[0]);          // send left into EQ chain
splitter.connect(eqFilters[0], 1);        // send right via original path

// buffers
const lData = new Uint8Array(analyserL.frequencyBinCount);
const rData = new Uint8Array(analyserR.frequencyBinCount);

// draw loop
(function render(){
   requestAnimationFrame(render);

   // --- Frequency bars (combined) ---
   analyserL.getByteFrequencyData(lData);
   analyserR.getByteFrequencyData(rData);
   const bins = lData.length;
   fftCtx.clearRect(0,0,fftCanvas.width,fftCanvas.height);
   const barW = fftCanvas.width / bins;
   for (let i=0;i<bins;i++){
      const val = (lData[i] + rData[i]) / 2;  // merge channels
      const barH = val/255 * fftCanvas.height;
      const hue  = i/bins*260 + 100;
      fftCtx.fillStyle = `hsl(${hue} 80% 60%)`;
      fftCtx.fillRect(i*barW, fftCanvas.height-barH, barW-1, barH);
   }

   // --- Stereo pan meter ---
   const rmsL = Math.hypot(...lData) / lData.length;
   const rmsR = Math.hypot(...rData) / rData.length;
   const pan  = (rmsR - rmsL) / (rmsR + rmsL || 1);  // -1..1
   panCtx.clearRect(0,0,panCanvas.width,panCanvas.height);
   // background tick marks
   panCtx.fillStyle = 'rgba(255,255,255,0.2)';
   panCtx.fillRect(panCanvas.width/2 -1, 0, 2, panCanvas.height);
   // needle
   const cx = (pan+1)/2 * panCanvas.width;
   panCtx.fillStyle = 'var(--primary-accent)';
   panCtx.beginPath();
   panCtx.arc(cx, panCanvas.height/2, 6, 0, Math.PI*2);
   panCtx.fill();
})();

