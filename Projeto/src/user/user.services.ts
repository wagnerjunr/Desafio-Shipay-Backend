import { Injectable, BadRequestException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, name, roleId } = createUserDto;
    const existingUser = await this.prisma.user.findFirst({
      where: { email: email },
    });

    if (existingUser) {
      throw new BadRequestException("Email já está em uso");
    }

    const role = await this.prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      throw new BadRequestException("Papel de usuário não encontrado");
    }

    let password = createUserDto.password;
    if (!password) {
      password = this.generateRandomPassword();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roleId,
      },
      include: {
        role: true,
      },
    });

    return {
      message: "Usuário criado com sucesso",
    };
  }

  private generateRandomPassword(): string {
    return crypto.randomBytes(8).toString("hex");
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: BigInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        roleId: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        userClaims: {
          include: {
            claim: true,
          },
        },
      },
    });
    if (!user) {
      throw new BadRequestException("Usuário não encontrado");
    }
    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  async getUserWithPermissionsRawSQL(userId: number) {
    try {
      const result = await this.prisma.$queryRaw`
        SELECT 
            u.name AS nome,
            u.email AS email,
            r.description AS papel_descricao,
            c.description AS permissao_descricao
        FROM users u
        INNER JOIN roles r ON u.role_id = r.id
        LEFT JOIN user_claims uc ON u.id = uc.user_id
        LEFT JOIN claims c ON uc.claim_id = c.id AND c.active = true
        WHERE u.id = ${BigInt(userId)}
        ORDER BY c.description
      `;

      if (!result || (Array.isArray(result) && result.length === 0)) {
        throw new BadRequestException("Usuário não encontrado");
      }

      return {
        data: result,
      };
    } catch (error) {
      throw new BadRequestException(`Erro na consulta SQL: ${error.message}`);
    }
  }
}
