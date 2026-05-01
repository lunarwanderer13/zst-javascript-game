// Player class controlling the player
export default class Player {
    constructor(container) {
        this.container = container;
        this.alive = true; // Alive by default
        this.y = 47.5; // Start falling from 50% height
        this.velocity = 0.0; // Start with no velocity
        this.jump_force = 1.25;
        this.sprite = "./src/images/cat.png";
        this.jump_sfx = new Audio("./src/sounds/jump.wav");
        this.score_sfx = new Audio("./src/sounds/score.wav");
        this.death_sfx = new Audio("./src/sounds/death.wav");
        this.gameover_sfx = new Audio("./src/sounds/gameover.wav");
        // Create the player <img> element
        // and append it to the game container <div> element
        this.element = new Image();
        this.element.src = this.sprite;
        this.element.alt = "Cat";
        this.element.className = "player";
        this.container.appendChild(this.element);
    }
    // Player jump handler
    jump() {
        this.velocity = -this.jump_force; // Add negative force to go upward
    }
    // Gravity handler
    gravity() {
        this.velocity = Math.min(this.velocity + 0.05, 1.5); // Gradually increase the velocity, max 1.5
    }
    // Player movement handler
    move() {
        if (!this.alive)
            return;
        this.gravity();
        this.y += this.velocity;
        this.element.style.top = `${this.y}%`;
        this.element.style.transform = `rotate(${this.velocity * 10}deg)`;
    }
    // Game over animation
    die() {
        this.alive = false;
        this.element.animate([
            { offset: 0.0, left: "25%", top: `${this.y}%`, rotate: `${this.velocity * 10}deg` }, // Initial position
            { offset: 0.1, left: "15%", top: `${this.y - 25.0}%`, rotate: `-45deg` }, // Bounce off slightly
            { offset: 1.0, left: "-5%", top: `${this.y + 135.0}%`, rotate: `-90deg` } // Fall down
        ], {
            duration: 1500, // 1.5s duration
            easing: "linear", // no easing function
            fill: "forwards" // keep changes after animtion finishes
        });
    }
}
//# sourceMappingURL=player.js.map