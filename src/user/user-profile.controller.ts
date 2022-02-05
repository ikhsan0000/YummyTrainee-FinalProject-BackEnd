import { Body, Controller, Get, Patch, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GetCurrentUser } from 'src/common/decorator';
import { editFileName, imageFileFilter } from 'src/common/imageUtils/imageUtils';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserProfile } from './entities/user-profile.entity';
import { UserProfileService } from './user-profile.service';

@Controller('user-profile')
export class UserProfileController {

    constructor(private userProfileService: UserProfileService){}

    @Get()
    async getById(@GetCurrentUser('sub') userId:number){
        return await this.userProfileService.getByUserId(userId)
    }

    @Patch('/profile-picture')
    @UseInterceptors(FileInterceptor('file',{
        storage: diskStorage({
            destination: './images/profile',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter
    }))
    async createProduct(
        @GetCurrentUser('sub') userId:number,
        @UploadedFile() file: any
    ){
        return await this.userProfileService.updateProfilePicture(userId, file)
    }
    
    @Patch()
    async updateProfile(
        @GetCurrentUser('sub') userId:number,
        @Body() updateProfileDto: UpdateProfileDto
    ){
        return await this.userProfileService.updateUserProfile(userId, updateProfileDto)
    }


}
