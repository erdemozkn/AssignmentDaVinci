import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @ApiProperty({ example: 'This is the content of my first post.' })
    content: string;
    @ApiProperty({ example: 5 })
    authorId: number;
    @ApiProperty({ example: '2023-10-01T12:00:00Z' })
    createdAt: Date;
}