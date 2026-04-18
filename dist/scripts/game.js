// Check if it's loading properly
console.log("Hello, World!");
import Player from "./player.js";
// Game handler
function main() {
    // The game container <div> element
    const game_container = document.querySelector(".game-container");
    if (!game_container)
        return;
    // Initialize a player
    const player = new Player(game_container);
    // Pause game on load, giving the player time to read the rules and lock in
    let game_running = false;
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
        }
        player.jump();
    }
    // Listeners for user input
    jump_button.addEventListener("click", trigger_jump); // Button click
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            event.preventDefault();
            trigger_jump();
        }
    });
    // Main game loop
    const game_loop = setInterval(() => {
        if (game_running) {
            player.move();
            if (player.y < 0 || player.y > 100) {
                player.die();
                console.log("game over");
                clearInterval(game_loop); // Stop the game loop
            }
        }
    }, 10);
}
main();
//# sourceMappingURL=game.js.map