import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'user-settings' })
export class UserSettings {
    @Prop({ required: false })
    receiveNotification?: boolean;

    @Prop({ required: false })
    receiveEmails?: boolean;

    @Prop({ required: false })
    receiveSMS?: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);