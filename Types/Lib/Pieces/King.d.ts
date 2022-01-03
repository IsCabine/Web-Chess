import { Piece } from "./Piece";
import { toLetter, toLetterIndex } from "../LetterAt";

class King extends Piece {
    protected static chars = ['&#x2654;', '&#x265A;'];
    public castleable: boolean = true;

    public calculateAvailableMoves(): void {
        super.availableMoves = [];

        for(let i = -1; i < 2; i++)
            for(let j = -1; j < 2; j++) {
                const position = new Position(toLetter(toLetterIndex(super.position.file) + i), super.position.rank + j);
                if(!super.isAllied(position) && i !== 0 || j !== 0) 
                    super.availableMoves.push(position);
            }
    }

    public override move(to: Position): void {
        super.move(to);
        this.castleable = false;
    }
}