import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
    private readonly postsService: PostsService;

    constructor(postsService: PostsService) {
        this.postsService = postsService;
    }

    @Get()
    @ApiOperation({ summary: 'Get all posts' })
    @ApiResponse({ status: 200, description: 'Posts retrieved successfully' })
    getAllPosts() {
        return this.postsService.getAllPosts();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get post by ID' })
    @ApiResponse({ status: 200, description: 'Post found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    getPostById(@Param('id') id: string) {
        try {
            return this.postsService.getPostById(Number(id));
        } catch (error) {
            throw new HttpException(`Error fetching post: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Get posts by User ID' })
    @ApiResponse({ status: 200, description: 'Posts retrieved successfully' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    getPostsByUserId(@Param('userId') userId: string) {
        try {
            return this.postsService.getPostsByUserId(Number(userId));
        } catch (error) {
            throw new HttpException(`Error fetching posts: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create a new post' })
    @ApiResponse({ status: 201, description: 'Post created successfully' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    createPost(@Body() newPost: CreatePostDto) {
        try {
            return this.postsService.createPost(newPost);
        } catch (error) {
            throw new HttpException(`Error creating post: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a post' })
    @ApiResponse({ status: 200, description: 'Post updated successfully' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    updatePost(@Param('id') id: string, @Body() updatedPost: UpdatePostDto) {
        try {
            return this.postsService.updatePost(Number(id), updatedPost);
        } catch (error) {
            throw new HttpException(`Error updating post: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a post' })
    @ApiResponse({ status: 200, description: 'Post deleted successfully' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    deletePost(@Param('id') id: string) {
        try {
            return this.postsService.deletePost(Number(id));
        } catch (error) {
            throw new HttpException(`Error deleting post: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}


