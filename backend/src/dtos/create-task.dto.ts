import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 500)
  description!: string;

  @IsString()
  @IsEnum(["PENDING", "COMPLETED"])
  @IsOptional()
  status!: string;
}
