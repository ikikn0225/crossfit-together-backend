import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role-decorator";
import { User } from "src/user/entities/user.entity";
import { BorService } from "./board-of-record.service";
import { CreateBorInput, CreateBorOutput } from "./dtos/create-record.dto";
import { DeleteBorInput, DeleteBorOutput } from "./dtos/delete-record.dto";
import { EditBorInput, EditBorOutput } from "./dtos/edit-record.dto";
import { AllBoardofRecordInput, AllBoardofRecordOutput } from "./dtos/all-board-of-records.dto";
import { Bor } from "./entities/board-of-record.entity";
import { MyBoardofRecordInput, MyBoardofRecordOutput } from "./dtos/my-board-of-records.dto";
import { AllMyBoardofRecordOutput } from "./dtos/all-my-board-of-records.dto";


@Resolver(() => Bor)
export class BorResolver {
    constructor(
        private readonly borService:BorService
    ) {}

    @Role(["Any"])
    @Mutation(type => CreateBorOutput)
    async createBor(
        @AuthUser() user:User,
        @Args('input') createBor:CreateBorInput
    ):Promise<CreateBorOutput> {
        return this.borService.createBor(user, createBor);
    }

    @Role(["Any"])
    @Mutation(type => EditBorOutput)
    async editBor(
        @AuthUser() authUser:User,
        @Args('input') editBorInput:EditBorInput
    ):Promise<EditBorOutput> {
        return this.borService.editBor(authUser, editBorInput);
    }

    @Role(["Any"])
    @Mutation(type => DeleteBorOutput)
    async deleteBor(
        @AuthUser() authUser:User,
        @Args('input') deleteBorInput:DeleteBorInput
    ):Promise<DeleteBorOutput> {
        return this.borService.deleteBor(authUser, deleteBorInput);
    }

    @Role(["Any"])
    @Query(type => AllBoardofRecordOutput)
    async allBoardofRecords(
        @Args('input') allBoardofRecordInput:AllBoardofRecordInput
    ):Promise<AllBoardofRecordOutput> {
        return this.borService.allBoardofRecords(allBoardofRecordInput);
    }

    @Role(["Any"])
    @Query(type => MyBoardofRecordOutput)
    async myBoardofRecords(
        @AuthUser() authUser:User,
        @Args('input') myBoardofRecordInput:MyBoardofRecordInput
    ):Promise<MyBoardofRecordOutput> {
        return this.borService.myBoardofRecords(authUser, myBoardofRecordInput);
    }

    @Role(["Any"])
    @Query(type => AllMyBoardofRecordOutput)
    async allMyBoardofRecords(
        @AuthUser() authUser:User,
    ):Promise<AllMyBoardofRecordOutput> {
        return this.borService.allMyBoardofRecords(authUser);
    }
}