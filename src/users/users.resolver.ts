import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

@Resolver(of => User)
export class UserResolver {

    constructor(
        private readonly userService:UserService
    ) {}

    @Query(returns => [User])
    users(@Args('input') email:string):User[] {
        return []; 
    }
}