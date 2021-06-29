import { Inject, Injectable } from "@nestjs/common";
import { CONFIG_OPTIONS } from "src/common/common.constants";
import { JwtModuleOptions } from "./jwt.interfaces";
import * as jwt from 'jsonwebtoken';


@Injectable()
export class JwtService {
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
    ) {}

    sign(userId: number): string {
        return jwt.sign({id: userId}, this.options.privateKey);
    }

    verify(token: string) {
        return jwt.verify(token, this.options.privateKey);
    }
}