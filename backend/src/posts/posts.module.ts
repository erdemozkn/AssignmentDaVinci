import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}