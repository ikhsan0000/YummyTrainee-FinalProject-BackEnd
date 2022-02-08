import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GetCurrentUser, Public } from 'src/common/decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Public()
    @Get('/:id')
    async getById(@Param('id') id: number){
        return await this.userService.getById(id)
    }

    @Patch()
    async updateUser(
        @GetCurrentUser('sub') userId:number,
        @Body() updateUserDto: UpdateUserDto
    ){
        return await this.userService.update({id:userId, ...updateUserDto})
    }

    @Delete()
    async deleteUser(@GetCurrentUser('sub') userId:number){
        await this.userService.delete(userId)
        return 'Successfuly Deleted'
    }

}
