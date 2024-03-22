import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport-local";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    // inject userRepository
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super(
      {
        usernameField: 'email'
      }
    );
    }
    
    public async validate(email: string, password: string) {
      //find user
      const user = await this.userRepository.findOne({
        where: { email: email },
      });

      if (!user) throw new UnauthorizedException('email does not exist');

      // verify password

      const matchedPassword = await bcrypt.compare(
        password,
        user.password,
      );
      if (!matchedPassword)
        throw new ForbiddenException('Incorrect Credentials');
    return user
    }

}