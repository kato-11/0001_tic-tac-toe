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
    if (PlayerPlayFirst) {
        let l = this.classList;
        if (l.contains('valueO') || l.contains('valueX')) {
            return;
        } else {
            l.add('valueO');
        }
        if (!(gameOverCheck())) {
            PlayerPlayFirst = false;
            computerPlayer();
        }
    }
}


/* ============================================================================
    CPUの処理：完全ランダムでマスを選択
============================================================================ */
function computerPlayer() {
    messageBox.textContent = '相手の番です';
    let tmpFlag = 0;
    let tmpX = Math.floor(Math.random() * 3);
    let tmpY = Math.floor(Math.random() * 3);
    while (tmpFlag == 0) {
        let e = squares[tmpX][tmpY];
        if (e.classList.contains('valueO') || e.classList.contains('valueX')) {
            tmpX = Math.floor(Math.random() * 3);
            tmpY = Math.floor(Math.random() * 3);
        } else {
            e.classList.add('valueX');
            tmpFlag = 1;
        }
    }
    if (!(gameOverCheck())) {
        PlayerPlayFirst = true;
        messageBox.textContent = 'あなたの番です';
    }
}


/* ============================================================================
    ゲーム終了のチェック
============================================================================ */
function gameOverCheck() {
    let WinLose = result();    // 2:win 1:lose 0:draw -1:continue
    if (WinLose >= 0) {
        /* ===== マスのクリックイベントを削除 ===== */
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                squares[x][y].removeEventListener('click', squareClick);
            }
        }
        switch (WinLose) {
            case 0:
                messageBox.textContent = '引き分け';
                break;
            case 1:
                messageBox.textContent = 'あなたの負けです';
                break;
            case 2:
                messageBox.textContent = 'あなたの勝ちです';
                break;
        }
        playAgain.className = 'play_again';
        playAgain.textContent = 'もう一度プレイ';
        gameBoard.appendChild(playAgain);
        playAgain.addEventListener('click', resetGame);
        return true;
    } else {
        return false;
    }
}


/* ============================================================================
    勝敗のチェック：返り値　2:win  1:lose  0:draw  -1:continue
============================================================================ */
function result() {
    if (check3('valueO')) return 2;
    if (check3('valueX')) return 1;
    let temp = 0;
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            let e = squares[x][y].classList;
            if (e.contains('valueO') || e.contains('valueX')) {
                temp += 1;
            }
        }
    }
    if (temp >= 9) return 0;
    return -1;
}


/* ============================================================================
    引数で受け取ったクラスが3つ並んでいるかのチェック：揃った箇所は色をぬる
============================================================================ */
function check3(str) {
    let flag = false;
    for (let i = 0; i < 3; i++) {
        if (squares[i][0].classList.contains(str)
        && squares[i][1].classList.contains(str)
        && squares[i][2].classList.contains(str)) {
            squares[i][0].style.backgroundColor = '#FFFF99';
            squares[i][1].style.backgroundColor = '#FFFF99';
            squares[i][2].style.backgroundColor = '#FFFF99';
            flag = true;
        }
        if (squares[0][i].classList.contains(str)
        && squares[1][i].classList.contains(str)
        && squares[2][i].classList.contains(str)) {
            squares[0][i].style.backgroundColor = '#FFFF99';
            squares[1][i].style.backgroundColor = '#FFFF99';
            squares[2][i].style.backgroundColor = '#FFFF99';
            flag = true;
        }
    }
    if (squares[0][0].classList.contains(str)
    && squares[1][1].classList.contains(str)
    && squares[2][2].classList.contains(str)) {
        squares[0][0].style.backgroundColor = '#FFFF99';
        squares[1][1].style.backgroundColor = '#FFFF99';
        squares[2][2].style.backgroundColor = '#FFFF99';
        flag = true;
    }
    if (squares[0][2].classList.contains(str)
    && squares[1][1].classList.contains(str)
    && squares[2][0].classList.contains(str)) {
        squares[0][2].style.backgroundColor = '#FFFF99';
        squares[1][1].style.backgroundColor = '#FFFF99';
        squares[2][0].style.backgroundColor = '#FFFF99';
        flag = true;
    }
    return flag;
}


/* ============================================================================
    もう一度プレイボタンを押した時の処理
============================================================================ */
function resetGame() {
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if (squares[x][y].classList.contains('valueO')) {
                squares[x][y].classList.remove('valueO');
            }
            if (squares[x][y].classList.contains('valueX')) {
                squares[x][y].classList.remove('valueX');
            }
            squares[x][y].style.display = 'none';
            squares[x][y].style.backgroundColor = '#FFFFFF';
        }
    }
    PlayerPlayFirst = true;
    playAgain.remove();
    startSelector();
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