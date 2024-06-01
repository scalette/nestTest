import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ProductCreatedCommand } from "./productCreated.command";

@CommandHandler(ProductCreatedCommand)
export class KillDragonHandler implements ICommandHandler<ProductCreatedCommand> {
    constructor() { }

    async execute(command: ProductCreatedCommand) {
        const { productId } = command;
        console.log(productId, 'created!')
    }
}