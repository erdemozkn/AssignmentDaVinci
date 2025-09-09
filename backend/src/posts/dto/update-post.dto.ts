import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
    @ApiProperty({ example: 1 })
    id: number;
    @ApiProperty({ example: 'This is the content of my first post.' })
    content: string;
    @ApiProperty({ example: '2' })
    authorId: number;
}