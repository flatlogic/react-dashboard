export const CREATE_POST_INITIAL = 'CREATE_POST_INITIAL';
export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

function createPostInitial() {
  return {
    type: CREATE_POST_INITIAL,
    isFetching: false,
  };
}

function requestCreatePost(post) {
  return {
    type: CREATE_POST_REQUEST,
    isFetching: true,
    post,
  };
}

function createPostSuccess(post) {
  return {
    type: CREATE_POST_SUCCESS,
    isFetching: false,
    post,
  };
}

function createPostError(message) {
  return {
    type: CREATE_POST_FAILURE,
    isFetching: false,
    message,
  };
}

function requestFetchPosts() {
  return {
    type: FETCH_POSTS_REQUEST,
    isFetching: true,
  };
}

function fetchPostsSuccess(posts) {
  return {
    type: FETCH_POSTS_SUCCESS,
    isFetching: false,
    posts,
  };
}

function fetchPostsError(message) {
  return {
    type: FETCH_POSTS_FAILURE,
    isFetching: false,
    message,
  };
}

export function createPost(postData) {
  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `mutation {
                addPost(title: "${postData.title}", content: "${
        postData.content
      }"){
                  id,
                  title,
                  content
                }
              }`,
    }),
    credentials: 'include',
  };

  return dispatch => {
    // We dispatch requestCreatePost to kickoff the call to the API
    dispatch(requestCreatePost(postData));

    return fetch('/graphql', config)
      .then(response => response.json().then(post => ({ post, response })))
      .then(({ post, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(createPostError(post.message));
          return Promise.reject(post);
        }
        // Dispatch the success action
        dispatch(createPostSuccess(post));
        setTimeout(() => {
          dispatch(createPostInitial());
        }, 5000);
        return Promise.resolve(post);
      })
      .catch(err => console.error('Error: ', err));
  };
}

export function fetchPosts() {
  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: '{posts{id,title,content,updatedAt}}',
    }),
    credentials: 'include',
  };

  return dispatch => {
    dispatch(requestFetchPosts());

    return fetch('/graphql', config)
      .then(response =>
        response.json().then(responseJson => ({
          posts: responseJson.data.posts,
          responseJson,
        })),
      )
      .then(({ posts, responseJson }) => {
        if (!responseJson.data.posts) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(fetchPostsError(posts.message));
          return Promise.reject(posts);
        }
        // Dispatch the success action
        dispatch(fetchPostsSuccess(posts));
        return Promise.resolve(posts);
      })
      .catch(err => console.error('Error: ', err));
  };
}
