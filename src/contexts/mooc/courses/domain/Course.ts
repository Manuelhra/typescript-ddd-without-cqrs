import { CourseId } from "../../shared/domain/courses/CourseId";

export class Course {
    readonly id: CourseId;
    readonly name: string;
    readonly duration: string;

    constructor({
        id,
        name,
        duration,
    }: { id: CourseId, name: string, duration: string }) {
        this.id = id;
        this.name = name;
        this.duration = duration;
    }
}