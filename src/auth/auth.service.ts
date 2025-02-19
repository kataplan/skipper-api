import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto, CreateUserDto } from './dto/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Creates a new user with the provided details.
   *
   * @param createUserDto - An object containing the user's email, password, and name.
   * @returns A promise that resolves when the user is successfully created.
   * @throws {ConflictException} If a user with the same email already exists.
   * @throws {InternalServerErrorException} If an unexpected error occurs during user creation.
   */
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { email, password, name } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      email,
      name,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(user);
    } catch (error: unknown) {
      if (error instanceof ConflictException) {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  /**
   * Registers a new user with the provided credentials.
   *
   * @param authCredentialsDto - An object containing the user's registration details.
   * @returns A promise that resolves when the user is successfully created.
   * @throws {ConflictException} If a user with the same email already exists.
   * @throws {InternalServerErrorException} If an unexpected error occurs during user creation.
   */
  async SignUp(authCredentialsDto: CreateUserDto): Promise<void> {
    return this.createUser(authCredentialsDto);
  }

  /**
   * Authenticates a user using their email and password.
   *
   * @param authCredentialsDto - An object containing the user's email and password.
   * @returns A promise that resolves to an object containing a JWT access token.
   * @throws {UnauthorizedException} If the email or password is incorrect.
   */
  async SignIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException('Please check your login credentials');
  }

  /**
   * Refreshes the JWT access token using the provided old token.
   *
   * @param oldToken - The expired or soon-to-expire JWT token.
   * @returns A promise that resolves to an object containing a new access token.
   * @throws {UnauthorizedException} If the user is not found, the token is expired, or the token is invalid.
   */
  async refresh(oldToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = this.jwtService.verify(oldToken);
      const { email } = payload;
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      delete payload.exp;
      delete payload.iat;
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired');
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
}
