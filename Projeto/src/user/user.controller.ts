import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.services';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get(':userId/role')
  async userRoleById(@Param('userId') userId: string) {
    return this.userService.userRoleById(+userId);
  }

  @Get(':id/test-sql')
  async getUserWithPermissionsRaw(@Param('id') id: string) {
    return this.userService.getUserWithPermissionsRawSQL(+id);
  }
}