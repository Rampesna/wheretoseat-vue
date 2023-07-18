const apiConstants = {
    BASE_URL: 'https://localhost:8000/api/v1/',
    LOGIN: 'auth/login',
    LOGOUT: 'auth/logout',

    // Categories
    CreateCategory: 'categories/createCategory',
    GetAllCategories: 'categories/getAllCategories',
    GetCategoryById: 'categories/getCategoryById',
    UpdateCategory: 'categories/updateCategory',
    DeleteCategory: 'categories/deleteCategory',
    GetTopicByCategoryId: 'categories/getTopicsByCategoryId',

    // Topics
    CreateTopic: 'topics/createTopic',
    DeleteTopic: 'topics/deleteTopic',
    UpdateTopic: 'topics/updateTopic',
    GetQuestionByTopic: 'topics/getQuestionsByTopic',

    // Questions
    CreateQuestion: 'questions/createQuestion',
    DeleteQuestion: 'questions/deleteQuestion',
    GetQuestionById: 'questions/getQuestionById',
    UpdateQuestion: 'questions/updateQuestion',
    RemoveImage: 'questions/removeImage',

    // Users
    GetAllUsers: 'users/getAllUsers',
    CreateUser: 'users/createUser',
    DeleteUser: 'users/deleteUser',
    GetUserById: 'users/getUserById',
    UpdateUser: 'users/updateUser',

    // Analytics
    GetTopicScore: 'analytics/getTopicScore',
    GetTopicAnswersByUserAndTopic: 'analytics/getTopicAnswersByUserAndTopic'
};

export default apiConstants;
