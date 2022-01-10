import { Piece } from './Piece';
import { Position } from '../Props/Position';
import { toLetter } from '../LetterAt';

class Knight extends Piece {
    protected static chars = ['&#x2658;', '&#x265E;'];
    public calculateAvailableMoves(): void {
        super.availableMoves = [];

        [[-3, -2], [-3, 2], [-2, -3], [-2, 3], [3, -2], [3, 2], [2, -3], [2, 3]].forEach(delta => {
            const position = new Position(toLetter(toLetterIndex(super.position.file) + delta[0]), super.position.rank + delta[1]);
            if(!super.isAllied(position) && super.board.onBoard(position))
                super.availableMoves.push(position);
        });
    }
}