import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TopLevelCategory, TopPageModel } from './top-page.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Injectable()
export class TopPageService {
    constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) { }

    @UseGuards(JwtAuthGuard)
    async create(dto: CreateTopPageDto) {
        return this.topPageModel.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    async findById(id: string) {
        return this.topPageModel.findById(id).exec();
    }

    async findByAlias(alias: string) {
        return this.topPageModel.findOne({ alias }).exec()
    }

    @UseGuards(JwtAuthGuard)
    async deleteById(id: string) {
        return this.topPageModel.findByIdAndDelete(id).exec()
    }

    @UseGuards(JwtAuthGuard)
    async updateById(id: string, dto: CreateTopPageDto) {
        return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec()
    }

    async findByCategory(firstCategory: TopLevelCategory) {
        return this.topPageModel.aggregate([
            {
                $match: {
                    firstCategory
                },
            },
            {
                $group: {
                    _id: { secondCategory: '$secondCategory' },
                    pages: {
                        $push: {
                            alias: '$allias',
                            title: '$title',
                        }
                    }
                }
            },
        ]).exec()
    }

    async searchByText(text: string) {
        return this.topPageModel.find({
            $text: {
                $search: text,
                $caseSensitive: false,
            }
        }).exec()
    }

    async findAll() {
        return this.topPageModel.find({}).exec()
    }
}
