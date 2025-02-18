import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto, CreateUserDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: CreateUserDto): Promise<void> {
    return this.authService.SignUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.SignIn(authCredentialsDto);
  }

  @Post('/refresh')
  refresh(
    @Body('accessToken') oldToken: string,
  ): Promise<{ accessToken: string }> {
    return this.authService.refresh(oldToken);
  }
}
