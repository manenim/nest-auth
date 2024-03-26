import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...others } = createUserDto;
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = { ...others, password: hashedPassword };

    return await this.userRepository.save(user);
  }

  async updateProfile(id: string, profile: CreateProfileDto) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });
    if (!user)
      throw new UnauthorizedException('you are not allowed to do this');


    user.profile = {...user.profile, ...profile}

    return await this.userRepository.save(user)

  }

  async createProfile(id: string, profile: CreateProfileDto) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });
    if (!user)
      throw new UnauthorizedException('you are not allowed to do this');

    const userWithProfile = { ...user, profile }
    
    return await this.userRepository.save(userWithProfile);

  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });
    if (!user)
      throw new UnauthorizedException('you are not allowed to do this');

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
  // updateProfile(id: number, updateProfileDto: UpdateProfileDto) {
    
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
