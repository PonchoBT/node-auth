import { BcryptAdapter } from '../../config';
import { UserModel } from '../../data/mongodb';
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from '../../domain';


export class AuthDatasourceImpl implements AuthDatasource {

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

    const { name, email, password } = registerUserDto;

    try {
      // 1. Verificar si el correo existe
      const exists = await UserModel.findOne({ email });
      if (exists) throw CustomError.badRequest('User already exists');


      // 2. Hash de contraseña

      const user = await UserModel.create({
        name: name,
        email: email,
        password: BcryptAdapter.hash(password),
      });

      await user.save();
      // if ( 'poncho@gmail.com' === email) {
      //   throw CustomError.badRequest('Correo ya existe')
      // }

      return new UserEntity(
        user.id,
        name,
        email,
        user.password,
        user.roles,

      );


    } catch (error) {

      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }

  }

}