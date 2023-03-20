const prompt = require('prompt-sync')({sigint: true});

const wG = '^';
const ho = 'O';
const fC = '░';
const pC = '*';
const fillers = [ho, fC, fC, fC, fC]

class Field {
  constructor() {
    this._field = []
    this._curState = [0,0]
    this._newState = [0,0]
    this._direction = ''
  }
  generateField() {
    const height = prompt('Input map height (number): ')
    const width = prompt('Input map width (number): ')
    for (let i=0; i <= height-1; i++) {
        this._field.push([])
            for (let j=0; j <= width-1; j++) {
                this._field[i].push(fillers[Math.floor(Math.random() * fillers.length)])
            }
    }
    this._field[0][0] = pC
    const haty = Math.floor(Math.random() * height-1)+1
    const hatx = Math.floor(Math.random() * width-1)+1
    this._field[haty][hatx] = wG
  }
  print() {
    for (const line of this._field) {
      console.log(line.join(''))
    }
  }
  updateMap() {
    this._field[this._curState[0]][this._curState[1]] = fC
    this._field[this._newState[0]][this._newState[1]] = pC
    this._curState = [this._newState[0],this._newState[1]]
  }
  updateState() {
    this._direction = prompt('Which direction? ').toLowerCase()
    switch (this._direction) {
        case 'u': {
            this._newState[0] -= 1
            break;
        }
        case 'd': {
            this._newState[0] += 1
            break
        }
        case 'r': {
            this._newState[1] += 1
            break
        }
        case 'l': {
            this._newState[1] -= 1
            break
        }
        default: {
            console.log('Invalid input! Try u, d, r or l')
        }
    }
  }
  checkMove() {
    const loc = this._field[this._newState[0]][this._newState[1]]
    if (this._newState[0] < 0 || this._newState[1] < 0 || this._newState[0] > this._field.length-1 || this._newState[1] > this._field[0].length-1) {
        console.log('You fell off the map! You lose!')
        return false
    }
    if (loc === ho) {
        console.log('You fell into a hole! You lose!')
        return false
    } else if (loc === wG) {
        console.log('You win!')
        return false
    } else {
        return true
    }
  }
}

let loop = true
const myField = new Field

myField.generateField(2,2)
myField.print()

while(loop) {
    myField.updateState()
    if (!myField.checkMove()) {
        break;
    }
    myField.updateMap()
    myField.print()
}