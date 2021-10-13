import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { WodListResponse } from "../entities/wod.entity";


@InputType()
export class WodListInput {
    @Field(type => Number, {nullable:true})
    first?:number;

    @Field(type => Number, {nullable:true})
    after?:number;
}

@ObjectType()
export class WodListOutput extends CoreOutput {
    @Field(type => WodListResponse, {nullable:true})
    wodListResponse?:WodListResponse;
}