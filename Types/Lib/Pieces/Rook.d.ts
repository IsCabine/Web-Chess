import { Piece } from './Piece';
import { Color } from './Props/Color';
import { toLetterIndex, toLetter } from '../LetterAt';
import { Position } from './Props/Position';

class Rook extends Piece {
    protected static chars = ['&#x2659;', '&#x265F;'];
    public castleable: boolean = true;    

    public calculateAvailableMoves(): void {
        super.availableMoves = [];

        for(let i = toLetterIndex(this.position.file); i > 0;)
            if(this.addMoveIfAvailableAndPredicateBreak(toLetter(--i), this.position.rank))
                break;

        for(let i = toLetterIndex(this.position.file); i < 7;)
            if(this.addMoveIfAvailableAndPredicateBreak(toLetter(++i), this.position.rank))
                break;

        for(let i = this.position.rank; i > 1;)
            if(this.addMoveIfAvailableAndPredicateBreak(this.position.file, --i))
                break;

        for(let i = this.position.rank; i < 7;)
            if(this.addMoveIfAvailableAndPredicateBreak(this.position.file, ++i))
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