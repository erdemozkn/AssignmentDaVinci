import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UsersService } from 'src/users/users.service';

export type Post = {
    id: number;
    content: string;
    authorId: number;
    createdAt: Date;
};

@Injectable()
export class PostsService {
    private posts: Post[] = [
        { id: 1, content: 'First post', authorId: 1, createdAt: new Date() },
        { id: 2, content: 'Second post', authorId: 2, createdAt: new Date() },
        { id: 3, content: 'Third post', authorId: 3, createdAt: new Date() },
        { id: 4, content: 'Fourth post', authorId: 4, createdAt: new Date() },
        { id: 5, content: 'Fifth post', authorId: 5, createdAt: new Date() },
        { id: 6, content: 'Sixth post', authorId: 6, createdAt: new Date() },
        { id: 7, content: 'Seventh post', authorId: 7, createdAt: new Date() },
        { id: 8, content: 'Eighth post', authorId: 8, createdAt: new Date() },
        { id: 9, content: 'Ninth post', authorId: 9, createdAt: new Date() },
        { id: 10, content: 'Tenth post', authorId: 10, createdAt: new Date() }
    ];
    constructor(@Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService) { }
    private idCounter = this.posts.length + 1;

    getAllPosts(): Post[] {
        return this.posts;
    }

    getPostById(id: number): Post | undefined {
        return this.posts.find(post => post.id === id);
    }

    getPostsByUserId(authorId: number): Post[] {
        return this.posts.filter(post => post.authorId === authorId);
    }

    createPost(post: CreatePostDto): Post {
        const user = this.usersService.findUserById(post.authorId);
        if (!user) {
            throw new NotFoundException(`User with id ${post.authorId} not found`);
        }
        const newPost: Post = { id: this.idCounter, ...post, createdAt: new Date() };
        this.posts.push(newPost);
        this.idCounter++;
        return newPost;
    }

    updatePost(id: number, updatedPost: Partial<Post>): Post | null {
        const post = this.getPostById(id);
        if (post) {
            Object.assign(post, updatedPost);
            return post;
        }
        return null;
    }

    deletePost(id: number): boolean {
        const index = this.posts.findIndex(post => post.id === id);
        if (index !== -1) {
            this.posts.splice(index, 1);
            return true;
        }
        return false;
    }
}
