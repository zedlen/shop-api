import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsBoolean()
  public enable_all?: boolean;

  @IsOptional()
  @IsArray()
  public sellers?: string;
}
