console.log("Hello, World!")

import Player from "./player.js"

function main(): void {
    const game_container: HTMLDivElement | null = document.querySelector<HTMLDivElement>(".game-container")
    if (!game_container) return

    const player: Player = new Player(game_container)

    let game_running: boolean = false

    const jump_button: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("button#jump-button")
    if (!jump_button) return

    function trigger_jump(): void {
        if (!game_running) {
            game_running = true
            if (jump_button) jump_button.textContent = "JUMP"
        }

        player.jump()
    }

    jump_button.addEventListener("click", trigger_jump)              // Button click
    document.addEventListener("keydown", (event: KeyboardEvent) => { // Space press
        if (event.code === "Space") {
            event.preventDefault()
            trigger_jump()
        }
    })

    const game_loop: number = setInterval(() => {
        if (game_running) {
            player.move()

            if (player.y < 0 || player.y > 100) {
                player.die()
                console.log("game over")
                clearInterval(game_loop)
            }
        }
    }, 10)
}

main()
