import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role-decorator";
import { User } from "src/user/entities/user.entity";
import { AllNoticeOutput } from "./dtos/all-notice.dto";
import { CreateNoticeInput, CreateNoticeOutput } from "./dtos/create-notice.dto";
import { DeleteNoticeInput, DeleteNoticeOutput } from "./dtos/delete-notice.dto";
import { EditNoticeInput, EditNoticeOutput } from "./dtos/edit-notice.dto";
import { Notice } from "./entities/notice.entity";
import { NoticeService } from "./notice.service";


@Resolver(() => Notice)
export class NoticeResolver {
    constructor( private readonly noticeService:NoticeService, ){}

    @Role(["Coach"])
    @Mutation(returns => CreateNoticeOutput)
    async createNotice(
        @AuthUser() authUser:User,
        @Args('input') createNoticeInput:CreateNoticeInput
    ):Promise<CreateNoticeOutput> {
        return this.noticeService.createNotice(authUser, createNoticeInput);
    }

    @Role(["Coach"])
    @Mutation(type => EditNoticeOutput)
    async editNotice(
        @AuthUser() authUser:User,
        @Args('input') editNoticeInput:EditNoticeInput
    ):Promise<EditNoticeOutput> {
        return this.noticeService.editNotice(authUser, editNoticeInput);
    }

    @Role(["Coach"])
    @Mutation(type => DeleteNoticeOutput)
    async deleteNotice(
        @AuthUser() authUser:User,
        @Args('input') editNoticeInput:DeleteNoticeInput
    ):Promise<DeleteNoticeOutput> {
        return this.noticeService.deleteNotice(authUser, editNoticeInput);
    }

    @Role(["Any"])
    @Query(type => AllNoticeOutput)
    async allNotices(
        @AuthUser() authUser:User
    ):Promise<AllNoticeOutput> {
        return this.noticeService.allNotices(authUser);
    }
}