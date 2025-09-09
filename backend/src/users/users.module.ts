import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [forwardRef(() => PostsModule)],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
