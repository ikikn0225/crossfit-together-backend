import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Hold } from "../entities/hold.entity";

@InputType()
export class AllHoldsInput {
    @Field(type => Date, {nullable:true})
    holdAt?:Date;
}

@ObjectType()
export class AllHoldsOutput extends CoreOutput {
    @Field(type => [Hold], {nullable:true})
    holds?:Hold[];
}