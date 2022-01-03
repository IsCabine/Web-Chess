import { Piece } from './Piece';
import { Bishop } from './Bishop';
import { Rook } from './Rook';

class Queen extends Piece {
    protected static chars = ['&#x2655;', '&#x265B;'];

    public calculateAvailableMoves(): void {
        const virtualBishop = new Bishop(super.position, super.color, super.board);
        const virtualRook = new Rook(super.position, super.color, super.board);

        virtualBishop.calculateAvailableMoves();
        virtualRook.calculateAvailableMoves();

        super.availableMoves = [...virtualBishop.availableMoves, ...virtualRook.availableMoves];
    }
}