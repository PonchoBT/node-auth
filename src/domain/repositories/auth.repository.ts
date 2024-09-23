import { UserEntity } from '../entities/user.entity';
import { RegisterUserDto } from '..';




export abstract class AuthRepository {

  // abstract login( loginUserDto: LoginUserDto ):Promise<UserEntity>;
  abstract register( registerUserDto: RegisterUserDto ):Promise<UserEntity>;


}
