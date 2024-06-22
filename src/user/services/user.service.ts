import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schemas';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserSettings } from '../schemas/user-settings.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(UserSettings.name) private readonly userSettingsModel: Model<UserSettings>,
    ) { }

    async createUser({ userSettings, ...payload }: CreateUserDto): Promise<User> {
        try {
            if (userSettings) {
                const newUserSettings = new this.userSettingsModel(userSettings);
                const savedUserSettings = await newUserSettings.save();
                const newUser = new this.userModel({
                    ...payload,
                    settings: savedUserSettings._id,
                });
                return await newUser.save();
            } else {
                const newUser = new this.userModel(payload);
                return await newUser.save();
            }
        } catch (error) {
            throw error;
        }
    }

    async getUsers(): Promise<User[]> {
        try {
            return await this.userModel.find().populate('settings');
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id: string): Promise<User> {
        try {
            const isValid = mongoose.Types.ObjectId.isValid(id);
            if (!isValid) {
                throw new HttpException('Invalid Id', 404);
            }
            return await this.userModel.findById(id).populate('settings');
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id: string, payload: UpdateUserDto): Promise<User> {
        try {
            const isValid = mongoose.Types.ObjectId.isValid(id);
            if (!isValid) {
                throw new HttpException('Invalid Id', 404);
            }
            return await this.userModel.findByIdAndUpdate(id, payload);
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id: string) {
        try {
            const isValid = mongoose.Types.ObjectId.isValid(id);
            if (!isValid) {
                throw new HttpException('Invalid Id', 404);
            }
            return await this.userModel.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}
