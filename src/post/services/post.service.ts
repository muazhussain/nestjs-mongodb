import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../schemas/post.schema';
import mongoose, { Model } from 'mongoose';
import { CreatePostDto } from '../dtos/create-post.dto';
import { User } from 'src/user/schemas/user.schemas';

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private readonly postModel: Model<Post>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) { }

    async createPost({ userId, ...payload }: CreatePostDto): Promise<Post> {
        try {
            const findUser = await this.userModel.findById(userId);
            if (!findUser) {
                throw new HttpException('User not found', 404);
            }
            const newPost = new this.postModel(payload);
            const savedPost = await newPost.save();
            await findUser.updateOne({
                $push: { posts: savedPost._id }
            });
            return savedPost;
        } catch (error) {
            throw error;
        }
    }

    async getPosts() {
        try {
            return await this.postModel.find().populate('user');
        } catch (error) {
            throw error;
        }
    }

    async getPostById(id: string) {
        try {
            const isValid = mongoose.Types.ObjectId.isValid(id);
            if (!isValid) {
                throw new HttpException('Invalid Id', 404);
            }
            return await this.postModel.findById(id);
        } catch (error) {
            throw error;
        }
    }


}
