import { Injectable } from '@nestjs/common';
import { MovieModel } from './movie.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class MoviesService {
    //@ts-ignore
    constructor(@InjectModel(MovieModel) private readonly movieModel: ModelType<MovieModel>) { }


    async findById(id: string) {
        return this.movieModel.findById(id).exec()
    }

    async findMoviesByActor(actorName: string) {
        return this.movieModel.aggregate([
            {
                $match: {
                    cast: actorName,
                }
            }
        ]).exec() as unknown as Promise<ModelType<MovieModel>>[]
    }
}
