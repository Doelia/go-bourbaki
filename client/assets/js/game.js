
function pause() {
    $('#pause')
        .modal({
            blurring: true,
        })
        .modal('setting', 'closable', false)
        .modal('setting', 'transition', 'horizontal flip')
        .modal('show');
}

function unpause() {
    $('#pause').modal('hide');
}

function isMyTurn() {
    return players.activePlayer == myNum;
}

/**** Fonctions simulatrices I/O ****/

function onRecvScore(json) {
    players.updatePlayers(json);
    players.updateActivePlayer();
}

function onRecvActivePlayer(numPlayer) {
    players.activePlayer = numPlayer;
    players.updateActivePlayer();
    players.startTimer();
}

function sendAddLine(x,y,o,n) {
    board.activeLine(x,y,o,n);
}

/** INIT **/

function init_game() {

    board = new Board();
    board.createGrid(10);

    players = new Players();

    $('#btn-howto').click(function() {
        $('#guide')
            .modal('setting', 'transition', 'vertical flip')
            .modal('show');
    });

    $('.ttip').popup({
        inverted: true,
        position: 'top center',
        duration: 150,
    });

    $('.line.inactive').click(function() {
        if (isMyTurn()) {
            var x = $(this).attr('x');
            var y = $(this).attr('y');
            var o = $(this).attr('o');
            var n = myNum;
            sendAddLine(x,y,o,n);
        }
    });

    //// TESTS

    myNum = 2;

    onRecvActivePlayer(2)
    onRecvScore(playersDemo);

    $('.square').click(function() {
        var x = $(this).attr('x');
        var y = $(this).attr('y');
        var n = myNum;
        board.activeSquare(x,y,n);
    });
}
