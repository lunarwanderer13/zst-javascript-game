// Scratching post class
export default class Obstacle {
    constructor(container, original_element) {
        this.container = container;
        this.original_element = original_element;
        this.x = 110.0; // Starting horizontal position
        this.y = -25.0; // Starting vertical position
        this.y_offset = Math.floor(Math.random() * (51)) - 25;
        this.y += this.y_offset;
        this.velocity = 0.125;
        // Clone the original element
        // and append it to the game container <div> element
        this.element = original_element.cloneNode(true);
        this.element.className = "obstacle";
        this.element.style.left = `${this.x}%`;
        this.element.style.top = `${this.y}%`;
        this.container.appendChild(this.element);
    }
    move() {
        this.x -= this.velocity;
        this.element.style.left = `${this.x}%`;
    }
}
//# sourceMappingURL=obstacle.js.map