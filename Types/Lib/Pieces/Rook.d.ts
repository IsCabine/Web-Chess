import { Piece } from './Piece';
import { Color } from './Props/Color';
import { toLetterIndex, toLetter } from '../LetterAt';
import { Position } from './Props/Position';

class Rook extends Piece {
    protected static chars = ['&#x2659;', '&#x265F;'];
    public castleable: boolean = true;

    public calculateAvailableMoves(): void {
        super.availableMoves = [];

        const file: string = super.position.file;
        const rank: number = super.position.rank;
        const fileIndex: number = toLetterIndex(file);

        for(let i = fileIndex; i > 0;)
            if(this.addMoveIfAvailableAndPredicateBreak(toLetter(--i), rank))
                break;

        for(let i = fileIndex; i < super.board.files - 1;)
            if(this.addMoveIfAvailableAndPredicateBreak(toLetter(++i), rank))
                break;

        for(let i = rank; i > 1;)
            if(this.addMoveIfAvailableAndPredicateBreak(file, --i))
                break;

        for(let i = rank; i < super.board.ranks;)
            if(this.addMoveIfAvailableAndPredicateBreak(file, ++i))
                break;
    }

    public override move(to: Position): void {
        super.move(to);
        this.castleable = false;
    }

    private addMoveIfAvailableAndPredicateBreak(file: string, rank: number): boolean {
        const position = new Position(file. rank);

        if(!super.isAllied(position))
            super.availableMoves.push(position);

        if(!super.board.isEmpty(position))
            return true;
        
        return false;
    }
}