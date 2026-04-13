import { ApiProperty } from "@nestjs/swagger";

export class ConversationResponseDto {
  @ApiProperty({ example: "clh7z2k0e0000356ow8ydj4i1" })
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  tenantId!: string;

  @ApiProperty()
  createdAt!: Date;
}
