//Youtubeのカレント動画をVideoPlayerへ送る
javascript: (function () {
    var v = document.querySelector("video");
    if (v != null) {
        v.pause();
        const u = 'https:' + '//takanaweb5.github.io/VideoPlayer/video.html?';
        const f = ytInitialPlayerResponse.streamingData.formats;
        window.open(u + f[1].url);
    }
})()