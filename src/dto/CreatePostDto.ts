import {Length} from "class-validator";

export default class CreatePostDto {
    @Length(6, 100) /// @Length decorator limits length of the post's title.
    title : string;

    @Length(0, 1000)
    content : string;
}
