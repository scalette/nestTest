import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ProductCreatedCommand } from "./productCreated.command";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from 'nestjs-typegoose';
import { ProductModel } from "../product.model";

@CommandHandler(ProductCreatedCommand)
export class KillDragonHandler implements ICommandHandler<ProductCreatedCommand> {
    //@ts-ignore
    constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) { }

    async execute(command: ProductCreatedCommand) {

        const { productId } = command;
        const product = await this.productModel.findById(productId).exec()
        console.log(product, 'created!')
    }
}