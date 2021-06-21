import { ArgsType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { User } from "../entities/user.entity";

@ArgsType()
export class EditProfileInput extends PartialType(PickType(User, ['email', 'password'])) {}

@ObjectType()
export class EditProfileOutput extends CoreOutput {}