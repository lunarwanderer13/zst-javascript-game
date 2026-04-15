export default class Player {
    public container: HTMLDivElement
    public element: HTMLImageElement

    public y: number
    public velocity: number
    private jump_force: number
    private sprite: string

    public constructor(container: HTMLDivElement) {
        this.container = container

        this.y = 0.5
        this.velocity = 0.0
        this.jump_force = 1.5
        this.sprite = "./../../src/images/Placeholder.png"

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
        this.gravity()
        this.y += this.velocity
        this.element.style.top = `${this.y}%`
        this.element.style.transform = `rotate(${this.velocity * 10}deg)`

        console.log(`y: ${this.y}\nv: ${this.velocity}`)
    }
}
