import { Vec2, X, Y } from "./Vec2";
import type { World } from "./World";

export class WorldRenderer {

    private world: World;
    private canvas: HTMLCanvasElement;
    public offset: Vec2 = [0, 0];
    public scale: number = 1;

    constructor(world: World, canvas: HTMLCanvasElement) {
        this.world = world;
        this.canvas = canvas;
    }

    private unregisterEventListeners: () => void;

    initialize(dom: HTMLElement = this.canvas) {
        const onKeyDown = (event: KeyboardEvent) => {
            switch (event.code) {
                case 'KeyA': this.world.playerController[X] = -1; break;
                case 'KeyD': this.world.playerController[X] = +1; break;
                case 'KeyW': this.world.playerController[Y] = -1; break;
                case 'KeyS': this.world.playerController[Y] = +1; break;
            }
        };
        const onKeyUp = (event: KeyboardEvent) => {
            switch (event.code) {
                case 'KeyA': 
                case 'KeyD': this.world.playerController[X] = 0; break;
                case 'KeyW': 
                case 'KeyS': this.world.playerController[Y] = 0; break;
            }
        };

        dom.addEventListener('keydown', onKeyDown);
        dom.addEventListener('keyup', onKeyUp);

        this.unregisterEventListeners = () => {
            dom.removeEventListener('keydown', onKeyDown);
            dom.removeEventListener('keyup', onKeyUp);
        };
    }

    dispose() {
        this.unregisterEventListeners();
    }

    render() {
        const { width, height } = this.canvas.getBoundingClientRect();
        this.canvas.width = width;
        this.canvas.height = height;

        const center: Vec2 = [width / 2, height / 2];

        const g: CanvasRenderingContext2D = this.canvas.getContext('2d');
        const world = this.world;
        
        g.fillStyle = '#efefef';
        g.fillRect(0, 0, width, height);
        
        g.fillStyle = '#000000';
        for (const bion of world.getAllBions()) {
            // console.log(bion);
            const { radius, position } = bion;
            const [px, py] = Vec2.add(Vec2.multiply(Vec2.add(position, this.offset), this.scale), center);
            g.beginPath();
            g.arc(px, py, radius * this.scale, 0, 2 * Math.PI);
            g.fill();
        }
        
    }
}