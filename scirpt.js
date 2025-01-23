class Tetrominos {
    constructor() {
    this.pos_x = 0;
    this.shape = [];
    this.pos_y = 0;
    this.rotation = 0;
    }
    draw(x, y,brick,ctx) {
        ctx.fillStyle = brick.color;
        
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                if(this.shape[i][j] === 1) {
                    ctx.fillRect(x + j * brick.length, y + i * brick.width, brick.length, brick.width);
                }
            }
        }
        ctx.strockStyle = 'white';
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

class ITetro extends Tetrominos {
    constructor() {
        super();
        this.shape = [
            [1, 1, 1, 1]
        ];
    }
}

class TTetro extends Tetrominos {
    constructor() {
        super();
        this.shape = [
            [0, 1, 0],
            [1, 1, 1]
        ];
    }
}
class STetro extends Tetrominos {
    constructor() {
        super();
        this.shape = [
            [0, 1, 1],
            [1, 1, 0]
        ];
    }
}

class ZTetro extends Tetrominos {
    constructor() {
        super();
        this.shape = [
            [1, 1, 0],
            [0, 1, 1]
        ];
    }
}

// class QTetro extends Tetrominos {
//     constructor() {
//         super();
//         this.shape = [
//             [0, 0, 0,0,0,0,0],
//             [1, 1, 0,0,0,0,0],
//             [1, 1, 1,1,1,1,0],
//             [1, 1, 1,1,1,1,1],
//             [1, 1, 0,0,0,1,1],
//             [0, 0, 0,0,0,0,0],
//         ];
//     }
// }

class Brick {
    constructor() {
        this.color = 'blue';
        this.length = 30;
        this.width = 30;
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
    let otetro=new TTetro();
    let brick = new Brick();
    otetro.draw(0,0,brick,ctx);
    console.log('Otetro');
    // let brick = new Brick();
    // ctx.fillStyle = brick.color;
    // ctx.fillRect(0, 0, brick.length, brick.width);
    // ctx.strockStyle = 'black';
    // console.log('Brick');
}

(init)();