import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class UserSettingsDto {
    @IsBoolean()
    @IsOptional()
    receiveNotification?: boolean;

    @IsBoolean()
    @IsOptional()
    receiveEmails?: boolean;

    @IsBoolean()
    @IsOptional()
    receiveSMS?: boolean;
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsOptional()
    displayName: string;

    @IsString()
    avatarUrl: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => UserSettingsDto)
    userSettings: UserSettingsDto;
}