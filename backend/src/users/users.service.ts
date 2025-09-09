import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PostsService } from 'src/posts/posts.service';

export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
};

@Injectable()
export class UsersService {
    private users: User[] = [
        { id: 1, name: 'John Doe', username: 'johndoe', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Smith', username: 'janesmith', email: 'jane.smith@example.com' },
        { id: 3, name: 'Alice Johnson', username: 'alicej', email: 'alice.johnson@example.com' },
        { id: 4, name: 'Bob Brown', username: 'bobb', email: 'bob.brown@example.com' },
        { id: 5, name: 'Charlie Davis', username: 'charlied', email: 'charlie.davis@example.com' },
        { id: 6, name: 'Diana Evans', username: 'dianae', email: 'diana.evans@example.com' },
        { id: 7, name: 'Frank Green', username: 'frankg', email: 'frank.green@example.com' },
        { id: 8, name: 'Grace Harris', username: 'graceh', email: 'grace.harris@example.com' },
        { id: 9, name: 'Hank Irving', username: 'hanki', email: 'hank.irving@example.com' },
        { id: 10, name: 'Ivy Jackson', username: 'ivyj', email: 'ivy.jackson@example.com' }
    ];
    constructor(@Inject(forwardRef(() => PostsService)) private readonly postsService: PostsService) { }
    private idCounter = this.users.length + 1;

    findAllUsers(): User[] {
        return this.users;
    }

    findUserById(id: number): User | undefined {
        return this.users.find(user => user.id === id);
    }

    createUser(user: CreateUserDto): User {
        const newUser: User = {
            ...user,
            id: this.idCounter,
        };
        this.users.push(newUser);
        this.idCounter++;
        return newUser;
    }

    updateUser(id: number, updatedUser: Partial<User>): User | null {
        const user = this.findUserById(id);
        if (user) {
            Object.assign(user, updatedUser);
            return user;
        }
        return null;
    }

    deleteUser(id: number): boolean {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.postsService.getPostsByUserId(id).forEach(post => {
                this.postsService.deletePost(post.id);
            });
            this.users.splice(index, 1);
            return true;
        }
        return false;
    }
}