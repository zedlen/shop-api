import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  public code: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsOptional()
  @IsBoolean()
  public enable_all: boolean;

  @IsArray()
  public sellers: string;
}
