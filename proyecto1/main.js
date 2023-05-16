const songList = [
    {
        title: 'FERXXO 81',
        file: 'Feid - Ferxxo 81.mp3',
        cover: '1.jpg'
    },
    {
        title:'HOOKIA',
        file: 'Feid, Jory Boy - HOOKIA.mp3',
        cover: '2.jpg'
    },
    {
        title: 'Normal',
        file: 'Feid - Normal.mp3',
        cover: '3.jpg'
    }
    
];

//Cancion actual

let actualSong = null;

//Capturar elementos del DOM para luego usarlos
const songs = document.querySelector('#songs');
const audio = document.querySelector('#audio');
const cover = document.querySelector('#cover');
const title = document.querySelector('#title');
const playPause = document.querySelector('#play');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const progreso = document.querySelector('#progress');
const contenedorDeProgreso = document.querySelector('#progress_container');



//Escuchar clicks en los controles
play.addEventListener('click' , () => {
    if(audio.paused){
        playSong();
    }else{
        pauseSong();
    }
});
next.addEventListener('click' , () => nextSong());
prev.addEventListener('click' , () => prevSong());

//Escuchar el elemento audio 

audio.addEventListener('timeupdate' , updateProgress);

//Escuchar el evento de click en la barra de progreso

contenedorDeProgreso.addEventListener('click' , setProgress)


//Mostrar el listado de canciones 
function loadSongs (){
    songList.forEach((song , index) =>{
        //Crear li
        const li = document.createElement('li');
        //crear a 
        const link = document.createElement('a');
        //Hidratar a
        link.textContent = song.title;
        link.href = '#';
        //Escuchar clicks
        link.addEventListener('click', () => loadSong(index))
        //añadir a li
        li.appendChild(link);
        //añadir li ul
        songs.appendChild(li);
    })
};

//Reproducir cancion
function loadSong (songIndex) {
    if(songIndex !== actualSong){
        changeActiveClass(actualSong, songIndex);
        actualSong = songIndex;
        audio.src = '../music/' + songList[songIndex].file; 
        playSong();
        changeCover(songIndex);
    };
};

//Actualizar barra de progreso de la cancion

function updateProgress (event) {
    const {duration , currentTime} = event.srcElement;
    const percent = (currentTime / duration) * 100;
    progreso.style.width = percent + '%'

};

//Hacer la barra de progreso clickeable

function setProgress (event) {
    const totalWidth = this.offsetWidth
    const progressWidth = event.offsetX;
    const current = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = current 
}; 

//Actualizar Controles

function updateControls () {
    if(audio.paused){
        play.classList.remove("fa-pause");
        play.classList.add("fa-play");
    }else{
        play.classList.add('fa-pause');
        play.classList.remove('fa-play');
    }
};

//Reproducir cancion

function playSong() {
    if(actualSong !== null){
        audio.play()
        updateControls();
    }
};

//PausarCancion

function pauseSong() {
    audio.pause()
    updateControls();
};

//Cambiar clase activa

function changeActiveClass(lastIndex, newIndex) {
    const links = document.querySelectorAll("a")
    if (lastIndex !== null) {
        links[lastIndex].classList.remove("activo")
    }
    links[newIndex].classList.add("activo")
    
}

//Cambiar cancion
function changeCover(songIndex) {
    cover.src = '../img/' + songList[songIndex].cover
    changeSongTitle(songIndex);
}

//Cambiar el titulo de la cancion 
function changeSongTitle (songIndex) {
    title.innerText = songList[songIndex].title

};

//Anterior cancion 

function prevSong () {
    if(actualSong > 0){
        loadSong(actualSong - 1);
    }else{
        loadSong(2)
    }
}

//Siguiente cancion

function nextSong () {
    if(actualSong < songList.length - 1){
        loadSong(actualSong + 1);
    }else{
        loadSong(0)
    }

};

//lanzar siguiente cancion cuando se acaba la actual 

audio.addEventListener('ended' ,() => nextSong())

//GO
loadSongs();