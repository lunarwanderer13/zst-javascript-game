console.log("Hello, World!")

import Player from "./player.js"

function main(): void {
    const game_container: HTMLDivElement | null = document.querySelector<HTMLDivElement>(".game-container")
    if (!game_container) return

    const player: Player = new Player(game_container)

    let game_running: boolean = false

    const jump_button: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("button#jump-button")
    if (!jump_button) return

    jump_button.addEventListener("click", () => {
        if (!game_running) {
            game_running = true
            jump_button.textContent = "JUMP"
        }

        player.jump()
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
