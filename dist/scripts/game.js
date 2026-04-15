console.log("Hello, World!");
import Player from "./player.js";
function main() {
    const game_container = document.querySelector(".game-container");
    if (!game_container)
        return;
    const player = new Player(game_container);
}
main();
//# sourceMappingURL=game.js.map