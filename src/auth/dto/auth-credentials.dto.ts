import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: 'Email must be a valid email address',
  })
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(48)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password!: string;
}

export class CreateUserDto extends AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(48)
  name!: string;
}
