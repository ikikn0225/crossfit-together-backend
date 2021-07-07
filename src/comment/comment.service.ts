import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bor } from "src/board-of-record/entities/board-of-record.entity";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { Notice } from "src/notice/entities/notice.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { AllCommentsInNoticeInput, AllCommentsInNoticeOutput } from "./dtos/all-comments-in-notice.dto";
import { CreateCommentInput, CreateCommentOutput } from "./dtos/create-comment.dto";
import { DeleteCommentInput, DeleteCommentOutput } from "./dtos/delete-comment.dto";
import { EditCommentInput, EditCommentOutput } from "./dtos/edit-comment.dto";
import { Comment } from "./entities/comment.entity";



@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
            private readonly comments:Repository<Comment>,
        @InjectRepository(Notice)
            private readonly notices:Repository<Notice>,
    ) {}

    async createComment(
        authUser:User,
        createCommentInput:CreateCommentInput
    ):Promise<CreateCommentOutput> {
        try {
            const notice = await this.notices.findOne(createCommentInput.noticeId);
            if(!notice) {
                return {
                    ok:false,
                    error:"Notice not found."
                }
            }
            await this.comments.save( this.comments.create({...createCommentInput, notice, owner:authUser}) );
            return {
                ok:true,
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async editComment(
        authUser:User,
        editCommentInput:EditCommentInput
    ):Promise<EditCommentOutput> {
        try {
            const comment = await this.comments.findOne(editCommentInput.commentId);
            if(!comment) {
                return {
                    ok:false,
                    error:"Comment not found."
                }
            }
            if(comment.ownerId !== authUser.id) {
                return {
                    ok:false,
                    error:"You cannnot do that."
                }
            }
            await this.comments.save([{ id:editCommentInput.commentId, ...editCommentInput }]);
            return {
                ok:true,
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async deleteComment(
        authUser:User,
        deleteCommentInput:DeleteCommentInput
    ):Promise<DeleteCommentOutput> {
        try {
            const comment = await this.comments.findOne(deleteCommentInput.id);
            if(!comment) {
                return {
                    ok:false,
                    error:"Comment not found."
                }
            }
            if(comment.ownerId !== authUser.id) {
                return {
                    ok:false,
                    error:"You cannnot do that."
                }
            }
            await this.comments.delete(deleteCommentInput.id);
            return {
                ok:true,
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

    async allCommentsInNotice(
        allCommentsInNoticeInput:AllCommentsInNoticeInput
    ):Promise<AllCommentsInNoticeOutput> {
        try {
            const notice = await this.notices.findOne(allCommentsInNoticeInput.noticeId);
            if(!notice) {
                return {
                    ok:false,
                    error:"Notice not found."
                }
            }
            //comment는 없을 수 있으니 null도 가능
            const comments = await this.comments.find({relations:["notice"], where: {notice}});
            return {
                ok:true,
                comments
            }
        } catch (error) {
            return {
                ok:false,
                error
            }
        }
    }

}