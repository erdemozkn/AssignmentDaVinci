import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    private readonly usersService: UsersService;

    constructor(usersService: UsersService) {
        this.usersService = usersService;
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
    getAllUsers() {
        try {
            return this.usersService.findAllUsers();
        } catch (error) {
            throw new HttpException(`Error fetching users: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiResponse({ status: 200, description: 'User found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    getUserById(@Param('id') id: string) {
        try {
            return this.usersService.findUserById(Number(id));
        } catch (error) {
            throw new HttpException(`Error fetching user: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    createUser(@Body() newUser: CreateUserDto) {
        try {
            return this.usersService.createUser(newUser);
        } catch (error) {
            throw new HttpException(`Error creating user: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a user' })
    @ApiResponse({ status: 200, description: 'User updated successfully' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    updateUser(
        @Param('id') id: string,
        @Body() updatedUser: UpdateUserDto,
    ) {
        try {
            return this.usersService.updateUser(Number(id), updatedUser);
        } catch (error) {
            throw new HttpException(`Error updating user: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    deleteUser(@Param('id') id: string) {
        try {
            return this.usersService.deleteUser(Number(id));
        } catch (error) {
            throw new HttpException(`Error deleting user: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
