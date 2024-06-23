import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'post' })
export class Post {
    @Prop()
    title: string;

    @Prop()
    content: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);