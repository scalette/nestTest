import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class imdb {
	@prop()
	rating: number;

	@prop()
	votes: number;

	@prop()
	id: number;
}

class viewer {
	@prop()
	rating: number;

	@prop()
	numReviews: number;
}

class tomatoes {
	@prop({ type: () => viewer, _id: false })
	viewer: viewer;

	@prop()
	lastUpdated: Date;
}

export interface MovieModel extends Base { }
export class MovieModel extends TimeStamps {
	@prop()
	title: string;

	@prop()
	year: number;

	@prop()
	runtime: number;

	@prop()
	num_mflix_comments: number;

	@prop()
	released: Date;

	@prop()
	poster: string;

	@prop()
	plot: string;

	@prop()
	fullplot: string;

	@prop()
	lastupdated: string;

	@prop()
	type: string;

	@prop({ type: () => [String] })
	directors: string[];

	@prop({ type: () => [String] })
	cast: string[];

	@prop({ type: () => [String] })
	countries: string[];

	@prop({ type: () => [String] })
	genres: string[];

	@prop({ type: () => imdb, _id: false })
	imdb: imdb;

	@prop({ type: () => tomatoes, _id: false })
	tomatoes: tomatoes;
}
