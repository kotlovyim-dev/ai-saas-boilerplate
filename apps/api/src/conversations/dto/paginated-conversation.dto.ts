import { ApiProperty } from "@nestjs/swagger";
import { ConversationResponseDto } from "./conversation-response.dto";

export class PaginatedConversationsDto {
  @ApiProperty({ type: [ConversationResponseDto] })
  data!: ConversationResponseDto[];

  @ApiProperty({ example: 42 })
  total!: number;

  @ApiProperty({ example: 1 })
  page!: number;
}
