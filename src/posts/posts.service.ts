import { User } from 'src/users/entities/user.entity';
import { Injectable, SerializeOptions } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    private readonly usersService: UsersService
  ){}
  async create(user: User, createPostDto: CreatePostDto) {
    const userInfo = await this.usersService.findOne(user.id)

    let post = new Post()
    post.user = userInfo
    post = { ...post, ...createPostDto };

    return await this.postRepository.save(post)
  }

  async findAll() {
    return await this.postRepository.find({relations: {user: true}});
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
