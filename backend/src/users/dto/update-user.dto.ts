import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 1 })
  id?: number;

  @ApiPropertyOptional({ example: 'Alex' })
  name?: string;

  @ApiPropertyOptional({ example: 'alex123' })
  username?: string;

  @ApiPropertyOptional({ example: 'alex@example.com' })
  email?: string;
}