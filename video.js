let player;
window.onload = onLoad;

function onLoad() {
    const herf = new URL(window.location.href);
    const videoUri = herf.search.substr(1);
    document.getElementById("url").value = videoUri;
    CreateVideoPlayer();
};

function onOpen() {
    let url = document.getElementById("url").value;
    // let url = 'https://vjs.zencdn.net/v/oceans.mp4';
    if (!url) {return};
    loadVideo(url);
};

function loadVideo(url) {
    const data = {
        src: url,
        type: 'video/mp4',
    };
    player.pause();
    player.src(data);
    player.load(data);
};

function onPause(e) {
    if (e.target.tagName.toLowerCase() != "div") {return};
    if (player.paused()){
        player.play();
    }else{
        player.pause();
    }
};

function changeRate(rate) {
    const newRate = (player.playbackRate() + rate).toFixed(1);
    player.playbackRate(newRate);
};

function skip(sec) {
    let newTime = player.currentTime() + sec;
    player.currentTime(newTime);
};

function CreateVideoPlayer() {
    player = videojs('my-player', { 
        controls: true, 
        preload: 'auto',
        autoplay: false,
        muted: false,
        controlBar: {
            children: [
                {name: 'playToggle'},         
                {name: 'progressControl'},   
                {name: 'currentTimeDisplay'}, 
                {name: 'TimeDivider'},   
                {name: 'durationDisplay'},  
                {name: 'volumePanel',  
                    inline: true,  
                },
                {name: 'FullscreenToggle'},
                ]
            },
        }
    );

    // skipボタンの追加
    player.addChild(CreateSkip(), {});
    document.getElementById("skip").addEventListener("click", onPause);

    // controlbar内にskipボタン追加
    player.getChild("controlBar").addChild(CreateControlBarSkip(), {}, 6);

    // 再生速度変更ボタンの追加
    player.getChild("controlBar").addChild(CreateRateChange(), {}, 6);
    player.on("ratechange",function(){　// 再生速度変更時
        document.getElementById("ratevalue").innerHTML = (player.playbackRate()).toFixed(1) + 'x'; 
        }
    );
};

// skipボタンコンポーネントの作成
function CreateSkip() {
    let newElement = `
        <div class="skip" id="skip">
            <div class="skipbtn">
                <svg onClick="skip({???0})" width="2.5em" height="2.5em" viewBox="0 0 32 32">
                    <path d="M1,16 c0,8.284,6.716,15,15,15s15-6.716,15-15S24.284,1,16,1C10.657,1,5.966,3.794,3.309,8" fill="none" stroke="#fff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                    <polyline fill="none" points="3,0 3,8 11,8" stroke="#fff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                    <text x="51%" y="53%" font-size="50%" font-family="sans-serif" text-anchor="middle" dominant-baseline="central" fill="#fff" stroke="#fff" stroke-width="0"
                    >{???0}</text>
                </svg>
            </div>
            <div class="skipbtn">
                <svg onClick="skip({???1})" width="2.5em" height="2.5em" viewBox="0 0 32 32">
                    <path d="M1,16 c0,8.284,6.716,15,15,15s15-6.716,15-15S24.284,1,16,1C10.657,1,5.966,3.794,3.309,8" fill="none" stroke="#fff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                    <polyline fill="none" points="3,0 3,8 11,8" stroke="#fff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                    <text x="51%" y="53%" font-size="50%" font-family="sans-serif" text-anchor="middle" dominant-baseline="central" fill="#fff" stroke="#fff" stroke-width="0"
                    >{???1}</text>
                </svg>
            </div>
            <div class="skipbtn">
                <svg onClick="skip({???2})" width="2.5em" height="2.5em" viewBox="0 0 32 32">
                    <path d="M31,16 c0,8.284-6.716,15-15,15S1,24.284,1,16S7.716,1,16,1c5.343,0,10.034,2.794,12.691,7" fill="none" stroke="#fff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                    <polyline fill="none" points="29,0 29,8 21,8" stroke="#fff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                    <text x="51%" y="53%" font-size="50%" font-family="sans-serif" text-anchor="middle" dominant-baseline="central" fill="#fff" stroke="#fff" stroke-width="0"
                    >{???2}</text>
                </svg>
            </div>
            <div class="skipbtn">
                <svg onClick="skip({???3})" width="2.5em" height="2.5em" viewBox="0 0 32 32">
                    <path d="M31,16 c0,8.284-6.716,15-15,15S1,24.284,1,16S7.716,1,16,1c5.343,0,10.034,2.794,12.691,7" fill="none" stroke="#fff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                    <polyline fill="none" points="29,0 29,8 21,8" stroke="#fff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                    <text x="51%" y="53%" font-size="50%" font-family="sans-serif" text-anchor="middle" dominant-baseline="central" fill="#fff" stroke="#fff" stroke-width="0"
                    >{???3}</text>
                </svg>
            </div>
        </div>
    `
    const skipTimes = [-10, -3, 10, 30];
    for(i=0;i<4;i++){
        newElement = newElement.replace("{???" + i +"}", skipTimes[i]);
        newElement = newElement.replace("{???" + i +"}", Math.abs(skipTimes[i]));
    }
    const Component = videojs.getComponent('Component');
    const result = new Component(player);
    result.el().innerHTML = newElement;
    return result;
}

// controlbar内のskipボタンコンポーネントの作成
function CreateControlBarSkip() {
    let newElement = `
        <div class="skip2">
            <svg onClick="skip({???0})" width="2.5em" height="2.5em" viewBox="0 0 32 32">
                <path d="M1,16 c0,8.284,6.716,15,15,15s15-6.716,15-15S24.284,1,16,1C10.657,1,5.966,3.794,3.309,8" fill="none" stroke="#fff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                <polyline fill="none" points="3,0 3,8 11,8" stroke="#fff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                <text x="51%" y="53%" font-family="sans-serif" text-anchor="middle" dominant-baseline="central" fill="#fff" stroke="#fff" stroke-width="0"
                >{???0}</text>
            </svg>
            <svg onClick="skip({???1})" width="2.5em" height="2.5em" viewBox="0 0 32 32">
                <path d="M1,16 c0,8.284,6.716,15,15,15s15-6.716,15-15S24.284,1,16,1C10.657,1,5.966,3.794,3.309,8" fill="none" stroke="#fff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                <polyline fill="none" points="3,0 3,8 11,8" stroke="#fff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                <text x="51%" y="53%" font-family="sans-serif" text-anchor="middle" dominant-baseline="central" fill="#fff" stroke="#fff" stroke-width="0"
                >{???1}</text>
            </svg>
            <svg onClick="skip({???2})" width="2.5em" height="2.5em" viewBox="0 0 32 32">
                <path d="M31,16 c0,8.284-6.716,15-15,15S1,24.284,1,16S7.716,1,16,1c5.343,0,10.034,2.794,12.691,7" fill="none" stroke="#fff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                <polyline fill="none" points="29,0 29,8 21,8" stroke="#fff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                <text x="51%" y="53%" font-family="sans-serif" text-anchor="middle" dominant-baseline="central" fill="#fff" stroke="#fff" stroke-width="0"
                >{???2}</text>
            </svg>
            <svg onClick="skip({???3})" width="2.5em" height="2.5em" viewBox="0 0 32 32">
                <path d="M31,16 c0,8.284-6.716,15-15,15S1,24.284,1,16S7.716,1,16,1c5.343,0,10.034,2.794,12.691,7" fill="none" stroke="#fff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                <polyline fill="none" points="29,0 29,8 21,8" stroke="#fff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
                <text x="51%" y="53%" font-family="sans-serif" text-anchor="middle" dominant-baseline="central" fill="#fff" stroke="#fff" stroke-width="0"
                >{???3}</text>
            </svg>
        </div>
    `
    const skipTimes = [-10, -3, 10, 30];
    for(i=0;i<4;i++){
        newElement = newElement.replace("{???" + i +"}", skipTimes[i]);
        newElement = newElement.replace("{???" + i +"}", Math.abs(skipTimes[i]));
    }
    const Component = videojs.getComponent('Component');
    const result = new Component(player);
    result.el().innerHTML = newElement;
    return result;
}

// 再生速度変更ボタンコンポーネントの作成
function CreateRateChange() {
    const Component = videojs.getComponent('Component');
    const result = new Component(player);
    result.el().innerHTML = `
        <div class="changeRate">
            <button onClick="changeRate(-0.1)">&nbsp;◀</button>
            <span onClick="player.playbackRate(1.0)" class="ratevalue" id="ratevalue">1.0x</span>
            <button onClick="changeRate(+0.1)">▶&nbsp;</button>
        </div>
    `
    return result;
}
