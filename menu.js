document.querySelector("#container").style.display = "none";
// code for menu page
const no_constraint_imgs = [
    new Image(), new Image(), new Image(), new Image(),
    new Image(), new Image(), new Image()
];
const bridge_imgs = [new Image(), new Image(), new Image(), new Image()];
const oasis_img = new Image()
const mountain_imgs = [
    new Image(), new Image(), new Image(), new Image(),
    new Image(), new Image(), new Image(), new Image()
]

const start_button = document.querySelector("#start_button");
const rules_button = document.querySelector("#rules_button");

let terrain, oasis_cnt;
let image_dimensions;

let timer;
let seconds;

let difficulty;
const canvas = document.querySelector('#game');
const size = Math.min(window.innerWidth, window.innerHeight) *0.97;
canvas.height = size;
canvas.width = size;
const ctx = canvas.getContext('2d');

const oasis_b = 0b1111
const empty_b = 0b0000
const Vbridge = 0b0101
const Hbridge = 0b1010
const RUmountain = 0b1100
const RDmountain = 0b1001
const ULmountain = 0b0110
const LDmountain = 0b0011


easy_terrains = [
    [
        [empty_b,LDmountain ,empty_b,empty_b, oasis_b],
        [empty_b,empty_b,empty_b, Vbridge,oasis_b],
        [Vbridge,empty_b,ULmountain,empty_b,empty_b],
        [empty_b,empty_b,empty_b,oasis_b,empty_b,],
        [empty_b,empty_b,RUmountain,empty_b,empty_b]
    ],
    [
        [oasis_b, empty_b, Hbridge, empty_b, empty_b],
        [empty_b, ULmountain, empty_b, empty_b, ULmountain],
        [Vbridge, oasis_b, RUmountain, empty_b, empty_b],
        [empty_b, empty_b, empty_b, oasis_b, empty_b],
        [empty_b,empty_b,empty_b,empty_b,empty_b]
    ],
    [
        [empty_b, empty_b, Hbridge, empty_b, empty_b],
        [empty_b, empty_b, empty_b, empty_b, Vbridge],
        [empty_b, ULmountain, Vbridge, empty_b, empty_b],
        [empty_b, oasis_b, empty_b, empty_b, empty_b],
        [empty_b, Hbridge, empty_b, empty_b, ULmountain],
    ],
    [
        [empty_b, empty_b, empty_b, Hbridge, empty_b],
        [empty_b, empty_b, empty_b, empty_b, empty_b],
        [Vbridge, empty_b, LDmountain, empty_b, LDmountain],
        [empty_b, empty_b, empty_b, empty_b, empty_b],
        [empty_b, empty_b, oasis_b, RUmountain, empty_b],
    ],
    [
        [empty_b, empty_b, Hbridge, empty_b, empty_b],
        [empty_b, RDmountain, empty_b, empty_b, empty_b],
        [Vbridge, empty_b, empty_b, RUmountain, empty_b],
        [empty_b, empty_b, Vbridge, oasis_b, empty_b],
        [empty_b, ULmountain, empty_b, empty_b, empty_b],
    ]
]

hard_terrains = [
    [
        [empty_b, LDmountain, oasis_b, oasis_b, empty_b, Hbridge, empty_b],
        [Vbridge, empty_b, empty_b, empty_b, empty_b, empty_b, empty_b],
        [empty_b, empty_b, Vbridge, empty_b, empty_b, empty_b, empty_b],
        [empty_b, empty_b, empty_b, RUmountain, empty_b, empty_b, empty_b],
        [RUmountain, empty_b, LDmountain, empty_b, Hbridge, empty_b, oasis_b],
        [empty_b, empty_b, empty_b, empty_b, empty_b, empty_b, empty_b],
        [empty_b, empty_b, empty_b, Hbridge, empty_b, empty_b, empty_b],
    ],
    [
        [empty_b, empty_b, oasis_b, empty_b, empty_b, empty_b, empty_b],
        [Vbridge, empty_b, Hbridge, empty_b, empty_b, ULmountain, empty_b],
        [empty_b, empty_b, Hbridge, empty_b, empty_b, empty_b, Vbridge],
        [RDmountain, empty_b, empty_b, empty_b, empty_b, empty_b, empty_b],
        [empty_b, oasis_b, empty_b, LDmountain, empty_b, empty_b, empty_b],
        [empty_b, RDmountain, empty_b, empty_b, empty_b, empty_b, empty_b],
        [empty_b, empty_b, oasis_b, empty_b, empty_b, empty_b, empty_b]
    ],
    [
        [empty_b, empty_b, Hbridge, empty_b, empty_b, empty_b, empty_b],
        [empty_b, empty_b, empty_b, empty_b, empty_b, empty_b, Vbridge],
        [oasis_b, empty_b, RUmountain, empty_b, empty_b, empty_b, empty_b],
        [empty_b, empty_b, empty_b, empty_b, empty_b, empty_b, empty_b],
        [empty_b, oasis_b, RUmountain, empty_b, Hbridge, empty_b, empty_b],
        [Vbridge, empty_b, empty_b, empty_b, empty_b, LDmountain, empty_b],
        [empty_b, empty_b, oasis_b, RUmountain, empty_b, empty_b, empty_b]
    ],
    [
        [empty_b, empty_b, empty_b, empty_b, empty_b, empty_b, empty_b],
        [empty_b, empty_b, empty_b, Vbridge, empty_b, ULmountain, empty_b],
        [empty_b, empty_b, RUmountain, empty_b, empty_b, empty_b, empty_b],
        [empty_b, Hbridge, empty_b, oasis_b, empty_b, Hbridge, empty_b],
        [empty_b, empty_b, ULmountain, empty_b, LDmountain, empty_b, empty_b],
        [Vbridge, empty_b, empty_b, empty_b, empty_b, RUmountain, empty_b],
        [empty_b, empty_b, empty_b, empty_b, empty_b, empty_b, empty_b]
    ],
    [
        [empty_b, empty_b, empty_b, empty_b, empty_b, empty_b, empty_b],
        [empty_b, empty_b, empty_b, empty_b, empty_b, RDmountain, empty_b],
        [empty_b, Hbridge, Hbridge, empty_b, LDmountain, empty_b, empty_b],
        [empty_b, empty_b, empty_b, empty_b, empty_b, empty_b, empty_b],
        [empty_b, empty_b, RDmountain, empty_b, oasis_b, empty_b, empty_b],
        [empty_b, ULmountain, empty_b, Vbridge, empty_b, empty_b, empty_b],
        [empty_b, empty_b, empty_b, empty_b, empty_b, empty_b, empty_b]
    ]
]

function start() {
    const playerName = document.querySelector("#name").value;
    if (playerName === "") {
        document.querySelector("#name").style.background = "#dc7b79";
        setTimeout(() => {
            document.querySelector("#name").style.background = "#fdfdfb";
        },1000)
        return;
    }
    document.querySelector("#playerName").textContent = playerName;
    difficulty = parseInt(document.querySelector("input[name=\"difficulty\"]:checked").value);
    if (difficulty === 5) {
        terrain = JSON.parse(JSON.stringify(easy_terrains[Math.floor(Math.random() * easy_terrains.length)]))
    }else{
        terrain = JSON.parse(JSON.stringify(hard_terrains[Math.floor(Math.random() * hard_terrains.length)]));
    }
    oasis_cnt = terrain.flat().filter(value => value === oasis_b).length
    image_dimensions = Math.min(canvas.width/terrain.length, canvas.height/terrain.length);

    document.querySelector("#menu").hidden = true;
    document.querySelector("#container").style.display = "grid";

    draw_terrain(terrain)


    seconds = 0;
    updateTimer()
    if (!timer) {
        timer = setInterval(() => {
            seconds++;
            updateTimer();
        }, 1000);
    }
}


async function load_images(){
    const promises = [];
    function loadImage(img, src) {
        return new Promise((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject(new Error(`Failed to load ${src}`));
            img.src = src;
        });
    }
    promises.push(loadImage(no_constraint_imgs[0], "starter_eng/pics/tiles/empty.png"));
    promises.push(loadImage(no_constraint_imgs[1], "starter_eng/pics/tiles/curve_rail0011.png"));
    promises.push(loadImage(no_constraint_imgs[2], "starter_eng/pics/tiles/straight_rail0101.png"));
    promises.push(loadImage(no_constraint_imgs[3], "starter_eng/pics/tiles/curve_rail0110.png"));
    promises.push(loadImage(no_constraint_imgs[4], "starter_eng/pics/tiles/curve_rail1001.png"));
    promises.push(loadImage(no_constraint_imgs[5], "starter_eng/pics/tiles/straight_rail1010.png"));
    promises.push(loadImage(no_constraint_imgs[6], "starter_eng/pics/tiles/curve_rail1100.png"));

    promises.push(loadImage(bridge_imgs[1], "starter_eng/pics/tiles/bridge0101.png"));
    promises.push(loadImage(bridge_imgs[0], "starter_eng/pics/tiles/bridge1010.png"));
    promises.push(loadImage(bridge_imgs[3], "starter_eng/pics/tiles/bridge_rail0101.png"));
    promises.push(loadImage(bridge_imgs[2], "starter_eng/pics/tiles/bridge_rail1010.png"));

    promises.push(loadImage(oasis_img, "starter_eng/pics/tiles/oasis.png"));

    promises.push(loadImage(mountain_imgs[0], "starter_eng/pics/tiles/mountain1001.png"));
    promises.push(loadImage(mountain_imgs[1], "starter_eng/pics/tiles/mountain1100.png"));
    promises.push(loadImage(mountain_imgs[2], "starter_eng/pics/tiles/mountain0011.png"));
    promises.push(loadImage(mountain_imgs[3], "starter_eng/pics/tiles/mountain0110.png"))
    promises.push(loadImage(mountain_imgs[4], "starter_eng/pics/tiles/mountain_rail1001.png"));
    promises.push(loadImage(mountain_imgs[5], "starter_eng/pics/tiles/mountain_rail1100.png"));
    promises.push(loadImage(mountain_imgs[6], "starter_eng/pics/tiles/mountain_rail0011.png"));
    promises.push(loadImage(mountain_imgs[7], "starter_eng/pics/tiles/mountain_rail0110.png"))

    await Promise.all(promises);
}


async function draw_terrain(terrain){
    await load_images()
    let image_to_draw = new Image();
    let tile_type;
    for (let i = 0; i < terrain.length; i++) {
        for (let j = 0; j < terrain[i].length; j++) {
            tile_type = terrain[i][j] & 0b00001111;
            if (tile_type === 0b0000) {
                //empty
                image_to_draw = no_constraint_imgs[terrain[i][j]>>5]
            } else if (tile_type === 0b1111) {
                //oasis
                image_to_draw = oasis_img
            } else if (tile_type & (tile_type >> 1 | (tile_type & 1) << 3)) {
                //mountain
                let index = (tile_type ^ 0b1001);
                image_to_draw = mountain_imgs[index / 5 + 4 * (terrain[i][j]>>4 === 0 ? 0 : 1)]
            } else {
                //bridge
                image_to_draw = bridge_imgs[(tile_type & 1) + 2 * (terrain[i][j]>> 7) + 2 * (terrain[i][j]>>6 & 0b01)];
            }
            ctx.drawImage(image_to_draw, j * image_dimensions, i * image_dimensions, image_dimensions, image_dimensions);
        }
    }
}


function next(tile){
    const next_table = [0b00110000,0b01010000,0b01100000,0b10010000,0b10100000,0b11000000,0b00000000]
    let tile_type = tile & 0b00001111;
    let tile_direction = tile >>4;
    if (tile_type === empty_b){
        return next_table[tile_direction>>1];
    }
    return tile_direction === 0 ? tile_type | (tile_type << 4) : tile_type;
}


function get_first_non_oasis(terrain){
    for (let i = 0; i < terrain.length; i++) {
        for (let j = 0; j < terrain[i].length; j++) {
            if (terrain[i][j] !== oasis_b){
                return [i,j];
            }
        }
    }
    return [terrain.length,terrain.length]
}


function neighbour(curr_check, last_direction){
    let other_direction = (terrain[curr_check[0]][curr_check[1]]>>4)^((last_direction*4)%15) ;
    if (terrain[curr_check[0]][curr_check[1]] >> 4 === 0) {
        return [other_direction, -1, -1];
    }
    let newRow = curr_check[0] - (((other_direction & 0b0100)/4 | (other_direction & 0b0001)) * Math.sign(other_direction - 3))
    let newCol = curr_check[1] + (((other_direction & 0b1000)/8 | (other_direction & 0b0010)/2) * Math.sign(other_direction - 3))
    return [other_direction, newRow, newCol];
}


function traverse_to_check_win(terrain){
    let start = get_first_non_oasis(terrain);
    if (start[0] >= terrain.length || start[1] >= terrain.length || terrain[start[0]][start[1]]>>4  !== 0b1001) {
        return false;
    }
    let last_direction = 4; //up
    let currently_checked = neighbour(start, last_direction);
    last_direction = currently_checked[0];
    currently_checked = [currently_checked[1],currently_checked[2]];
    let res;
    let distance = 0;
    while (currently_checked[0] !== start[0] || currently_checked[1] !== start[1]){
        res = neighbour(currently_checked, last_direction);
        last_direction = res[0]
        if (res[1] < 0 || res[1] > terrain.length || res[2] < 0 || res[2] > terrain.length) {
            return false;
        }
        if (terrain[res[1]][res[2]]>>4 & last_direction === 0 ||  terrain[res[1]][res[2]]>>4 === 0) {
            return false;
        }
        currently_checked = [res[1],res[2]]
        distance ++;
    }
    return distance === terrain.length * terrain.length - oasis_cnt - 1;
}


function updateTimer(){
    let sec = "";
    if (seconds%60 < 10) {
        sec = "0"
    }
    sec = sec + seconds%60
    let min = ""
    if (Math.floor(seconds/60) < 10) {
        min = "0"
    }
    min = min + Math.floor(seconds/60)
    document.querySelector("#timer").textContent = min+":"+sec;
}


function backToHomeScreen(){
    document.querySelector("#result_screen").hidden = true;
    document.querySelector("#menu").hidden = false;
}






canvas.addEventListener("click", function (event){
    const rect = canvas.getBoundingClientRect();
    const borderLeft = parseInt(getComputedStyle(canvas).borderLeftWidth);
    const borderTop = parseInt(getComputedStyle(canvas).borderTopWidth);
    const x = event.clientX - rect.left - borderLeft;
    const y = event.clientY - rect.top - borderTop;

    const col = Math.floor(x / image_dimensions);
    const row = Math.floor(y / image_dimensions);

    if(!(row >= 0 && row < canvas.width && col >= 0 && col < canvas.width)){
        return
    }
    terrain[row][col] = next(terrain[row][col]);
    draw_terrain(terrain);
    if (traverse_to_check_win(terrain) === true) {
        document.querySelector("#container").style.display = "none";
        document.querySelector("#result_screen").hidden = false;
        document.querySelector("#time_taken").innerHTML = "Congratulations! You completed the puzzle in "+seconds+" seconds.";
    }
});
document.querySelector("#to_home_screen").addEventListener("click", backToHomeScreen);
start_button.addEventListener("click", start);
rules_button.addEventListener("click", function () {
    document.querySelector("p").hidden = !document.querySelector("p").hidden;
});