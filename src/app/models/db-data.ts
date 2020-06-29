import { Project } from 'src/app/models/project';
import { CourseIdea } from 'src/app/models/course-idea';
import { WatchLater } from 'src/app/models/watch-later';
import { Task } from 'src/app/models/task';

export interface DbData {
  projects: Project[];
  courseIdeas: CourseIdea[];
  watchLater: WatchLater[];
  tasks: Task[];
  notes: string;
}
