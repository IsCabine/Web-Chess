import { Piece } from './Piece';
import { Position } from '../Props/Position';
import { toLetter, toLetterIndex } from '../LetterAt';

class Bishop extends Piece {
    protected static chars = ['&#x2658;', '&#x265E;'];

    public calculateAvailableMoves(): void {
        super.availableMoves = [];

        [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(delta => {
            for(let i = 0; i < Math.max(super.board.files, super.board.ranks); i++) {
                if(this.addMoveIfAvailableAndPredicateBreak(toLetter(toLetterIndex(super.position.file) + i * delta[0]), super.position.rank + i * delta[1]))
                    break;
            }
        });
    }

    private addMoveIfAvailableAndPredicateBreak(file: string, rank: number): boolean {
        const position = new Position(file. rank);

        if(!super.board.onBoard(position))
            return true;

        if(!super.isAllied(position))
            super.availableMoves.push(position);

        if(!super.board.isEmpty(position))
            return true;
        
        return false;
    }
}