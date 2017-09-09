const api = "http://localhost:5001";
//const token = localStorage.token;

export const fetchAllPosts = () => {
    return fetch(`${api}/posts`, {
        headers: {
            'Authorization': 'sharonhuo'
        }
    }).then(res => res.json())
      .then(data => data)
}


export const fetchAllCommentsByPostId = (id) => {
    return fetch(`${api}/posts/${id}/comments`, {
        headers: {
            'Authorization': 'sharonhuo'
        }
    }).then(res => res.json())
      .then(data => data)
}

export const fetchCategories = () => {
    return fetch(`${api}/categories`, {
        headers: {
            'Authorization': 'sharonhuo'
        }
    }).then(res => res.json())
      .then(data => data.categories)
}

export const fetchPostsByCategory = (name) => {
    return fetch(`${api}/${name}/posts`, {
        headers: {
            'Authorization': 'sharonhuo'
        }
    }).then(res => res.json())
      .then(data => data)
}


export const postVotes = (id, direction) => {
    return fetch(`${api}/posts/${id}`,
        {
            method: 'post',
            headers: {
                'Authorization': 'sharonhuo',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ option: direction }),
        }).then(res => res.json())
        .then(data => data)
}

export const fetchPostById = (id) => {
    return fetch(`${api}/posts/${id}`, {
        headers: {
            'Authorization': 'sharonhuo'
        }
    }).then(res => res.json())
      .then(data => data)
}

export const commentVotes = (id, direction) => {
    return fetch(`${api}/comments/${id}`,
        {
            method: 'post',
            headers: {
                'Authorization': 'sharonhuo',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ option: direction }),
        }).then(res => res.json())
        .then(data => data)
}

export const deletePost = (id) => {
    return fetch(`${api}/posts/${id}`,
        {
            method: 'delete',
            headers: {
                'Authorization': 'sharonhuo'
            }
        })
}

export const deleteComment = (id) => {
    return fetch(`${api}/comments/${id}`,
        {
            method: 'delete',
            headers: {
                'Authorization': 'sharonhuo'
            }
        }).then(res => res.json())
        .then(data => data)
}

export const createPost = (post) => {
    return fetch(`${api}/posts`,
        {
            method: 'post',
            headers: {
                'Authorization': 'sharonhuo',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post),
        }).then(res => res.json())
        .then(data => data)
}


export const updatePost = post => {
    return fetch(`${api}/posts/${post.id}`,
        {
            method: 'put',
            headers: {
                'Authorization': 'sharonhuo',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post),
        }).then(res => res.json())
        .then(data => data)
}

export const createComment = (comment) => {
    return fetch(`${api}/comments`,
        {
            method: 'post',
            headers: {
                'Authorization': 'sharonhuo',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment),
        }).then(res => res.json())
        .then(data => data)
}


export const updateComment = (comment) => {
    return fetch(`${api}/comments/${comment.id}`,
        {
            method: 'put',
            headers: {
                'Authorization': 'sharonhuo',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment),
        }).then(res => res.json())
        .then(data => data)
}

