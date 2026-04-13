import { IsEmail, IsString, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: "Acme Corp" })
  @IsString()
  @MinLength(2)
  organizationName!: string;

  @ApiProperty({ example: "john@acme.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "strongpassword123", minLength: 8 })
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password!: string;
}
