export const articlePage = '/articles/:articleId';
export const indexPage = '/';
export const loginPage = '/login'
export const myarticlesPage = '/myarticles'
export const accountPage = '/account'

//oauth
export const bindGithub = `/github_bind`
export const loginGithub = '/github_login'
export const sendEmail = '/send_email'
//api

//article
export const putArticle = '/api/articles'
export const getArticle = (articleId: string): string => `/api/articles/${articleId}`
export const saveArticleBody = '/api/article/savebody'
export const getAllArticles = "/api/articles"
export const getMyArticles = "/api/articles/getMyArticles"
export const toggleArticlePublish = '/api/article/togglePublish'
export const updateCount = '/api/article/updateCount'

//comment
export const postComment = '/api/comments'
export const getComments = '/api/article/getComments'
//session
export const login = '/api/user/login'
export const signup = '/api/user'
export const getUserById = '/api/user'
export const updateUser = '/api/user/update'

//user
export const getUserInfo = (userId) => `/api/user/getInfo?userId=${userId}`

//pageInfo
export const getPageInfo = '/api/pageInfo'