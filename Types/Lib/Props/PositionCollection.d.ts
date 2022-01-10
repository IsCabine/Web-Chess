import { Position } from "./Position";

export class PositionCollection extends Array<Position> {
    public constructor(...positions: Position[]) {
        super(...positions);
    }

    public override includes(position: Position): boolean {
        return this.some(p => p.equals(position));
    }
}