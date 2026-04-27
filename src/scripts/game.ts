// Check if it's loading properly
console.log("Hello, World!")

import Player from "./player.js"
import Obstacle from "./obstacle.js"

// Game handler
function main(): void {
    // The game container <div> element
    const game_container: HTMLDivElement | null = document.querySelector<HTMLDivElement>(".game-container")
    if (!game_container) return

    // Score display
    const score_header: HTMLDivElement | null = document.querySelector<HTMLHeadingElement>("h3")
    if (!score_header) return

    // Obstacle to be cloned
    const original_obstacle: HTMLDivElement | null = document.querySelector<HTMLDivElement>("div.obstacle")
    if (!original_obstacle) return
    const obstacles: Obstacle[] = []

    // Initialize a player
    const player: Player = new Player(game_container)

    // Pause game on load, giving the player time to read the rules and lock in
    let game_running: boolean = false

    // The starting modal window
    const start_modal: HTMLDivElement | null = document.querySelector<HTMLDivElement>("div.start-modal")
    if(!start_modal) return
    
    // The starting button
    const start_button: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("button#start-button")
    if (!start_button) return

    // Hides the starting window
    function trigger_start(): void {
        if (start_modal) start_modal.style.display = "none"
    }

    // Listeners for user input
    start_button.addEventListener("pointerup", trigger_start)        // Button click
    document.addEventListener("keydown", (event: KeyboardEvent) => { // Space or enter press
        if(event.code === "Space" || event.code === "Enter") {
            event.preventDefault()
            trigger_start()
        }
    })

    // Button used for jumping, and if the game is paused, starting the game
    const jump_button: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("button#jump-button")
    if (!jump_button) return

    // Jump handler
    function trigger_jump(): void {
        if (!game_running) {
            game_running = true
            if (jump_button) jump_button.textContent = "JUMP"
            if (score_header) score_header.style.visibility = "visible"
        }

        player.jump()
    }

    // Listeners for user input
    jump_button.addEventListener("pointerdown", trigger_jump)        // Button click
    document.addEventListener("keydown", (event: KeyboardEvent) => { // Space press
        if (event.code === "Space") {
            event.preventDefault()
            trigger_jump()
        }
    })

    // Obstacle spawner loop
    const obstacle_spawner_loop: number = setInterval(() => {
        if (!game_running) return

        let obstacle: Obstacle = new Obstacle(game_container, original_obstacle)
        obstacles.push(obstacle)
    }, 2000)

    // Main game loop
    const game_loop: number = setInterval(() => {
        if (game_running) {
            player.move()
            obstacles.forEach((obstacle: Obstacle) => { obstacle.move() })

            if (player.y < 0 || player.y > 100) {
                player.die()
                console.log("game over")
                clearInterval(obstacle_spawner_loop) // Stop the spawning loop
                clearInterval(game_loop)             // Stop the game loop
            }
        }
    }, 10)
}

main()
