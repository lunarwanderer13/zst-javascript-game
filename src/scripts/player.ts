// Player class controlling the player
export default class Player {
    public container: HTMLDivElement // The game container <div> element
    public element: HTMLImageElement // The player <img> element

    public alive: boolean      // Whether the player is alive or not
    public y: number           // The player's current vertical position
    public velocity: number    // The player's current vertical velocity
    private jump_force: number // The force of player's jump
    private sprite: string     // Player's sprite

    public constructor(container: HTMLDivElement) {
        this.container = container

        this.alive = true   // Alive by default
        this.y = 50.0       // Start falling from 50% height
        this.velocity = 0.0 // Start with no velocity

        this.jump_force = 1.5
        this.sprite = "./src/images/Placeholder.png"

        // Create the player <img> element
        // and append it to the game container <div> element
        this.element = new Image()
        this.element.src = this.sprite
        this.element.alt = "Cat"
        this.element.className = "player"
        this.container.appendChild(this.element)
    }

    // Player jump handler
    public jump(): void {
        this.velocity = -this.jump_force // Add negative force to go upward
    }

    // Gravity handler
    private gravity(): void {
        this.velocity = Math.min(this.velocity + 0.075, 1.5) // Gradually increase the velocity, max 1.5
    }

    // Player movement handler
    public move(): void {
        if (!this.alive) return

        this.gravity()
        this.y += this.velocity
        this.element.style.top = `${this.y}%`
        this.element.style.transform = `rotate(${this.velocity * 10}deg)`
    }

    // Game over animation
    public die(): void {
        this.alive = false

        this.element.animate(
            [
                { offset: 0.0, left: "25%", top: `${this.y}%`, rotate: `${this.velocity * 10}deg` }, // Initial position
                { offset: 0.1, left: "15%", top: `${this.y - 25.0}%`, rotate: `-45deg` },            // Bounce off slightly
                { offset: 1.0, left: "-5%", top: `${this.y + 135.0}%`, rotate: `-90deg` }            // Fall down
            ],
            {
                duration: 1500,   // 1.5s duration
                easing: "linear", // no easing function
                fill: "forwards"  // keep changes after animtion finishes
            }
        )
    }
}
