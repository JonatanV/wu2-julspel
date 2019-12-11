var canShoot = true,
    shootDelay = 2,
    shootMinimize = 0.1;


class State {
    constructor(level, actors, status, score, rocks, kastat, timer, health) {
        this.level = level;
        this.actors = actors;
        this.status = status;
        this.score = score;
        this.rocks = rocks;
        this.maxScore = actors.filter(x => x === Item).length;
        this.kastat = kastat || 0;
        this.timer = timer || 0;
        this.health = health || 100;
        this.itemCount = this.items;
    }

    static start(level) {
        return new State(level, level.startActors, "playing", 0, 0);
        
    }

    get player() {
        return this.actors.find(a => a.type == "player");
    }

    overlap = function (actor1, actor2) {
        return actor1.pos.x + actor1.size.x > actor2.pos.x &&
            actor1.pos.x < actor2.pos.x + actor2.size.x &&
            actor1.pos.y + actor1.size.y > actor2.pos.y &&
            actor1.pos.y < actor2.pos.y + actor2.size.y;
    }

    update = function (time, keys) {
        let actors = this.actors.map(actor => actor.update(time, this, keys));
        let newState = new State(this.level, actors, this.status, this.score, this.rocks, this.kastat, this.timer);

        if (newState.status != "playing") return newState;

        let player = newState.player;

        if (canShoot == false){
            shootDelay += -shootMinimize;
            if (shootDelay <= 0) {
                shootDelay = 2; 
                canShoot = true;
            }
        }

        if (keys.Space && this.rocks > 0) {
            if (canShoot == true){
                if (speed == true) {
                    actors.push(Rock.create(player.pos, false, new Vector(10, 0)));
                    newState.rocks--;                    
                    canShoot = false;
                } else {
                    actors.push(Rock.create(player.pos, false, new Vector(-10, 0)));
                    newState.rocks--;
                    canShoot = false;
                }
            }
                console.log(this.kastat);

        }


        if (this.level.touches(player.pos, player.size, "lava")) {
            return new State(this.level, actors, "lost", this.score, this.rocks, this.kastat, this.timer);
        }

        for (let actor of actors) {
            if (actor != player && this.overlap(actor, player)) {
                newState = actor.collide(newState, keys);
            }
        }

        return newState;
    }
}