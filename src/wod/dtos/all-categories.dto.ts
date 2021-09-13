import { Field, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Category } from "../entities/category.entity";


@ObjectType()
export class AllCategoriesOutput extends CoreOutput {

    @Field(type => [Category])
    categories?:Category[];
}