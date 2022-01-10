import { Position } from '../Props/Position';
import { PositionCollection } from './PositionCollection';
import { Color } from '../Props/Color';
import { Board } from '../Board';
import { HTMLCharacters } from '../Props/HTMLCharacters';
import { Pawn } from './Pawn';

export abstract class Piece {
    public unicode: string;

    abstract public availableMoves: PositionCollection;
    abstract protected static chars: HTMLCharacters;

    public character: string;

    constructor(
        public position: Position, 
        public color: Color,
        protected board: Board,
        public id?: number
    ) {
        setTimeout(() => this.character = this.chars[this.color === Color.BLACK as number]);
    }

    abstract public calculateAvailableMoves(): void;

    public move(to: Position): void {
        this.board.getPiece(this.id).position = to;
        this.position = to;
    }

    public isAvailable(to: Position): boolean {
        this.calculateAvailableMoves();
        return this.availableMoves.some(p => p.equals(to));
    }

    public isEnemy(position: Position): boolean {
        return !this.board.isEmpty(position) && this.board.getPieceFromPosition(position).color !== this.color;
    }

    public isAllied(position: Position): boolean {
        return !this.board.isEmpty(position) && this.board.getPieceFromPosition(position).color === this.color;
    }
}