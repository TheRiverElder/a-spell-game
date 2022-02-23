export type Vec2 = [number, number];

export const X = 0;
export const Y = 1;

export const Vec2 = {
    
    fromAngle: (angle: number, mod: number) => [mod * Math.cos(angle), mod * Math.sin(angle)] as Vec2,
    of: (x: number, y: number) => [x, y] as Vec2,

    add: (p1: Vec2, p2: Vec2) => [p1[X] + p2[X], p1[Y] + p2[Y]] as Vec2,
    substruct: (p1: Vec2, p2: Vec2) => [p1[X] - p2[X], p1[Y] - p2[Y]] as Vec2,
    multiply: (p: Vec2, n: number) => [p[X] * n, p[Y] * n] as Vec2,
    divide: (p: Vec2, n: number) => [p[X] / n, p[Y] / n] as Vec2,

    selfSet: (p1: Vec2, p2: Vec2) => (p1[X] = p2[X], p1[Y] = p2[Y], p1) as Vec2,
    selfAdd: (p1: Vec2, p2: Vec2) => (p1[X] += p2[X], p1[Y] += p2[Y], p1) as Vec2,
    selfSubstruct: (p1: Vec2, p2: Vec2) => (p1[X] -= p2[X], p1[Y] -= p2[Y], p1) as Vec2,
    selfMultiply: (p: Vec2, n: number) => (p[X] *= n, p[Y] *= n, p) as Vec2,
    selfDivide: (p: Vec2, n: number) => (p[X] /= n, p[Y] /= n, p) as Vec2,

    moduloSquare: (p: Vec2) => p[X] ** 2 + p[Y] ** 2,
    modulo: (p: Vec2) => Math.sqrt(Vec2.moduloSquare(p)),
    normalized: (p: Vec2) => Vec2.divide(p, Vec2.modulo(p) || 1) as Vec2,
    angle: (p: Vec2) => Math.atan2(p[Y], p[X]),

    distanceSquare: (p1: Vec2, p2: Vec2) => Math.pow(p1[X] - p2[X], 2) + Math.pow(p1[Y] - p2[Y], 2),
    distance: (p1: Vec2, p2: Vec2) => Math.sqrt(Vec2.distanceSquare(p1, p2)),
    
};