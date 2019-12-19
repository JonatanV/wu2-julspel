class Rock
{
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
        this.size = new Vector(1.2, 0.7);
    }

    get type()
    {
        return "rock";
    }

    static create(pos, color, speed, size) 
    {
        if (speed ) {
            console.log(speed)
            return new Rock(pos, speed, size);
        } else {
            return new Rock(pos, new Vector(0, 0));
        }
    }

    collide = function(state, keys)
    {
        if (keys.KeyG) {
            let rocks = 30;
            console.log("GRAB ROCK ZOG ZOG " + rocks);
            let filtered = state.actors.filter(a => a != this);
            return new State(state.level, filtered, state.status, state.score, rocks, state.kastat);
        }
        return state;
    }

    update = function(time, state)
    {
        let newPos = this.pos.plus(this.speed.times(time));
        return new Rock(newPos, this.speed);
    }
    
}