import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'user' })
export class User {
    @Prop({
        unique: true,
        required: true,
    })
    username: string;

    @Prop({
        required: false,
    })
    displayName?: string;

    @Prop({
        required: false,
    })
    avatarUrl?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);