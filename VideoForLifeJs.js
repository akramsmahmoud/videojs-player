// Get a handle to the player
var player = document.getElementById('gossVideo');
var btnPlayPause = document.getElementById('btnPlayPause');
var btnMute = document.getElementById('btnMute');
var topProgressBar = document.getElementById('top-progress-bar');
var bottomProgressBar = document.getElementById('bottom-progress-bar');
var PlayButton = document.getElementById("PlayButton");
localStorage.setItem('endBtn', `<i id="PlayButtonIcon" class="fas fa-redo-alt" aria-hidden="true"></i> &nbsp; Watch Again`)
localStorage.setItem('pauseBtn', `<i id="PlayButtonIcon" class="fas fa-play" aria-hidden="true"></i> keep Watching `)
localStorage.setItem('playBtn', `<i id="PlayButtonIcon" class="fas fa-pause" aria-hidden="true"></i> &nbsp; You're Watching `)
localStorage.setItem('initialBtn', `<i id="PlayButtonIcon" class="fas fa-play"></i> &nbsp;Play Video`)
var canvas = document.getElementById('canvasId');
var context = canvas.getContext('2d');

window.addEventListener('load', function() {

    if (topProgressBar.value === 0) {
        PlayButton.innerHTML = localStorage.getItem("initialBtn")
    } else if (topProgressBar.value > 0 && topProgressBar.value <= 99) {
        PlayButton.innerHTML = localStorage.getItem('pauseBtn')
    } else {
        PlayButton.innerHTML = localStorage.getItem('endBtn')
        
        
    }
 // for canvas draw
    if (localStorage.getItem("image")) {
        let img = new Image();
        img.src = localStorage.getItem("image");

        img.onload = function() {
            context.drawImage(img, 0, 0);
        };
    }
 // for video watch count
   if(localStorage.getItem('watchCount') > 0 ){
       document.querySelector('#watched .status').innerHTML  ='Views'
    document.querySelector('#watched .statusCount').innerHTML =  localStorage.getItem('watchCount') 
      
   }
 

})


player.addEventListener('timeupdate', updateProgressBar, false);
player.addEventListener('play', function() {
     player.onended = function(){
      if(document.querySelector('#watched .statusCount').innerText == ''){
            document.querySelector('#watched .statusCount').innerHTML =0
            document.querySelector('#watched .status').innerHTML = "Views"
        }
      document.querySelector('#watched .statusCount').innerHTML =  parseInt(document.querySelector('#watched .statusCount').innerHTML) + 1
    localStorage.setItem('watchCount',document.querySelector('#watched .statusCount').innerText)
    }
    PlayButton.innerHTML = localStorage.getItem("playBtn")
     },false)
    

    


player.addEventListener('pause', function() {
   

    PlayButton.innerHTML = localStorage.getItem('pauseBtn')
}, false);

player.addEventListener('ended', function() {
    PlayButton.innerHTML = localStorage.getItem('endBtn')
   


    this.pause();
}, false);



function playPauseVideo() {
    var element = document.getElementById("PlayButtonIcon");
    if (player.paused || player.ended) {
        //debugger;
        var isClassExist = hasClass(element, "fa-play");
        if (isClassExist === true) {
            removeClass(element, "fa-play");
            addClass(element, "fa-pause");

            PlayButton.innerHTML = localStorage.getItem('pauseBtn')

        }
        player.play();
    } else {
        var isClassExist = hasClass(element, "fa-pause");
        if (isClassExist === true) {
            removeClass(element, "fa-pause");
            addClass(element, "fa-play");

            PlayButton.innerHTML = localStorage.getItem('pauseBtn')
        }
        player.pause();
    }
}


function updateProgressBar() {
    var percentage = Math.floor((100 / player.duration) * player.currentTime);
    topProgressBar.value = percentage;
    bottomProgressBar.value = percentage;
    topProgressBar.innerHTML = percentage + '% played';
    bottomProgressBar.innerHTML = percentage + '% played';
    localStorage.setItem("VideoWatchPercentage", percentage);
    localStorage.setItem("VideoEndedTime", player.currentTime);
     canvas.style.display = 'block';
    draw(player, canvas);

}






function pauseVid() {
    //debugger;
    var percentage = Math.floor((100 / player.duration) * player.currentTime);
    if (percentage > 0 && percentage < 100) {
        var element = document.getElementById("PlayButtonIcon");
        var isClassExist = hasClass(element, "fa-pause");
        if (isClassExist === true) {
            removeClass(element, "fa-pause");
            addClass(element, "fa-play");
            
            PlayButton.innerHTML = localStorage.getItem('playBtn')
        }
    }

    player.pause();
}

function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function hasClass(el, className)
{
    if (el.classList)
        return el.classList.contains(className);
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

function addClass(el, className)
{
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className))
        el.className += " " + className;
}

function removeClass(el, className)
{
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className))
    {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}
function toggleFullScreen() {


    if (player.requestFullscreen)
        if (document.fullScreenElement) {
            document.cancelFullScreen();
        } else {
            player.requestFullscreen();
        }
    else if (player.msRequestFullscreen)
        if (document.msFullscreenElement) {
            document.msExitFullscreen();
        } else {
            player.msRequestFullscreen();
        }
    else if (player.mozRequestFullScreen)
        if (document.mozFullScreenElement) {
            document.mozCancelFullScreen();
        } else {
            player.mozRequestFullScreen();
        }
    else if (player.webkitRequestFullscreen)
        if (document.webkitFullscreenElement) {
            document.webkitCancelFullScreen();
        } else {
            player.webkitRequestFullscreen();
        }
    else {
        alert("Fullscreen API is not supported");

    }
}

function draw(video, canvas) {

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    localStorage.setItem("image", canvas.toDataURL("image/jpg"));


}


updateVideo1TimeWithBar();

function updateVideo1TimeWithBar() {
    var player = document.getElementById('gossVideo');
    topProgressBar.value = localStorage.getItem("VideoWatchPercentage");
    topProgressBar.innerHTML = localStorage.getItem("VideoWatchPercentage") + '% played';
    bottomProgressBar.value = localStorage.getItem("VideoWatchPercentage");
    bottomProgressBar.innerHTML = localStorage.getItem("VideoWatchPercentage") + '% played';

    player.currentTime = parseFloat(localStorage.getItem("VideoEndedTime"));
}