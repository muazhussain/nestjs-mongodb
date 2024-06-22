import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post()
    async createUser(@Body() payload: CreateUserDto) {
        try {
            return await this.userService.createUser(payload);
        } catch (error) {
            throw error;
        }
    }

    @Get()
    async getUsers() {
        try {
            return await this.userService.getUsers();
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        try {
            return await this.userService.getUserById(id);
        } catch (error) {
            throw error;
        }
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() payload: UpdateUserDto) {
        try {
            return await this.userService.updateUser(id, payload);
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        try {
            return await this.userService.deleteUser(id);
        } catch (error) {
            throw error;
        }
    }
}
