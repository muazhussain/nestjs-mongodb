import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema,
    }])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
