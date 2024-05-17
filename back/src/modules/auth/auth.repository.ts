import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepository } from "../users/users.repository";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { UserDto } from "src/dtos/User.dto";

@Injectable()
export class AuthRepository {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService
    ) {}

    async signUp(user: UserDto) {
        const usersExists = await this.usersRepository.getUserByEmail(user.email);
        if(usersExists) throw new BadRequestException('El usuario ya existe.');

        const hashedPassword = await bcrypt.hash(user.password, 10);
        await this.usersRepository.createUser({ ...user, password: hashedPassword });
        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }

    async signIn(email: string, password: string): Promise<string> {
        const user = await this.usersRepository.getUserByEmail(email);
        if(!user) throw new BadRequestException('Email o contraseña incorrectos.');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) throw new BadRequestException('Email o contraseña incorrectos.');

        const userPayload = { sub: user.id, email: user.email };
        const token = await this.jwtService.signAsync({ userPayload });

        return token;
    }

    async googleSignIn(email: string) {
        const user = await this.usersRepository.getUserByEmail(email);
        if(!user) throw new BadRequestException('Esta cuenta no se encuentra en nuestra base de datos.');
        
        const userPayload = { sub: user.id, email: user.email };
        const token = await this.jwtService.signAsync({ userPayload });

        return token;
    }
}