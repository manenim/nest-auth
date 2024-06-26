import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  genre: string;
}
