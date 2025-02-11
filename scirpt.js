class Tetrominos {
    constructor() {
    this.pos_x = 0;
    this.shape = [];
    this.pos_y = 0;

    }
    rotate() {
        this.shape = this.shape[0].map((_, colIndex) =>
            this.shape.map(row => row[colIndex])).reverse();
    }

    draw(x, y,brick,ctx) {
        ctx.fillStyle = brick.color;
        ctx.strokeStyle = 'black';
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

    undraw(x, y, brick, ctx) {
        ctx.fillStyle = 'lightgrey'; // Match the background color
        ctx.strokeStyle = 'lightgrey';
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                if (this.shape[i][j] === 1) {
                    ctx.fillRect(x + j * brick.length, y + i * brick.width, brick.length, brick.width);
                    ctx.strokeRect(x + j * brick.length, y + i * brick.width, brick.length, brick.width)
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
        this.color = 'yellow'
    }
}

class ITetro extends Tetrominos {
    constructor() {
        super();
        this.shape = [
            [1, 1, 1, 1]
        ];
        this.color = 'lightblue'
    }
}

class TTetro extends Tetrominos {
    constructor() {
        super();
        this.shape = [
            [0, 1, 0],
            [1, 1, 1]
        ];
        this.color = 'purple'
    }
}
class STetro extends Tetrominos {
    constructor() {
        super();
        this.shape = [
            [0, 1, 1],
            [1, 1, 0]
        ];
        this.color = 'red'
    }
}

class ZTetro extends Tetrominos {
    constructor() {
        super();
        this.shape = [
            [1, 1, 0],
            [0, 1, 1]
        ];
        this.color = 'green'
    }
}


class Brick {
    constructor() {
        ;
        this.length = 20;
        this.width = 20;
    }
}


function init() {
    let canvas = document.getElementById('tetris');
    canvas.width = 1000;
    canvas.height = 650;
    let ctx = canvas.getContext('2d');
    const gridSize = 20;
    canvas.width = 20 * gridSize;
    canvas.height = 40 * gridSize;

    console.log('Tetris');
    let brick = new Brick();
    let tetros= [OTetro, ITetro, TTetro, STetro, ZTetro];
    
    let comingRandom = Math.floor(Math.random()*tetros.length);
    let random= comingRandom;

    function getNewTetromino() {
        let tetro = new tetros[random]();
        tetro.pos_x = Math.floor((canvas.width / 2) / brick.length) * brick.length;
        tetro.pos_y = 0;
        return tetro;
    }

    let thetetro= getNewTetromino();


    thetetro.draw(thetetro.pos_x, thetetro.pos_y, brick, ctx);

    document.addEventListener('keydown', (event) => {
        thetetro.undraw(thetetro.pos_x, thetetro.pos_y, brick, ctx)
        if (event.key === 'ArrowLeft') {
            // Check if moving left stays within canvas bounds
            if (thetetro.pos_x > 0) {
                thetetro.pos_x -= 20; // Move left by 30 pixels
            }
        } else if (event.key === 'ArrowRight') {
            // Check if moving right stays within canvas bounds
            if (thetetro.pos_x + thetetro.shape[0].length * brick.length < canvas.width){
                thetetro.pos_x += 20; 
            }
        } else if (event.key === 'ArrowDown') {
            // Check if moving down stays within canvas bounds
            if (thetetro.pos_y + thetetro.shape.length * brick.width < canvas.height) {
                thetetro.pos_y += 20; 
            }else if (event.key === 'ArrowUp') {
                thetetro.rotate();
            }
        }
        thetetro.draw(thetetro.pos_x, thetetro.pos_y, brick, ctx);
    });

    function gameloop() {
        // Clear the canvas
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update Tetromino position
        if (thetetro.pos_y + thetetro.shape.length * brick.width < canvas.height) {
            thetetro.pos_y += 20; // Move down
        }
        else {
        
        thetetro = getNewTetromino()

    }

        
        thetetro.draw(thetetro.pos_x, thetetro.pos_y, brick, ctx);
    }

    // Start the game loop, calling it every 100 Millisecond
    setInterval(gameloop, 500);
}

(init)();