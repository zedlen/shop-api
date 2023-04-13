import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FeatureFlagService } from '../../domain/feature-flag.service';
import { CreateDto } from './dtos/create.dto';
import { FeatureFlagInterface } from '../../domain/interfaces/feature-flag.interface';
import { UpdateDto } from './dtos/update.dto';
import { HttpExceptionFilter } from '../../../../core/filters/http-exception.filter';
import { TransformInterceptor } from '../../../../core/interceptors/transform.interceptor';
import { featureFlagSerializer } from './serializers/feature-flag.serializer';
import { AuthGuard } from './../../../../core/guards/auth.guard';

@Controller('feature-flag')
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard)
export class FeatureFlagController {
  constructor(private readonly featureFlagService: FeatureFlagService) {}

  @Get()
  @UseInterceptors(new TransformInterceptor(featureFlagSerializer))
  async showAll(@Query('code') code: string): Promise<FeatureFlagInterface[]> {
    return this.featureFlagService.getAll(code);
  }

  @Get(':id')
  @UseInterceptors(new TransformInterceptor(featureFlagSerializer))
  async show(@Param('id') id: string): Promise<FeatureFlagInterface> {
    return this.featureFlagService.get(id);
  }

  @Post()
  @UseInterceptors(new TransformInterceptor(featureFlagSerializer))
  async create(@Body(ValidationPipe) featureFlag: CreateDto): Promise<FeatureFlagInterface> {
    return this.featureFlagService.create(featureFlag);
  }

  @Patch(':id')
  @UseInterceptors(new TransformInterceptor(featureFlagSerializer))
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) featureFlag: UpdateDto,
  ): Promise<FeatureFlagInterface> {
    return this.featureFlagService.update(id, featureFlag);
  }

  @Delete(':id')
  @UseInterceptors(new TransformInterceptor(featureFlagSerializer))
  async delete(@Param('id') id: string): Promise<FeatureFlagInterface> {
    return this.featureFlagService.delete(id);
  }
}
