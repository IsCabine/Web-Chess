import { Piece } from './Pieces/Piece';
import { Position } from './Props/Position';
import { toLetter, toLetterIndex } from '../LetterAt';

export class Board {
    constructor(
        public ranks: number = 10,
        public files: number = 10,
        public pieces: Map<number, Piece> = new Map()
    ) {}

    public getPieceFromPosition(position: Position): Piece {
        for(let piece of this.pieces.values())
            if(piece.position.equals(position))
                return piece;
    }

    public getPiece(id: number) {
        return this.pieces.get(id)!;
    }

    public addPiece(piece: Piece): void {
        this.pieces.set(position.toString(), piece);
    }

    public removePiece(piece: Piece): void {
        this.pieces.delete(piece.id);
    }

    public isEmpty(position: Position): boolean {
        return !this.pieces.has(position.toString());
    }

    public onBoard(position: Position): boolean {
        return position.rank >= 1 && position.rank <= this.ranks && toLetterIndex(position.file) >= 1 && toLetterIndex < this.files;
    }
}