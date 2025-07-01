import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const { description } = createRoleDto;

    const existingRole = await this.prisma.role.findFirst({
      where: { description: description },
    });

    if (existingRole) {
      throw new ConflictException('Já existe um papel com esta descrição');
    }

    const role = await this.prisma.role.create({
      data: {
        description: description,
      },
    });

    return {
      role,
      message: 'Papel de usuário criado com sucesso',
    };
  }

  async findOne(id: number) {
    const role = await this.prisma.role.findUnique({
      where: { id: id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!role) {
      throw new NotFoundException('Papel não encontrado');
    }
    return role;
  }

}