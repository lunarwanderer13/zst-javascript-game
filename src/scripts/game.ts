console.log("Hello, World!")

import Player from "./player.js"

function main(): void {
    const game_container: HTMLDivElement | null = document.querySelector<HTMLDivElement>(".game-container")
    if (!game_container) return

    const player: Player = new Player(game_container)
}

main()
