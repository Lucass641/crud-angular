import { Lesson } from './lesson';
export interface Course {
  _id: string | null;
  name: string | null;
  category: string | null;
  lesson: Lesson[];
}
