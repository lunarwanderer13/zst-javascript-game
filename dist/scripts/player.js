export default class Player {
    constructor(container) {
        this.container = container;
        this.y = 0.5;
        this.velocity = 0.0;
        this.jump_force = 1.0;
        this.sprite = "./../../src/images/Placeholder.png";
        this.element = new Image();
        this.element.src = this.sprite;
        this.element.alt = "Cat";
        this.element.className = "player";
        this.container.appendChild(this.element);
    }
    jump() {
        this.velocity = -this.jump_force;
    }
    gravity() {
        let v = this.velocity;
        this.velocity = Math.min(v + 0.05, 1.0);
    }
    move() {
        this.gravity();
        this.y += this.velocity;
        this.element.style.top = `${this.y * 100}%`;
        this.element.style.transform = `rotate(${this.velocity * 10}deg)`;
    }
}
//# sourceMappingURL=player.js.map