import fs from "fs";
import { serialize, deserialize } from 'bson';

import { Course } from "../../domain/Course";
import { CourseRepository } from "../../domain/CourseRepository";

export class FileCourseRepository implements CourseRepository {
    #FILE_PATH = `${__dirname}/courses`;

    async save(course: Course): Promise<void> {
        const itemToBeStored: { id: string, name: string, duration: string } = { 
            id: course.id.toString(),
            name: course.name.toString(),
            duration: course.duration,
        };

        await fs.promises.writeFile(this.filePath(course.id.toString()), serialize(itemToBeStored));
    }

    async search(courseId: string): Promise<Course> {
        const courseData = await fs.promises.readFile(this.filePath(courseId));

        const { id, name, duration } = deserialize(courseData);

        return new Course({ id , name, duration });
    }

    private filePath(id: string): string {
        return `${this.#FILE_PATH}.${id}.repo`;
    }
}