import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Reply } from "../entities/reply.entity";

@InputType()
export class EditReplyInNoticeInput extends PickType(PartialType(Reply), [
    'content'
]) {
    @Field(type => Number)
    replyId:number;
}

@ObjectType()
export class EditReplyInNoticeOutput extends CoreOutput {}