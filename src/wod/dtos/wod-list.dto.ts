import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Edge, PageInfo, WodListResponse } from "../entities/wod.entity";


@InputType()
export class WodListInput {
    @Field(type => Number, {nullable:true})
    first?:number;

    @Field(type => Number, {nullable:true})
    after?:number;

    @Field(type => Boolean, {nullable:true})
    delay?:boolean;

    @Field(type => String, { nullable: true })
    slug?:string;
}

@ObjectType()
export class WodListOutput extends CoreOutput {
    @Field(type => [Edge], { nullable:true })
    edges?:Edge[];

    @Field(type => PageInfo, { nullable:true })
    pageInfo?:PageInfo;
}