// API Configuration
export const API_CONFIG = {
  // Backend URL
  BASE_URL: 'http://localhost:8000/api',
  
  // API Endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/login',  // Laravel Sanctum login endpoint
      REGISTER: '/register',
      LOGOUT: '/logout',
      USER: '/user',    // Get authenticated user
      FORGOT_PASSWORD: '/forgot-password',
      RESET_PASSWORD: '/reset-password',
      VERIFY_EMAIL: '/email/verify',
      RESEND_VERIFICATION: '/email/verification-notification',
    },
    USER: {
      PROFILE: '/user/profile',
      UPDATE_PROFILE: '/user/profile',
      CHANGE_PASSWORD: '/user/password',
    },
    COURSES: {
      LIST: '/courses',
      DETAIL: (id: number) => `/courses/${id}`,
      ENROLL: (id: number) => `/courses/${id}/enroll`,
      UNENROLL: (id: number) => `/courses/${id}/unenroll`,
      PROGRESS: (id: number) => `/courses/${id}/progress`,
    },
    LESSONS: {
      LIST: (courseId: number) => `/courses/${courseId}/lessons`,
      DETAIL: (courseId: number, lessonId: number) => `/courses/${courseId}/lessons/${lessonId}`,
      COMPLETE: (courseId: number, lessonId: number) => `/courses/${courseId}/lessons/${lessonId}/complete`,
    },
    ASSIGNMENTS: {
      LIST: (courseId: number) => `/courses/${courseId}/assignments`,
      DETAIL: (courseId: number, assignmentId: number) => `/courses/${courseId}/assignments/${assignmentId}`,
      SUBMIT: (courseId: number, assignmentId: number) => `/courses/${courseId}/assignments/${assignmentId}/submit`,
      GRADE: (courseId: number, assignmentId: number, submissionId: number) => 
        `/courses/${courseId}/assignments/${assignmentId}/submissions/${submissionId}/grade`,
    },
    DISCUSSIONS: {
      LIST: (courseId: number) => `/courses/${courseId}/discussions`,
      DETAIL: (courseId: number, discussionId: number) => `/courses/${courseId}/discussions/${discussionId}`,
      COMMENTS: (courseId: number, discussionId: number) => 
        `/courses/${courseId}/discussions/${discussionId}/comments`,
      REPLY: (courseId: number, discussionId: number, commentId: number) => 
        `/courses/${courseId}/discussions/${discussionId}/comments/${commentId}/replies`,
    },
    ANNOUNCEMENTS: {
      LIST: (courseId: number) => `/courses/${courseId}/announcements`,
      DETAIL: (courseId: number, announcementId: number) => 
        `/courses/${courseId}/announcements/${announcementId}`,
    },
    GRADES: {
      LIST: (courseId: number) => `/courses/${courseId}/grades`,
      DETAIL: (courseId: number, gradeId: number) => `/courses/${courseId}/grades/${gradeId}`,
    },
  },
  
  // Default headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',  // Required for Laravel Sanctum
  },
} as const; 