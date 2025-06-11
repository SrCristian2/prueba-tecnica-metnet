import { IsEnum, IsOptional, IsString, Length } from "class-validator";

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  description?: string;

  @IsOptional()
  @IsString()
  @IsEnum(["PENDING", "COMPLETED"])
  status?: string;
}
