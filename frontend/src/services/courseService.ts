import api from '../api/axios';
import type { Course } from '../types/types';

export const getAll = async () => {
  const response = await api.get<Course[]>('/courses/');
  return response.data;
};

export const create = async (course: Partial<Course>) => {
  const response = await api.post<Course>('/courses/', course);
  return response.data;
};

export const update = async (id: number, course: Partial<Course>) => {
  const response = await api.put<Course>(`/courses/${id}`, course);
  return response.data;
};

export const remove = async (id: number) => {
  const response = await api.delete<Course>(`/courses/${id}`);
  return response.data;
};

export const getCourseById = async (id: number) => {
  const response = await api.get<Course>(`/courses/${id}`);
  return response.data;
};
