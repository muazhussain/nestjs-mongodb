import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dtos/create-post.dto';

@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService,
    ) { }

    @Post()
    async createPost(@Body() payload: CreatePostDto) {
        try {
            return await this.postService.createPost(payload);
        } catch (error) {
            throw error;
        }
    }

    @Get()
    async getPosts() {
        try {
            return await this.postService.getPosts();
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    async getPostById(@Param('id') id: string) {
        try {
            return await this.postService.getPostById(id);
        } catch (error) {
            throw error;
        }
    }
}
