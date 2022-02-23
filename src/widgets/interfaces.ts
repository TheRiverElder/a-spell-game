export type Range = {
    start: number;
    end: number;
};

export type TechCircle = {
    radius: Range;
    layers: Layer[];
};
export type Layer = {
    baseAngle: number,
    arcs: Arc[];
    speed: number;
};
export type Arc = {
    position: number;
    angle: number;
};