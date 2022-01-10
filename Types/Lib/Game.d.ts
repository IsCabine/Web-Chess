import { Board } from './Board';
import { Piece } from './Pieces/Piece';
import { GameState } from './Props/GameState';
import { Color } from './Props/Color';
import { toLetterIndex } from './LetterAt';

import { Pawn } from './Pieces/Pawn';
import { Rook } from './Pieces/Rook';
import { Knight } from './Pieces/Knight';
import { Bishop } from './Pieces/Bishop';
import { Queen } from './Pieces/Queen';
import { King } from './Pieces/King';

import * as events from 'events';

import * as defaultBoard from './Data/default_board.json';
import { Position } from './Props/Position';

type PieceType = Pawn | Rook | Knight | Bishop | Queen | King;

export class Game extends events.EventEmitter {
    public board: Board;
    public white: Piece[] = [];
    public black: Piece[] = [];
    public state: GameState = GameState.INITIALIZING;
    public moves: Board[] = [];

    public timeLimit: number;
    public whiteTimePassed: number = 0;
    public blackTimePassed: number = 0;
    public turnsSinceCaptureOrPawnMove: number = 0;
    public turns: number = 0;
    public whiteKingInStalemate: boolean = false;
    public blackKingInStalemate: boolean = false;
    public whiteInsufficientMaterial: boolean = false;
    public blackInsufficientMaterial: boolean = false;

    public currentTurn: Color = Color.WHITE;

    public resolvePromise: Function;
    public rejectPromise: Function;

    public constructor(options: {
        timeLimit?: number,
        board?: Board,
    }) {
        this.timeLimit ??= options.timeLimit;
        this.board = options.board ?? new Board();
    }

    public start(movePiece: (piece: Piece) => void, check: (board: Board) => void) {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;

            this.board.pieces.forEach((piece, position) => this[piece.color.toString().toLowerCase()].push(piece));

            this.state = GameState.PLAYING;

            if(this.board.pieces.size === 0) 
                this.initializeBoard();
            
            this.on('clientMove', (id: number, to: Position) => {
                const piece = this.board.getPiece(id);

                if(piece.color !== this.currentTurn || !piece.availableMoves.includes(to))
                    return;            
                
                this.turnsSinceCaptureOrPawnMove = piece instanceof Pawn || piece.isEnemy(to) ? 0 : this.turnsSinceCaptureOrPawnMove + 1;
                this.currentTurn = this.currentTurn == Color.WHITE ? Color.BLACK : Color.WHITE;

                if(this.turnsSinceCaptureOrPawnMove > 75)
                    this.emit('Forced Stalemate');
                else if(this.turnsSinceCaptureOrPawnMove > 50)
                    this.emit('Allow Unconsensual Stalemate');

                // TODO: Peform check for insufficient material
                // TODO: Perform check for stalemate

                if(piece.color == Color.BLACK)
                    this.turns++;

                // TODO: Emit move event onto this
            });

            // TODO: Implement timers
            // TODO: Destroy listeners on game end
        });
    }

    public initializeBoard(board?: Board): Board {
        if(board)
            return this.board = board;
        
        let id: number = 0;
        defaultBoard.forEach(piece => {
            if( !['rook', 'knight', 'bishop', 'queen', 'king', 'pawn'].includes(piece.type) ||
                !['white', 'black'].includes(piece.color) ||
                toLetterIndex(piece.file.charCodeAt()) < 0 ||
                toLetterIndex(piece.file.charCodeAt()) > this.board.files - 1 ||
                piece.rank < 1 ||
                piece.rank > this.board.ranks
            ) {
                throw new TypeError('Invalid Piece Data');
            }

            const pieceParameters: [Position, Color, Board, number] = [
                new Position(piece.file, piece.rank),
                piece.color == 'white' ? Color.WHITE : Color.BLACK,
                this.board,
                id++
            ];

            const pieceObj: PieceType;

            switch(piece.type) {
                case 'pawn':
                    pieceObj = new Pawn(...pieceParameters);
                    break;
                case 'rook':
                    pieceObj = new Rook(...pieceParameters);
                    break;
                case 'knight':
                    pieceObj = new Knight(...pieceParameters);
                    break;
                case 'bishop':
                    pieceObj = new Bishop(...pieceParameters);
                    break;
                case 'queen':
                    pieceObj = new Queen(...pieceParameters);
                    break;
                case 'king':
                    pieceObj = new King(...pieceParameters);
                    break;
            }

            this.board.addPiece(pieceObj);
        });

        return this.board;
    }
}