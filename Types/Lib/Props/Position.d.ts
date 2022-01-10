export class Position {
    constructor(
        public file: string,
        public rank: number,
    ){}

    public equals(other: Position): boolean {
        return this.rank === other.rank && this.file === other.file;
    }

    public toString(): string {
        return `${this.file}${this.rank}`;
    }
};