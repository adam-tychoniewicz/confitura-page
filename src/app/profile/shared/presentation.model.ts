import {User} from "../../pages/profile/user.model";
export class Presentation{
    id:string;
    title:string;
    language:string;
    level:string;
    speaker:User;
    cospeakers: User[] = [];
    tags:string;
    shortDescription:string;
    description:string;
    status: string;
}