import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Hold } from "../entities/hold.entity";

@InputType()
export class AllDistinctHoldsInput {
    @Field(type => Number, {nullable:true})
    affiliatedBoxId?:number;
}

@ObjectType()
export class AllDistinctHoldsOutput extends CoreOutput {
    @Field(type => [Hold], {nullable:true})
    holds?:Hold[];
}