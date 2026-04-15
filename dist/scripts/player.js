export default class Player {
    constructor(container) {
        this.container = container;
        this.y = 50.0;
        this.velocity = 0.0;
        this.jump_force = 1.5;
        this.sprite = "./src/images/Placeholder.png";
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
        this.velocity = Math.min(v + 0.075, 1.5);
    }
    move() {
        this.gravity();
        this.y += this.velocity;
        this.element.style.top = `${this.y}%`;
        this.element.style.transform = `rotate(${this.velocity * 10}deg)`;
        console.log(`y: ${this.y}\nv: ${this.velocity}`);
    }
}
//# sourceMappingURL=player.js.map