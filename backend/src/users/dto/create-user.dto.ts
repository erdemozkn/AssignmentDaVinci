import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Alex' })
  name: string;

  @ApiProperty({ example: 'alex123' })
  username: string;

  @ApiProperty({ example: 'alex@example.com' })
  email: string;
}