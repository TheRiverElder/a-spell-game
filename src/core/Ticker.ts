export class Ticker {
    private previousTime: number;
    private pid: NodeJS.Timeout = null;
    private peroid: number;
    private tick: (dt: number) => void;

    constructor(peroid: number, tick: (dt: number) => void, previousTime: number = 0) {
        this.peroid = peroid;
        this.tick = tick;
        this.previousTime = previousTime;
    }

    start() {
        if (this.pid === null) {
            this.pid = setInterval(() => {
                const currentTime = Date.now();
                this.tick(currentTime - this.previousTime);
                this.previousTime = currentTime;
            }, this.peroid);
        }
    }

    restart() {
        this.stop();
        this.start();
    }
    
    stop() {
        if (this.pid !== null) {
            clearInterval(this.pid);
        }
    }

}