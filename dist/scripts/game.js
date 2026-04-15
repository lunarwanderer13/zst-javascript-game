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
    jump_button.addEventListener("click", () => {
        if (!game_running) {
            game_running = true;
            jump_button.textContent = "JUMP";
        }
        player.jump();
    });
    setInterval(() => {
        if (game_running) {
            player.move();
        }
    }, 10);
}
main();
//# sourceMappingURL=game.js.map