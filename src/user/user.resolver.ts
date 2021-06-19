import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {

    constructor( private readonly userService:UserService ) {}

    @Query(returns => [User])
    users(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
        try {
            const { ok, error } = await this.userService.createAccount(createAccountInput);
            return {
                ok,
                error,
            }
        } catch (error) {
            return {
                ok: false,
                error,
            }
        }
    }

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
        try {
            return this.userService.login(loginInput);
        } catch (error) {
            return {
                ok:false,
                error,
            }
        }
    }

    @Query(returns => User)
    @UseGuards(AuthGuard)
    me(@AuthUser() authUser:User){
        return authUser;
    }
}