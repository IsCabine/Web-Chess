import { Piece } from './Pieces/Piece';
import { Position } from './Pieces/Props/Position';
import { toLetter, toLetterIndex } from '../LetterAt';

export class Board {
    constructor(
        public ranks: number = 10,
        public files: number = 10,
        public pieces: Map<string, Piece> = new Map()
    ) {}

    public getPiece(position: Position): Piece|null {
        return this.pieces.get(position.toString()) || null;
    }

    public setPiece(position: Position, piece: Piece): void {
        this.pieces.set(position.toString(), piece);
    }

    public removePiece(position: Position): void {
        this.pieces.delete(position.toString());
    }

    public isEmpty(position: Position): boolean {
        return !this.pieces.has(position.toString());
    }

    public onBoard(position: Position): boolean {
        return position.rank >= 1 && position.rank <= this.ranks && toLetterIndex(position.file) >= 1 && toLetterIndex < this.files;
    }
}