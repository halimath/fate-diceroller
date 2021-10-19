/**
 * The result of rolling a single fate die.
 */
 export type Roll = 1 | 0 | -1

 /**
  * Rating implements a character's skill or similar rating which gets added to the rolls.
  */
 export type Rating = 0 | 1 | 2 | 3 | 4 | 5 
 
 /**
  * Total implements the overall result. It contains the numbers of "the ladder" (from -2 up to +8)
  * and contains values to describe "below" or "above" the ladder.
  */
 export type Total = "below" | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "above"
 
 export class Result {
     static roll (rating: Rating): Result {
        return new Result([
            randomRoll(),
            randomRoll(),
            randomRoll(),
            randomRoll(),
        ], rating) 
    }

     constructor (public readonly rolls: [Roll, Roll, Roll, Roll], public readonly rating: Rating) {}
 
     get total(): Total {
         const val = (this.rating + this.rolls.reduce((p, c) => p + c, 0))
         if (val <= -3) {
             return "below"
         }
 
         if (val >= 9) {
             return "above"
         }
 
         return val as Total
     }
 }

function randomRoll(): Roll {
    return (Math.floor(Math.random() * 3) - 1) as Roll
}

// --

export class Player {
    constructor (public readonly id: string, public readonly name: string, public readonly fatePoints: number) {}
}

export class Table {
    constructor (public readonly id: string, public readonly title: string, public readonly players: Array<Player>) {}

    findPlayer(id: string): Player | undefined {
        return this.players.find(p => p.id === id)
    }
}

export class PlayerCharacter {
    constructor (
        public readonly userId: string,
        public readonly table: Table, 
        public readonly result?: Result) {}

    roll(rating: Rating): PlayerCharacter {
        return new PlayerCharacter(this.userId, this.table, Result.roll(rating))
    }

    get fatePoints(): number {
        return this.table.findPlayer(this.userId)?.fatePoints ?? 0
    }
}

export class Gamemaster {
    constructor (
        public readonly userId: string,
        public readonly table: Table
    ) {}
}

export class Home {
    constructor (public readonly userId: string) {}
}

export type Model = Home | PlayerCharacter | Gamemaster

