import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { MovieModel } from './movie.model';

@Module({
    controllers: [MoviesController],
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: MovieModel,
                schemaOptions: {
                    collection: 'movies'
                }
            }
        ])
    ],
    providers: [MoviesService]
})
export class MoviesModule { }
