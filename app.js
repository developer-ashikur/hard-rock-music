const songName = document.getElementById('song-name');
const displayResult = document.getElementById('display-songs');
const showError = document.getElementById('error');
const displayLyrics = document.getElementById('lyrics');

const getSongs = async () => {
    displayLyrics.innerHTML = '';
    showError.innerText = '';
    try{
        const res = await fetch(`https://api.lyrics.ovh/suggest/${songName.value}`);
        const data = await res.json();
        displaySongs(data.data);
    }
    catch (error) {
        displayError(`Sorry!! Something went wrong. Please try again later.`);
    }
}

const displaySongs = songs => {
    displayResult.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        const songDetails = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.album.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio src="${song.preview}" controls></audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" onclick="getLyrics('${song.artist.name}' , '${song.title}')">Get Lyrics</button>
            </div>
        `;
        songDiv.innerHTML = songDetails;
        displayResult.appendChild(songDiv);
    });
}

const getLyrics = async (artist, title) => {
    displayLyrics.innerHTML = '';
    try{
        const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        const data = await res.json();
        showLyrics(data.lyrics);
    }
    catch (error) {
        displayError(`Something went wrong! Please try again later.`);
    }
    
}

const showLyrics = lyrics => {
    const lyricP = document.createElement('p');
    lyricP.innerText = lyrics;
    displayLyrics.appendChild(lyricP);
}

const displayError = error =>{
    showError.innerText = error;
}