console.log("Hello, World!");
import Player from "./player.js";
function main() {
    const game_container = document.querySelector(".game-container");
    if (!game_container)
        return;
    const player = new Player(game_container);
    let game_running = false;
    const jump_button = document.querySelector("button#jump-button");
    if (!jump_button)
        return;
    function trigger_jump() {
        if (!game_running) {
            game_running = true;
            if (jump_button)
                jump_button.textContent = "JUMP";
        }
        player.jump();
    }
    jump_button.addEventListener("click", trigger_jump); // Button click
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            event.preventDefault();
            trigger_jump();
        }
    });
    const game_loop = setInterval(() => {
        if (game_running) {
            player.move();
            if (player.y < 0 || player.y > 100) {
                player.die();
                console.log("game over");
                clearInterval(game_loop);
            }
        }
    }, 10);
}
main();
//# sourceMappingURL=game.js.map