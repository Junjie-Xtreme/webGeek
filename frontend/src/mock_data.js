export const mockData = {
    semesters: [
        {
            id: 1,
            displayName: "Fall 2025",
            semesterStartDate: "2025-08-25 00:00:00",
            semesterEndDate: "2025-12-15 23:59:59",
            created_at: "2025-07-15 18:38:00",
            updated_at: "2025-07-15 18:38:00"
        },
        {
            id: 2,
            displayName: "Spring 2026",
            semesterStartDate: "2026-01-20 00:00:00",
            semesterEndDate: "2026-05-10 23:59:59",
            created_at: "2025-07-15 18:38:00",
            updated_at: "2025-07-15 18:38:00"
        }
    ],
    courses: [
        {
            id: 1,
            semester_id: 1,
            crn: "12345",
            displayName: "CS 4104: Data Structures",
            created_at: "2025-07-15 18:38:00",
            updated_at: "2025-07-15 18:38:00"
        },
        {
            id: 2,
            semester_id: 1,
            crn: "12346",
            displayName: "CS 4114: Algorithms",
            created_at: "2025-07-15 18:38:00",
            updated_at: "2025-07-15 18:38:00"
        },
        {
            id: 3,
            semester_id: 2,
            crn: "12347",
            displayName: "CS 4124: Software Engineering",
            created_at: "2025-07-15 18:38:00",
            updated_at: "2025-07-15 18:38:00"
        }
    ],
    users: [
        {
            id: 1,
            username: "jdoe",
            edupersonprimaryaffiliation: "student",
            uupid: "JD123456",
            edupersonprincipalname: "jdoe@vt.edu",
            created_at: "2025-07-15 18:38:00",
            updated_at: "2025-07-15 18:38:00"
        },
        {
            id: 2,
            username: "asmith",
            edupersonprimaryaffiliation: "student",
            uupid: "AS789012",
            edupersonprincipalname: "asmith@vt.edu",
            created_at: "2025-07-15 18:38:00",
            updated_at: "2025-07-15 18:38:00"
        },
        {
            id: 3,
            username: "bjohnson",
            edupersonprimaryaffiliation: "staff",
            uupid: "BJ345678",
            edupersonprincipalname: "bjohnson@vt.edu",
            created_at: "2025-07-15 18:38:00",
            updated_at: "2025-07-15 18:38:00"
        }
    ],
    user_courses: [
        { id: 1, user_id: 1, course_id: 1, created_at: "2025-07-15 18:38:00" },
        { id: 2, user_id: 1, course_id: 2, created_at: "2025-07-15 18:38:00" },
        { id: 3, user_id: 2, course_id: 1, created_at: "2025-07-15 18:38:00" },
        { id: 4, user_id: 2, course_id: 3, created_at: "2025-07-15 18:38:00" }
    ],
    skills: [
        { id: 1, name: "Python", icon: "fa-python" },
        { id: 2, name: "JavaScript", icon: "fa-js" },
        { id: 3, name: "Database Management", icon: "fa-database" },
        { id: 4, name: "UI/UX Design", icon: "fa-paint-brush" }
    ],
    projects: [
        {
            id: 1,
            course_id: 1,
            title: "Graph Algorithm Visualizer",
            description: "A web-based tool to visualize graph traversal algorithms.",
            maxCapacity: 4,
            teamName: "GraphGurus",
            created_at: "2025-07-15 18:38:00",
            updated_at: "2025-07-15 18:38:00"
        },
        {
            id: 2,
            course_id: 2,
            title: "Sorting Algorithm Benchmark",
            description: "A tool to compare performance of sorting algorithms.",
            maxCapacity: 3,
            teamName: "SortMasters",
            created_at: "2025-07-15 18:38:00",
            updated_at: "2025-07-15 18:38:00"
        },
        {
            id: 3,
            course_id: 3,
            title: "Agile Project Management App",
            description: "A web app for managing software development projects.",
            maxCapacity: 5,
            teamName: null,
            created_at: "2025-07-15 18:38:00",
            updated_at: "2025-07-15 18:38:00"
        }
    ],
    user_skills: [
        { id: 1, user_id: 1, skill_id: 1, created_at: "2025-07-15 18:38:00" },
        { id: 2, user_id: 1, skill_id: 2, created_at: "2025-07-15 18:38:00" },
        { id: 3, user_id: 2, skill_id: 1, created_at: "2025-07-15 18:38:00" },
        { id: 4, user_id: 2, skill_id: 3, created_at: "2025-07-15 18:38:00" },
        { id: 5, user_id: 3, skill_id: 4, created_at: "2025-07-15 18:38:00" }
    ],
    project_users: [
        { id: 1, project_id: 1, user_id: 1, created_at: "2025-07-15 18:38:00" },
        { id: 2, project_id: 1, user_id: 2, created_at: "2025-07-15 18:38:00" },
        { id: 3, project_id: 2, user_id: 1, created_at: "2025-07-15 18:38:00" }
    ],
    project_skills: [
        { id: 1, project_id: 1, skill_id: 1, created_at: "2025-07-15 18:38:00" },
        { id: 2, project_id: 1, skill_id: 2, created_at: "2025-07-15 18:38:00" },
        { id: 3, project_id: 2, skill_id: 1, created_at: "2025-07-15 18:38:00" },
        { id: 4, project_id: 3, skill_id: 2, created_at: "2025-07-15 18:38:00" },
        { id: 5, project_id: 3, skill_id: 4, created_at: "2025-07-15 18:38:00" }
    ]
};

//module.exports = mockData;