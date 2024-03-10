
function createCoordinate({ cx, cy, radius, angle }: {cx: number, cy: number, radius: number, angle: number}): { x: number; y: number; } {
    const angleInRadians = (angle - 90) * Math.PI / 180.0;

    return {
        x: cx + (radius * Math.cos(angleInRadians)),
        y: cy + (radius * Math.sin(angleInRadians))
    }
};

export function describeArc({ x, y, radius, startAngle, endAngle }: {x: number, y: number, radius: number, startAngle: number, endAngle: number}): string {
    const start = createCoordinate({cx: x, cy: y, radius, angle: endAngle});
    const end = createCoordinate({cx: x, cy: y, radius, angle: startAngle});
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
};