import { Injectable, ConflictException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import type { PrismaService } from "src/database/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, name, roleId } = createUserDto;

    const existingUser = await this.prisma.user.findFirst({
      where: { email: email },
    });

    if (existingUser) {
      throw new ConflictException("Email já está em uso");
    }

    const role = await this.prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      throw new ConflictException("Papel de usuário não encontrado");
    }

    let password = createUserDto.password;
    if (!password) {
      password = this.generateRandomPassword();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        roleId: roleId,
        createdAt: new Date(),
      },
      include: {
        role: true,
      },
    });

    return {
      user,
      messege: "Usuário criado com sucesso",
    };
  }

  private generateRandomPassword(): string {
    return crypto.randomBytes(8).toString("hex");
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id: BigInt(id) },
      include: {
        role: true,
        userClaims:true,
      },
    });
  }
}
