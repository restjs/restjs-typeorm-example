import {IsInt, Length, IsBoolean, IsOptional} from "class-validator";
import {Transform} from "class-transformer";

export default class UpdatePostDto {
    @IsInt()
    id : number;

    @IsOptional() /// @IsOptional() decorator lets a property to be an optional field.
    @Length(6, 100)
    title : string;

    @IsOptional()
    @Length(0, 1000)
    content : string;

    @Transform(value => {
        /**
         * The Transform decorator is used to transform got string value to a boolean value .
         */
        return value == "true";
    })
    @IsBoolean()
    isPublished;
}
