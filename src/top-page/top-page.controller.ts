import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TOP_PAGE_NOT_FOUND_ERROR } from './top-page.constants';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Controller('top-page')
export class TopPageController {
	constructor(private readonly topPageService: TopPageService) { }

	@Post('create')
	async create(@Body() dto: CreateTopPageDto) {
		return this.topPageService.create(dto)
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		const page = await this.topPageService.findById(id);
		if (!page) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
		}
		return page
	}

	@Get('byAlias/:alias')
	async getByAlias(@Param('alias') alias: string) {
		const page = await this.topPageService.findByAlias(alias);
		if (!page) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
		}
		return page
	}

	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedPage = await this.topPageService.deleteById(id);
		if (!deletedPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
		}
	}

	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
		const updatedPage = await this.topPageService.updateById(id, dto);
		if (!updatedPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
		}
		return updatedPage
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto.firstCategory)
	}

	@Get('textSearch/:text')
	async textSeach(@Param('text') text: string) {
		return this.topPageService.searchByText(text)
	}
}
