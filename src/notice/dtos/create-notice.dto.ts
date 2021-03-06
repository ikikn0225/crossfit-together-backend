import { Field, InputType, Int, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Notice } from "../entities/notice.entity";


@InputType()
export class CreateNoticeInput extends PickType(Notice, ["title", "contents", "coverImg"]) {}

@ObjectType()
export class CreateNoticeOutput extends CoreOutput {}