// Check if it's loading properly
console.log("Hello, World!");
import Player from "./player.js";
import Obstacle from "./obstacle.js";
// Game handler
function main() {
    // The game container <div> element
    const game_container = document.querySelector(".game-container");
    if (!game_container)
        return;
    // Score display
    const score_header = document.querySelector("h3");
    if (!score_header)
        return;
    // Obstacle to be cloned
    const original_obstacle = document.querySelector("div.obstacle");
    if (!original_obstacle)
        return;
    const obstacles = [];
    // Initialize a player
    const player = new Player(game_container);
    // Pause game on load, giving the player time to read the rules and lock in
    let game_running = false;
    // The starting modal window
    const start_modal = document.querySelector("div.start-modal");
    if (!start_modal)
        return;
    // The starting button
    const start_button = document.querySelector("button#start-button");
    if (!start_button)
        return;
    // Hides the starting window
    function trigger_start() {
        if (start_modal)
            start_modal.style.display = "none";
    }
    // Listeners for user input
    start_button.addEventListener("pointerup", trigger_start); // Button click
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space" || event.code === "Enter") {
            event.preventDefault();
            trigger_start();
        }
    });
    // Button used for jumping, and if the game is paused, starting the game
    const jump_button = document.querySelector("button#jump-button");
    if (!jump_button)
        return;
    // Jump handler
    function trigger_jump() {
        if (!game_running) {
            game_running = true;
            if (jump_button)
                jump_button.textContent = "JUMP";
            if (score_header)
                score_header.style.visibility = "visible";
        }
        player.jump();
    }
    // Listeners for user input
    jump_button.addEventListener("pointerdown", trigger_jump); // Button click
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            event.preventDefault();
            trigger_jump();
        }
    });
    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
    // Obstacle spawner loop
    const obstacle_spawner_loop = setInterval(() => {
        if (!game_running)
            return;
        let obstacle = new Obstacle(game_container, original_obstacle);
        obstacles.push(obstacle);
    }, 2000);
    let background_pos = 0;
    // Main game loop
    const game_loop = setInterval(() => {
        if (game_running) {
            player.move();
            obstacles.forEach((obstacle) => { obstacle.move(); });
            // Move the background
            background_pos--;
            player.container.style.backgroundPositionX = `${background_pos}px`;
            if (player.y < 0 || player.y > 100) {
                player.die();
                console.log("game over");
                clearInterval(obstacle_spawner_loop); // Stop the spawning loop
                clearInterval(game_loop); // Stop the game loop
            }
        }
    }, 10);
}
main();
//# sourceMappingURL=game.js.map