import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Wod } from "src/wod/entities/wod.entity";
import { Bor } from "../entities/board-of-record.entity";

@ObjectType()
export class AllMyBoardofRecordOutput extends CoreOutput {
    @Field(type => [Bor])
    bors?:Bor[];
}