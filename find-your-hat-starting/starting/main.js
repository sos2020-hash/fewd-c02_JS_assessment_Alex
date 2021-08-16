const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(field = [[]]) {
        this.field = field;
        this.locationx = 0;
        this.locationy = 0;
        this.field[0][0] = pathCharacter;
    }

    playGame() {
        let playing = true;
        while (playing) {
            this.print();
            this.question();
            if (!this.onGround()) {
                console.log("You are out of ground!!");
                playing = false;
                break;
            } else if (this.onhole()) {
                console.log("You are drop in the hole!!");
                playing = false;
                break;
            } else if (this.ishat()) {
                console.log("You find the hat!!");
                playing = false;
                break;
            }
            this.field[this.locationy][this.locationx] = pathCharacter;
        }
    }

    print() {
        const arrFieldWhole = this.field.map(row => {
            return row.join('')
        }).join('\n');
        console.log(arrFieldWhole);
    }
    
    question() {
        let answer = prompt("Which way you want to go?").toUpperCase();
        switch(answer){
            case "U":
                this.locationy--;
                break;
            case "D":
                this.locationy++;
                break;
            case "L":
                this.locationx--;
                break;
            case "R":
                this.locationx++;
                break;
            default:
                console.log("You can type u , d , l, r");
                this.question();
                break; 
        }
    }

    onGround() {
        return this.locationx <= this.field[0].length && this.locationy <= this.field.length && this.locationx >= 0 && this.locationy >= 0;
    }

    onhole() {
        return this.field[this.locationy][this.locationx] === hole;
    }

    ishat() {
        return this.field[this.locationy][this.locationx] === hat;
    } 
    
    static generateField(height, width, percentage = 0.1) {
        const field = new Array(height).fill(0).map(el => new Array(width));
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const prob = Math.random();
            field[y][x] = prob > percentage ? fieldCharacter : hole;
          }
        }

        const hatLocation = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height)
        };

        while (hatLocation.x === 0 && hatLocation.y === 0) {
          hatLocation.x = Math.floor(Math.random() * width);
          hatLocation.y = Math.floor(Math.random() * height);
        }
        field[hatLocation.y][hatLocation.x] = hat;
        return field;
      }
    }


const myfield = new Field(Field.generateField(10, 10, 0.2));
myfield.playGame();