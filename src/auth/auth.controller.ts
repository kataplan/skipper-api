import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto, CreateUserDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Registers a new user with the provided credentials.
   *
   * @param authCredentialsDto - The credentials for creating a new user, including name, email, and password.
   * @returns A promise that resolves when the user is successfully registered.
   */
  @Post('/signup')
  signUp(@Body() authCredentialsDto: CreateUserDto): Promise<void> {
    return this.authService.SignUp(authCredentialsDto);
  }
  /**
   * Authenticates a user and returns an access token.
   *
   * @param authCredentialsDto - The authentication credentials containing email and password.
   * @returns A promise that resolves to an object containing the access token.
   */
  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.SignIn(authCredentialsDto);
  }

  /**
   * Handles the refresh of an access token.
   *
   * @param oldToken - The current access token to be refreshed.
   * @returns A promise that resolves to an object containing a new access token.
   */
  @Post('/refresh')
  refresh(
    @Body('accessToken') oldToken: string,
  ): Promise<{ accessToken: string }> {
    return this.authService.refresh(oldToken);
  }
}
