import { courses } from './courses.js';

export const categorySlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const studentCount = (course) => Number(course.students.replace(/[^0-9]/g, ''));

export const coursesIn = (category) => courses.filter((course) => course.categories.includes(category));

export const popularCourses = () => [...courses].sort((a, b) => studentCount(b) - studentCount(a));

export const searchCourses = (query) => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return courses.filter((course) => {
        const text = `${course.title} ${course.categories.join(' ')}`.toLowerCase();
        return words.every((word) => text.includes(word));
    });
};
