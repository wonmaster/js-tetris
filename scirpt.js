class Tetrominos {
    constructor() {
    this.pos_x = 0;
    this.shape = [];
    this.pos_y = 0;
    this.rotation = 0;
    }
    draw(x, y,brick,ctx) {
        ctx.fillStyle = brick.color;
        ctx.strockStyle = 'black';
        ctx.lineWidth = 2 ;
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                if(this.shape[i][j] === 1) {
                    ctx.fillRect(x + j * brick.length, y + i * brick.width, brick.length, brick.width);
                    ctx.strokeRect(x + j * brick.length, y + i * brick.width, brick.length, brick.width);
                }
            }
        }
        
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
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            // Check if moving left stays within canvas bounds
            if (otetro.pos_x > 0) {
                otetro.pos_x -= 30; // Move left by 30 pixels
            }
        } else if (event.key === 'ArrowRight') {
            // Check if moving right stays within canvas bounds
            if (otetro.pos_x + otetro.shape[0].length * brick.length < canvas.width){
                otetro.pos_x += 30; 
            }
        } else if (event.key === 'ArrowDown') {
            // Check if moving down stays within canvas bounds
            if (otetro.pos_y + otetro.shape.length * brick.width < canvas.height) {
                otetro.pos_y += 5; 
            }
        }
    });

    function gameloop() {
        // Clear the canvas
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update Tetromino position
        if (otetro.pos_y + otetro.shape.length * brick.width < canvas.height) {
            otetro.pos_y += 5; // Move down
        }

        
        otetro.draw(otetro.pos_x, otetro.pos_y, brick, ctx);
    }

    // Start the game loop, calling it every 100 Millisecond
    setInterval(gameloop, 100);
}

(init)();