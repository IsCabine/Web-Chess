import { Piece } from './Piece';
import { Color } from './Props/Color';
import { toAscii, a_ascii } from '../LetterAt';

class Rook extends Piece {
    protected static chars = ['&#x2659;', '&#x265F;'];
    
    public calculateAvailableMoves(): void {
        super.availableMoves = [];
    }
}