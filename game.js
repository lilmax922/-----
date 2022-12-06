let score = 0
let timer = 0
let countdown = 0
// 存最高分的玩家跟分數

const highest = localStorage.美冴是凶巴巴老妖怪 ? JSON.parse(localStorage.getItem('美冴是凶巴巴老妖怪')) : { player: 'Nobody', score: 0 }
$('#highestScore').text(highest.score)
$('#highestPlayer').text(highest.player)

// 讓美冴隨著時間移動到不同地方
function moveMama(mama) {
    const top = Math.round(Math.random() * 100) + '%'
    const left = Math.round(Math.random() * 100) + '%'
    mama.stop().animate({ top, left }, 2000, function () {
        if (countdown !== 0) {
            moveMama(mama)
        }
    })
}

// 小新
function movePeePee(peepee) {
    const top = Math.round(Math.random() * 100) + '%'
    const left = Math.round(Math.random() * 100) + '%'
    peepee.stop().animate({ top, left }, 5000, function () {
        if (countdown !== 0) {
            movePeePee(peepee)
        }
    })
}


// 肥嘟嘟佐衛門
function movePigPeek(pigPeek) {
    const top = Math.round(Math.random() * 100) + '%'
    const left = Math.round(Math.random() * 100) + '%'
    pigPeek.stop().animate({ top, left }, 2000, function () {
        if (countdown !== 0) {
            movePigPeek(pigPeek)
        }
    })
}

// 點擊開始按鈕
$('#start-btn').click(function () {
    // 按鈕消失
    $(this).css('display', 'none')
    // 重置分數跟時間
    score = 0
    $('#score').text(score)
    countdown = 30
    $('#timeSpent').text(countdown)

    // 遊戲開始
    timer = setInterval(() => {
        // 倒數時間
        countdown--
        $('#timeSpent').text(countdown)

        // 1 ~ 10
        const random = Math.ceil(Math.random() * 10)
        // 隨機大於3 並且 在美冴到達 30 隻內都會繼續生成
        if (random > 3 && $('.mama').length < 30) {
            // top = 隨機 0 ~ 100%
            const top = Math.round(Math.random() * 100) + '%'
            // left = 隨機 0 ~　100%
            const left = Math.round(Math.random() * 100) + '%'
            const mama = $(`<img src="./素材/生氣美冴.gif" class="mama" style="top: ${top}; left: ${left};">`)
            $('#gameArea').append(mama)
            moveMama(mama)
        }
        if (random > 1 && $('.mama').length < 30) {
            // top = 隨機 0 ~ 100%
            const top = Math.round(Math.random() * 100) + '%'
            // left = 隨機 0 ~　100%
            const left = Math.round(Math.random() * 100) + '%'
            const peepee = $(`<img src="./素材/peepee.gif" class="peepee" style="bottom: ${top}; left: ${left};">`)
            $('#gameArea').append(peepee)
            movePeePee(peepee)
        }
        // 場上美冴數量 > 5隻時開始生成肥嘟嘟佐衛門
        if (random > 7 && $('.mama').length > 7) {
            // top = 隨機 0 ~ 100%
            const top = Math.round(Math.random() * 100) + '%'
            // left = 隨機 0 ~　100%
            const left = Math.round(Math.random() * 100) + '%'
            const pigPeek = $(`<img src="./素材/躲.gif" class="pigPeek" style="bottom: ${top}; right: ${left};">`)
            $('#gameArea').append(pigPeek)
            movePigPeek(pigPeek)
        }

        // 當倒數為 0 時結束
        if (countdown === 0) {
            clearInterval(timer)
            $('#timeSpent').text("time's up")
            // $(this).css('display', 'block')
            // 清空動圖
            $('.peepee').remove()
            $('.pigPeek').remove()
            $('.mama').remove()

            if (score > highest.score) {
                highest.score = score
                Swal.fire({
                    imageUrl: './素材/雀躍.gif',
                    title: `你是最高分! 得到了 ${score} 分XD`,
                    text: 'Please Enter ur NickName',
                    input: 'text',
                    confirmButtonText: '讚讚！',
                    inputAttributes: {
                        required: true
                    },
                    validationMessage: 'NickName required here',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then(result => {
                    highest.player = result.value
                    $('#highestScore').text(highest.score)
                    $('#highestPlayer').text(highest.player)
                    localStorage.setItem("美冴是凶巴巴老妖怪", JSON.stringify(highest))
                    if (result.isConfirmed) {
                        history.go(0)
                    }
                })
            } else {
                Swal.fire({
                    title: "Time's up",
                    text: `你得到 ${score} 分XD`,
                    fontSize: '70px',
                    color: 'rgb(162,80,90)',
                    background: 'rgba(238, 225, 225, 0.8)',
                    imageUrl: './素材/動感超人小新.gif',
                    imageAlt: 'Crayon Shin-chan',
                    confirmButtonText: '再玩一次0.0',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.go(0)
                    }
                })
            }
        }
    }, 1000)
})

// 在分數 !== 0 時，點擊美冴分數 -2 
$('#gameArea').on('click', '.mama', function () {
    if (score >= 2) {
        score -= 2
        $('#score').text(score)
        $(this).css('display', 'none')
    } else if (score < 2 && score !== 0) {
        score--
        $('#score').text(score)
        $(this).css('display', 'none')
    }
})

// 點擊小新分數 +1
$('#gameArea').on('click', '.peepee', function () {
    score++
    $('#score').text(score)
    $(this).css('display', 'none')
})

// 點擊佐衛門分數 +3
$('#gameArea').on('click', '.pigPeek', function () {
    score += 3
    $('#score').text(score)
    $(this).css('display', 'none')
})