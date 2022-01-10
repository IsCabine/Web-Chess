import { Piece } from './Piece';
import { Color } from '../Props/Color';
import { Position } from '../Props/Position';

export class Pawn extends Piece {
    protected static chars = ['&#x2659;', '&#x265F;'];

    public calculateAvailableMoves(): void {
        super.availableMoves = [];

        const direction = super.color === Color.WHITE ? 1 : -1;

        const oneStep = new Position(super.position.file, super.position.rank + direction);
        const twoStep = new Position(super.position.file, super.position.rank + 2 * direction);
        const toLeft = new Position(super.position.file - 1, super.position.rank + direction);
        const toRight = new Position(super.position.file + 1, super.position.rank + direction);
        const enPassant = new Position(super.position.file - 1, super.position.rank + direction);
        const enPassant2 = new Position(super.position.file + 1, super.position.rank + direction);

        if(super.board.isEmpty(oneStep)) {
            super.availableMoves.push(oneStep);
            if(this.onFirstRank() && super.board.isEmpty(twoStep))
                super.availableMoves.push(twoStep);
        }

        if(super.isEnemy(toLeft))
            super.availableMoves.push(enPassant);

        if(super.isEnemy(toRight))
            super.availableMoves.push(enPassant2);
    }

    private onFirstRank() {
        return super.position.rank === (super.color === Color.WHITE ? 2 : 7);
    }

    public override move(to: Position): void {
        //#region: Removes passed pawn if move is en passant
        const passedPawnPosition = new Position(this.position.rank, to.file);
        const passedPawn = super.board.getPieceFromPosition(passedPawnPosition);

        if(!super.isEnemy(to) && 
            super.isEnemy(passedPawnPosition) && 
            passedPawn instanceof Pawn
        ) {
            this.board.removePiece(passedPawn);
        }
        //#endregion

        super.move(to);
    }
};