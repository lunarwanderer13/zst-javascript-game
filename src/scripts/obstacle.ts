// Scratching post class
export default class Obstacle {
    public container: HTMLDivElement        // The game container <div> element
    public original_element: HTMLDivElement // Original obstacle
    public element: HTMLDivElement          // Cloned obstacle

    public x: number        // The obstacle's current horizontal position
    public y: number        // The obstacle's current vertical position
    public y_offset: number // The obstacle's current vertical offset
    public velocity: number // The obstacle's horizontal velocity
    public passed: boolean  // Whether the obstacle has been passed

    public constructor(container: HTMLDivElement, original_element: HTMLDivElement) {
        this.container = container
        this.original_element = original_element

        this.x = 110.0 // Starting horizontal position
        this.y = -25.0 // Starting vertical position
        this.y_offset = Math.floor(Math.random() * (51)) - 25
        this.y += this.y_offset

        this.velocity = 0.2
        this.passed = false

        // Clone the original element
        // and append it to the game container <div> element
        this.element = original_element.cloneNode(true) as HTMLDivElement
        this.element.className = "obstacle"
        this.element.style.left = `${this.x}%`
        this.element.style.top = `${this.y}%`
        this.container.appendChild(this.element)
    }

    public move(): void {
        this.x -= this.velocity
        this.element.style.left = `${this.x}%`
    }
}
