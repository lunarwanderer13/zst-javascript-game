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
    let score = 0;
    // Obstacle to be cloned
    const original_obstacle = document.querySelector("div.obstacle");
    if (!original_obstacle)
        return;
    const obstacles = [];
    // Initialize a player
    const player = new Player(game_container);
    // Pause game on load, giving the player time to read the rules and lock in
    let game_started = false;
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
        setTimeout(() => { game_started = true; }, 50);
    }
    // Listeners for user input
    start_button.addEventListener("pointerup", trigger_start); // Button click
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space" || event.code === "Enter" && !event.repeat) {
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
        if (game_started && !game_running) {
            game_running = true;
            if (jump_button)
                jump_button.textContent = "JUMP";
            if (score_header)
                score_header.style.visibility = "visible";
        }
        if (game_running) {
            player.jump();
            //player.jump_sfx.play()
        }
    }
    // Listeners for user input
    jump_button.addEventListener("pointerdown", trigger_jump); // Button click
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space" && !event.repeat) {
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
    function get_closest_obstacle() {
        return obstacles.filter((obstacle) => !obstacle.passed)[0];
    }
    function is_colliding(player, obstacle) {
        let player_hitbox = player.element.getBoundingClientRect();
        let obstacle_hitbox = obstacle.element.getBoundingClientRect();
        let obstacle_poles = obstacle.element.querySelectorAll("img");
        let upper_pole_hitbox = obstacle_poles[0].getBoundingClientRect();
        let bottom_pole_hitbox = obstacle_poles[1].getBoundingClientRect();
        let collide = false;
        let padding = 0.05;
        if ((player_hitbox.top + (player_hitbox.top * padding) < upper_pole_hitbox.bottom || player_hitbox.bottom - (player_hitbox.bottom * padding) > bottom_pole_hitbox.top)
            &&
                (player_hitbox.left + (player_hitbox.left * padding) < obstacle_hitbox.right && player_hitbox.right - (player_hitbox.right * padding) > obstacle_hitbox.left)) {
            obstacle.passed = true;
            collide = true;
        }
        if (!collide && !obstacle.passed && player_hitbox.left > obstacle_hitbox.right) {
            obstacle.passed = true;
            score++;
            player.score_sfx.play();
            if (score_header)
                score_header.innerText = `Score: ${score}`;
        }
        return collide;
    }
    let background_pos = 0;
    // Main game loop
    const game_loop = setInterval(() => {
        if (game_running) {
            player.move();
            obstacles.forEach((obstacle) => { obstacle.move(); });
            let closest = get_closest_obstacle();
            // Move the background
            background_pos--;
            player.container.style.backgroundPositionX = `${background_pos}px`;
            if ((player.y < 0 || player.y > 100) || (closest && is_colliding(player, closest))) {
                player.die();
                player.death_sfx.play();
                setTimeout(() => {
                    player.gameover_sfx.play();
                }, 3000);
                game_running = false;
                clearInterval(obstacle_spawner_loop); // Stop the spawning loop
                clearInterval(game_loop); // Stop the game loop
            }
        }
    }, 10);
}
main();
//# sourceMappingURL=game.js.map