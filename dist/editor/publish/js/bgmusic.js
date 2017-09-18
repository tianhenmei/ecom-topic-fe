initMusic();
function initMusic() {
    var bgmusic_button = $(".bgmusic");
    var audio = document.getElementById("music");
    audio.preload = 'auto';
    audio.play();

    bgmusic_button.click(function (e) {
        e.stopPropagation();
        e.preventDefault();

        if ($(this).hasClass('open')) {
            audio.pause();
            bgmusic_button.removeClass("open").addClass("close");
        } else {
            audio.play();
            bgmusic_button.removeClass("close").addClass("open");
        }
    });

    autoPlayMusic(audio);
}

function autoPlayMusic(audio) {
    // 自动播放音乐效果，解决浏览器或者APP自动播放问题
    function musicInBrowserHandler() {
        musicPlay(audio, true);
        document.body.removeEventListener('touchstart', musicInBrowserHandler);
    }
    document.body.addEventListener('touchstart', musicInBrowserHandler);

    // 自动播放音乐效果，解决微信自动播放问题
    function musicInWeixinHandler() {
        musicPlay(audio, true);
        document.addEventListener("WeixinJSBridgeReady", function () {
            musicPlay(audio, true);
        }, false);
        document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
    }
    document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
}

function musicPlay(audio, isPlay) {
    if (isPlay && audio.paused) {
        audio.play();
    }
    if (!isPlay && !audio.paused) {
        audio.pause();
    }
}