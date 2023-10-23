/* ============================================================================
    まるばつゲーム：プレイヤーはまる、CPUはばつ
============================================================================ */
const gameBoard = document.getElementById('game_board');
let messageBox = document.createElement('p');
let playFirstSelector = [];
let playAgain = document.createElement('div');
let playFirstSelectorValue = [
    ['先攻', 'rgb(255, 219, 219)'],
    ['後攻', 'rgb(219, 219, 255)']
];
let squares = new Array(3);    // gameBoardにマスを作成し管理するための変数
let PlayerPlayFirst = true;    // 手番管理の変数。初期値はプレイヤーが先攻


/* ============================================================================
    ゲーム版のマスを作成：作成後は、非表示にしておく
============================================================================ */
for (let x = 0; x < 3; x++) {
    squares[x] = new Array(3);
    for (let y = 0; y < 3; y++) {
        squares[x][y] = document.createElement('div');
        squares[x][y].className = 'square';
        gameBoard.appendChild(squares[x][y]);
        squares[x][y].style.display = 'none';
    }
}


/* ============================================================================
    先攻・後攻を選択
============================================================================ */
messageBox.className = 'message_box';
gameBoard.appendChild(messageBox);
function startSelector() {
    messageBox.textContent = '先攻・後攻を選択して下さい';
    for (let i = 0; i < 2; i++) {
        playFirstSelector[i] = document.createElement('div');
        playFirstSelector[i].className = 'play_first_selector';
        playFirstSelector[i].textContent = playFirstSelectorValue[i][0];
        playFirstSelector[i].style.backgroundColor = playFirstSelectorValue[i][1];
        gameBoard.appendChild(playFirstSelector[i]);
        playFirstSelector[i].addEventListener('click', function(event) {
            if (this.textContent == playFirstSelectorValue[1][0]) {
                PlayerPlayFirst = false;
            } else {
                messageBox.textContent = 'あなたの番です';
            }
            gameStart();
            for (let i = 0; i < 2; i++) {
                playFirstSelector[i].remove();
            }
        }, false);
    }
}
startSelector();


/* ============================================================================
    ゲーム開始：マスの表示およびクリックイベントの設定
============================================================================ */
function gameStart() {
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            squares[x][y].style.display = 'block';
            squares[x][y].addEventListener('click', squareClick);
        }
    }
    if (!(PlayerPlayFirst)) {
        computerPlayer();
    }
}


/* ============================================================================
    マスが押された時の処理：プレイヤーのターン処理
============================================================================ */
function squareClick() {

}


/* ============================================================================
    CPUの処理
============================================================================ */
function computerPlayer() {

}


/* ============================================================================
    リサイズ時のイベント：親要素の幅、高さ、どちらか小さい方に合わせて正方形にする
============================================================================ */
function windowResize() {
    let cw = gameBoard.parentElement.clientWidth;
    let ch = gameBoard.parentElement.clientHeight;
    if (cw > ch) {
        gameBoard.style.width = ch + 'px';
    } else {
        gameBoard.style.width = cw + 'px';
    }
}
windowResize();
window.addEventListener('resize', windowResize);