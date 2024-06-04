import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MOVIE_NOT_FOUND_ERROR } from './movie.constants';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { FindMoviesByActorNameDto } from './dto/findProduct.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly movieService: MoviesService) { }

    @Get(':id')
    async get(@Param('id', IdValidationPipe) id: string) {
        const movie = this.movieService.findById(id);

        if (!movie) {
            throw new NotFoundException(MOVIE_NOT_FOUND_ERROR)
        }
        return movie
    }

    @Post('findByActorName')
    async getMovieByActorName(@Body() dto: FindMoviesByActorNameDto) {
        console.log('dto', dto)
        const movies = await this.movieService.findMoviesByActor(dto.actorName);

        if (movies.length <= 0) {
            throw new NotFoundException(MOVIE_NOT_FOUND_ERROR)
        }
        return movies
    }
}
