export default class Player {
    public container: HTMLDivElement
    public element: HTMLImageElement

    public alive: boolean
    public y: number
    public velocity: number
    private jump_force: number
    private sprite: string

    public constructor(container: HTMLDivElement) {
        this.container = container

        this.alive = true
        this.y = 50.0
        this.velocity = 0.0
        this.jump_force = 1.5
        this.sprite = "./src/images/Placeholder.png"

        this.element = new Image()
        this.element.src = this.sprite
        this.element.alt = "Cat"
        this.element.className = "player"
        this.container.appendChild(this.element)
    }

    public jump(): void {
        this.velocity = -this.jump_force
    }

    private gravity(): void {
        let v: number = this.velocity
        this.velocity = Math.min(v + 0.075, 1.5)
    }

    public move(): void {
        if (!this.alive) return

        this.gravity()
        this.y += this.velocity
        this.element.style.top = `${this.y}%`
        this.element.style.transform = `rotate(${this.velocity * 10}deg)`
    }

    public die(): void {
        this.alive = false

        this.element.animate(
            [
                { offset: 0.0, left: "25%", top: `${this.y}%`, rotate: `${this.velocity * 10}deg` }, // Initial position
                { offset: 0.1, left: "15%", top: `${this.y - 25.0}%`, rotate: `-45deg` },            // Bounce off slightly
                { offset: 1.0, left: "-5%", top: `${this.y + 135.0}%`, rotate: `-90deg` }            // Fall down
            ],
            {
                duration: 1500,
                easing: "linear",
                fill: "forwards"
            }
        )
    }
}
