/* ============================================================================
    まるばつゲーム　：　プレイヤーはまる、CPUはばつ
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
    ゲーム版のマスを作成（作成後は、非表示にしておく）
============================================================================ */
for (let x = 0; x < 3; x++) {
    squares[x] = new Array(3);
    for (let y = 0; y < 3; y++) {
        squares[x][y] = document.createElement('div');
        squares[x][y].className = 'square';
    }
}