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
    const score_header: HTMLHeadingElement | null = document.querySelector<HTMLHeadingElement>("h3#current-score")
    if (!score_header) return

    const end_score_header: HTMLHeadingElement | null = document.querySelector<HTMLHeadingElement>("h3#end-score")
    if (!end_score_header) return

    const end_highscore_header: HTMLHeadingElement | null = document.querySelector<HTMLHeadingElement>("h3#end-highscore")
    if (!end_highscore_header) return

    let score: number = 0
    let highscore: number = 0

    // Obstacle to be cloned
    const original_obstacle: HTMLDivElement | null = document.querySelector<HTMLDivElement>("div.obstacle")
    if (!original_obstacle) return
    const obstacles: Obstacle[] = []

    // Initialize a player
    const player: Player = new Player(game_container)

    // Pause game on load, giving the player time to read the rules and lock in
    let game_started: boolean = false
    let game_running: boolean = false
    let game_ended: boolean = false

    // The starting modal window
    const start_modal: HTMLDivElement | null = document.querySelector<HTMLDivElement>("div.start-modal")
    if(!start_modal) return
    
    // The starting button
    const start_button: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("button#start-button")
    if (!start_button) return

    // Hides the starting window
    function trigger_start(): void {
        if (start_modal) start_modal.style.display = "none"
        setTimeout(() => { game_started = true }, 50)
    }

    // Listeners for user input
    start_button.addEventListener("pointerup", trigger_start)        // Button click
    document.addEventListener("keydown", (event: KeyboardEvent) => { // Space or enter press
        if((event.code === "Space" || event.code === "Enter") && !event.repeat) {
            event.preventDefault()
            trigger_start()
        }
    })

    // The ending modal window
    const end_modal: HTMLDivElement | null = document.querySelector<HTMLDivElement>("div.end-modal")
    if(!end_modal) return
    
    // The ending button
    const end_button: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("button#end-button")
    if (!end_button) return

    // Opens ending window
    function trigger_end(): void {
        if(!end_modal) return
        end_modal.style.opacity = "0.0"
        end_modal.style.display = "flex"

        highscore = Number(localStorage.getItem("highscore"))
        if (score > highscore) localStorage.setItem("highscore", String(score))

        if (end_score_header) end_score_header.innerText = `Score: ${score}`
        if (end_highscore_header) end_highscore_header.innerText = `Highscore: ${localStorage.getItem("highscore")}`

        end_modal.animate(
            [
                { offset: 0.0, opacity: "0.0" },
                { offset: 1.0, opacity: "1.0" }
            ],
            {
                duration: 1000,
                easing: "linear",
                fill: "forwards"
            }
        )
    }

    // Resets game
    function reset_game(): void {
        if (game_ended) location.reload()
    }

    // Listeners for user input
    end_button.addEventListener("pointerup", reset_game)             // Button click
    document.addEventListener("keydown", (event: KeyboardEvent) => { // Space or enter press
        if((event.code === "Space" || event.code === "Enter") && !event.repeat) {
            event.preventDefault()
            reset_game()
        }
    })

    // Button used for jumping, and if the game is paused, starting the game
    const jump_button: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>("button#jump-button")
    if (!jump_button) return

    // Jump handler
    function trigger_jump(): void {
        if (game_started && !game_running) {
            game_running = true
            if (jump_button) jump_button.textContent = "JUMP"
            if (score_header) score_header.style.visibility = "visible"
        }

        if (game_running) {
            player.jump()
            //player.jump_sfx.play()
        }
    }

    // Listeners for user input
    jump_button.addEventListener("pointerdown", trigger_jump)         // Button click
    document.addEventListener("keydown", (event: KeyboardEvent) => {  // Space press
        if (event.code === "Space" && !event.repeat) {
            event.preventDefault()
            trigger_jump()
        }
    })
    document.addEventListener("contextmenu", (event: MouseEvent) => { // Context menu
        event.preventDefault()
    })

    // Obstacle spawner loop
    const obstacle_spawner_loop: number = setInterval(() => {
        if (!game_running) return

        let obstacle: Obstacle = new Obstacle(game_container, original_obstacle)
        obstacles.push(obstacle)
    }, 2000)

    function get_closest_obstacle(): Obstacle | null {
        return obstacles.filter((obstacle: Obstacle) => !obstacle.passed)[0]
    }

    function is_colliding(player: Player, obstacle: Obstacle): boolean {
        let player_hitbox: DOMRect = player.element.getBoundingClientRect()
        let obstacle_hitbox: DOMRect = obstacle.element.getBoundingClientRect()
        let obstacle_poles: NodeListOf<HTMLImageElement> = obstacle.element.querySelectorAll("img")
        let upper_pole_hitbox: DOMRect = obstacle_poles[0].getBoundingClientRect()
        let bottom_pole_hitbox: DOMRect = obstacle_poles[1].getBoundingClientRect()
        let collide: boolean = false
        let padding: number = 0.05

        if (
            (player_hitbox.top + (player_hitbox.top * padding) < upper_pole_hitbox.bottom || player_hitbox.bottom - (player_hitbox.bottom * padding) > bottom_pole_hitbox.top)
            &&
            (player_hitbox.left + (player_hitbox.left * padding) < obstacle_hitbox.right && player_hitbox.right - (player_hitbox.right * padding) > obstacle_hitbox.left)
        ) {
            obstacle.passed = true
            collide = true
        }

        if (!collide && !obstacle.passed && player_hitbox.left > obstacle_hitbox.right) {
            obstacle.passed = true

            score++
            player.score_sfx.play()
            if (score_header) score_header.innerText = `Score: ${score}`
        }

        return collide
    }

    let background_pos = 0

    // Main game loop
    const game_loop: number = setInterval(() => {
        if (game_running) {
            player.move()
            obstacles.forEach((obstacle: Obstacle) => { obstacle.move() })
            let closest: Obstacle | null = get_closest_obstacle()

            // Move the background
            background_pos--
            player.container.style.backgroundPositionX = `${background_pos}px`

            if ((player.y < 0 || player.y > 100) || (closest && is_colliding(player, closest))) {
                player.die()
                player.death_sfx.play()

                setTimeout(() => {
                    player.gameover_sfx.play()
                    trigger_end()
                }, 3000)

                game_running = false
                game_ended = true
                clearInterval(obstacle_spawner_loop) // Stop the spawning loop
                clearInterval(game_loop)             // Stop the game loop
            }
        }
    }, 10)
}

main()
