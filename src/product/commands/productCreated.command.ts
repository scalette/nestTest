export class ProductCreatedCommand {
    constructor(
        public readonly productId: string,
    ) { }
}