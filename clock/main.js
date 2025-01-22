// idを使って要素を取得
const clockText = document.getElementById("clock")

// 現在時刻を使ってテキストを更新
function updateTime() {
    const time = new Date()
    clockText.textContent = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
}

// 1秒ごとに updateTime 関数を実行
setInterval(updateTime, 1000)