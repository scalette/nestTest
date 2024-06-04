import { IsString } from "class-validator";

export class FindMoviesByActorNameDto {
    @IsString()
    actorName: string;
}