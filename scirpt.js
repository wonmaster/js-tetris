class Tetrominos {
    constructor() {
    this.pos_x = 0;
    this.shape = [];
    this.pos_y = 0;
    this.rotation = 0;
    }
}

class OTetro extends Tetrominos {
    constructor() {
        super();
        this.shape = [
            [1, 1],
            [1, 1]
        ];
    }
}

class Brick {
    constructor() {
        this.color = 'blue';
        this.length = 20;
        this.width = 20;
    }
}

function init() {
    let canvas = document.getElementById('tetris');
    canvas.width = 500;
    canvas.height = 680;
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log('Tetris');
    let brick = new Brick();
    ctx.fillStyle = brick.color;
    ctx.fillRect(0, 0, brick.length, brick.width);
    ctx.strockStyle = 'black';
    console.log('Brick');
}

(init)();