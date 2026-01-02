import api from '../api/axios';
import type { Course } from '../types/course';

const getCourses = async () => {
  const response = await api.get<Course[]>('/courses/');
  return response.data;
};

const getCourseById = async (id: number) => {
  const response = await api.get<Course>(`/courses/${id}`);
  return response.data;
};

const courseService = {
  getCourses,
  getCourseById,
};

export default courseService;
