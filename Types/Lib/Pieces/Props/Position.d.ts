export class Position {
    constructor(
        public rank: number,
        public file: string
    ){}

    public equals(other: Position): boolean {
        return this.rank === other.rank && this.file === other.file;
    }

    public toString(): string {
        return `${this.file}${this.rank}`;
    }
};