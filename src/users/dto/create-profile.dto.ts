import { ApiProperty } from "@nestjs/swagger";

export class CreateProfileDto {
  @ApiProperty({
    description: 'the phone number',
    type: String,
    default: '090009909000',
  })
  phoneNumber: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  country: string;
}
