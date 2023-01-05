// data start

let users = [
    {
     name: 'User 1',
     password: 'pass123',
     age: 30,
     isLogin: false,
    },
    {
     name: 'User 2',
     password: 'pass124',
     age: 33,
     isLogin: false,
    },
    {
     name: 'User 3',
     password: 'pass125',
     age: 21,
     isLogin: false,
    },
    {
     name: 'User 4',
     password: 'pass126',
     age: 56,
     isLogin: false,
    },
    {
     name: 'User 5',
     password: 'pass127',
     age: 42,
     isLogin: false,
    },
    {
     name: 'User 6',
     password: 'pass128',
     age: 13,
     isLogin: false,
    },
    {
     name: 'User 7',
     password: 'pass129',
     age: 29,
     isLogin: false,
    },
    {
     name: 'User 8',
     password: 'pass130',
     age: 53,
     isLogin: false,
    },
    {
     name: 'User 9',
     password: 'pass131',
     age: 18,
     isLogin: false,
    },
    {
     name: 'User 10',
     password: 'pass132',
     age: 48,
     isLogin: false,
    },
   ];
   
   let posts = [
    {
     id: 1,
     title: 'Post 1',
     user: 'User 3',
     likes: 34,
    },
    {
     id: 2,
     title: 'Post 2',
     user: 'User 4',
     likes: 58,
    },
    {
     id: 3,
     title: 'Post 3',
     user: 'User 6',
     likes: 90,
    },
    {
     id: 4,
     title: 'Post 4',
     user: 'User 2',
     likes: 2,
    },
    {
     id: 5,
     title: 'Post 5',
     user: 'User 3',
     likes: 128,
    },
    {
     id: 6,
     title: 'Post 6',
     user: 'User 1',
     likes: 743,
    },
    {
     id: 7,
     title: 'Post 7',
     user: 'User 8',
     likes: 9,
    },
    {
     id: 8,
     title: 'Post 8',
     user: 'User 10',
     likes: 90,
    },
    {
     id: 9,
     title: 'Post 9',
     user: 'User 4',
     likes: 73,
    },
    {
     id: 10,
     title: 'Post 10',
     user: 'User 2',
     likes: 581,
    },
   ];
   
   //data end


//users scripts start 
let inSystem = '';
function changeInSystemUser(userName = '') {
    inSystem = userName;
    let h3 = document.querySelector('h3')
    inSystem ? h3.innerText = `User: ${inSystem} in system` : h3.innerText = 'No user in system';
}
//register
function loginUser() {
    let userName = prompt('Enter username');
    if(!checkUnigueUserName(userName)){
        alert('User not found!')
        return;
    };
    let pass = prompt('Enter password')
    if(!checkUserPassword(userName, pass)) {
        alert('Password doesn\'t match with this account!');
        return;
    };
    let user = getUserObj(userName);
    user.isLogin = true;
    changeInSystemUser(userName);
}

function checkUnigueUserName(userName) {
    return users.some(item => item.name === userName);
};

function checkPasswords(pass, passConfirm) {
    return pass === passConfirm
};

function createUser() {
    let userName = prompt('enter username');
    if(checkUnigueUserName(userName)) {
        alert('user already exists');
        return;
    };
    let pass = prompt('enter password')
    let passConfirm = prompt('enter password confirmation');
    if(!checkPasswords(pass, passConfirm)) {
        alert('passwords do not match!');
        return;
    };
    let age = +prompt('enter age');
    let userObj = {
        name: userName,
        password: pass,
        age:age,
        isLogin: false 
    };
    users.push(userObj);
    console.log(users);
};
//login
function getUserObj(userName) {
    return users.find(item => item.name === userName) 
}

function checkUserPassword(userName, pass) {
    let user = getUserObj(userName);
    return user.password === pass
}
//logput 
function logoutUser() {
    if(!inSystem){
        alert('Only authorized users can logout!');
        return;
    };
    let user = getUserObj(inSystem);
    user.isLogin = false
    changeInSystemUser();

}

//users scripts end


//posts scripts logic
//create post
function createPost() {
    if(!inSystem){
        alert('Only authorized users can create posts!')
        return;
    };
    let postTitle = prompt('Enter post title')
    let postObj = {
        id:Date.now(),
        title: postTitle,
        user: inSystem,
        likes:0
    };
    posts.push(postObj)
    readPosts()

};
//update post
function getPostObj(id) {
    return posts.find(item => item.id === id);
};

function checkOwnerPost(id) {
    let postObj = getPostObj(id);
    return postObj && postObj.user === inSystem
}

function updatePost() {
    if(!inSystem){
        alert('Only authorized users can update posts!')
        return;
};
    let postId = +prompt('Enter post id')
    if(!checkOwnerPost(postId)) {
        alert('There id no post with this id or you are not the euthor of such a post')
        return;
    }
    let postObj = getPostObj(postId)
    let newPostData = prompt('Enter new post data');
    postObj.title = newPostData;
    readPosts()
    
};

function deletePost() {
    if(!inSystem){
        alert('Only authorized users can delete posts!')
        return; 
    }
    let postId = +prompt('Enter post id')
    if(!checkOwnerPost(postId)) {
        alert('There id no post with this id or you are not the euthor of such a post')
        return;
    }
    posts = posts.filter(item => item.id !== postId);
    readPosts()
};

//read posts 
function readPosts() {
    let list = document.querySelector('ul');
    list.innerHTML = '';
    for (i of posts) {
        list.innerHTML += `<li>Post content: ${i.title}; post id: ${i.id}; likes: ${i.likes}</li>`
    }
}
//posts scripts logic end

//comments scripts start 
function checkCommentKey(obj) {
    return Object.keys(obj).some(item => item === 'comments');

}

function addComment() {
    if(!inSystem){
        alert('Only authorized users can create comments!')
        return; 
    };
    let postId = +prompt('Enter post id');
    let postObj = getPostObj(postId);
    if(!postObj) {
        alert('post not found');
        return;
    };
    let commentContent = prompt('Enter comment content');
    let commentObj = {
        id:'comm-' + Date.now(),
        content: commentContent,
        user: inSystem
    };
    if(checkCommentKey(postObj)){
        postObj.comments.push(commentObj);
        }
        else {
            postObj.comments = [commentObj, ]
        }
        console.log(posts);
    }



    // function deleteComment() {
    //     if(!inSystem){
    //         alert('Only authorized users can delete comments!')
    //         return; 
    //     };
    //     let commentId = prompt('Enter comment id');
    //     if(!checkCommentKey(commentObj)) {
    //         alert('There is no comment with this id or you are not the author of such a comment')
    //     return;
    // }
    // postObj.comments = postsObj.commments.filter(item => item.id !== commentId);
    // readPosts()
    // console.log(posts);
    // return posts
    // }   
    

 
function getCommentObject (id, commid) {
    let postObj = getPostObj(id);
    return postObj.comments.find(item => item.id === commid); //вернет объект, если нет, то undefined
};

function checkOwnerComment (id, commid) {
    let commObj = getCommentObject(id, commid)
    return commObj.user === inSystem //true true 
}

function deleteComment() {
    if (!inSystem) {
        alert("Only authorized users can delete comment");
        return;
      }
  
      let postId = +prompt("Enter postID:");
  
      let commentId = prompt("Enter commentID:");
  
      let postObj = getPostObj(postId)
  
      if (!postObj) {
          return alert("Post is not found");
      }
  
      let commentObj = getCommentObject(postId, commentId);
  
      // console.log(commentObj)
  
      // console.log(checkOwnerComment(postId, commentId))
  
      if(!checkOwnerComment(postId, commentId)) {
          alert ('There is no this post or you are not the author of this comment!');
          return;
      }
  
      postObj.comments = postObj.comments.filter(item => item.id !== commentId);
  
      console.log(posts)
};
// comments scripts end

// add likes

function addLike() {
    if (!inSystem) {
        alert('Only authorized users can likes post!');
        return;
    };
    let likeId = +prompt('Enter post ID to like');
    let postLike = posts.find(item => item.id === likeId);
    
    //dislike
    if(postLike.nameLikes?.includes(inSystem)){
        postLike.nameLikes.splice(postLike.nameLikes.indexOf(inSystem), 1);
        postLike.likes -= 1;
        readPosts();
        return;
    }

    if(postLike){
        postLike.likes += 1;
        postLike.nameLikes ? postLike.nameLikes.push(inSystem) : postLike.nameLikes = [inSystem];
    }

    console.log(posts);
    readPosts();
    return;
};

// add likes end



// likes scripts end

// 1. Реализовать логику удаления комментариев(проверка на авторизацию, проверка на то, что коммент существует, проверка на владельца коммента), если все условия выполнены, удалить коммент(использовать функции)

// 2. Реализовать логику добавления лайков, любой пользователь может поставить лайк любому посту, если один и тот же пользователь ставит лайк одному и тому же посту, то необходимо отнять один лайк у объекта поста(использовать функции)


// 14. Дан массив: [
//     {title: 'Toyota', year: 2006, engVol: '2cm3'},
//     {title: 'Mercedes E-class', year: 1996, engVol: '2.4cm3'},
//     {title: 'Toyota Avensis', year: 2003, engVol: '1.7cm3'},
//     {title: 'Lexus LX570', year: 2020, engVol: '5.7cm3'},
//     {title: 'Mercedes S-class', year: 2010, engVol: '4cm3'}
// ], задача: вернуть массив следующего вида [[autoTitle, tax], [autoTitle, tax], [autoTitle, tax]], tax - налог на ввоз автомобиля в различные страны, расчитать по следующим условиям(авто до 2000 года выпуска: 50$ за кубический см, авто от 2000 до 2007 года выпуска: 40$, авто с 2007 до 2015 года выпуска: 30$, авто с 2015 года выпуска и выше: 20$)

// let arr =  [{title: 'Toyota', year: 2006, engVol: '2cm3'},
//     {title: 'Mercedes E-class', year: 1996, engVol: '2.4cm3'},
//     {title: 'Toyota Avensis', year: 2003, engVol: '1.7cm3'},
//     {title: 'Lexus LX570', year: 2020, engVol: '5.7cm3'},
//     {title: 'Mercedes S-class', year: 2010, engVol: '4cm3'}]


    

//     let newArr = arr.map((item) => {
//         let num  = parseFloat(item.engVol)
//         if(item.year < 2000) {
//             tax = num * 50
//          } else if (item.year >= 2000 && item.year < 2007){
//              tax = num * 40
//          } else if (item.year >=2007 && item.year < 2015) {
//              tax = num * 30
//          } else if (item.year >=2015) {
//              tax = num * 20 }
//              return [item.title, tax]
//     });

// console.log(newArr);


// 15. Дан массив следущего вида: [
//     {title: 'Post 1', author: 'User 1', likes: 549},
//     {title: 'Post 2', author: 'User 1', likes: 67},
//     {title: 'Post 3', author: 'User 3', likes: 345},
//     {title: 'Post 4', author: 'User 6', likes: 1023},
//     {title: 'Post 5', author: 'User 2', likes: 150},
// ], задача: вернуть массив, в котором будут только названия 3х самых популярных постов(ориентироваться на лайки)


    // let newArr = arr.map((item) => {
    //     item.likes.sort(a,b) => item.likes - item.likes
    //     }
    // )


// let posts = [
//     {title: 'Post 1', author: 'User 1', likes: 549},
//     {title: 'Post 2', author: 'User 1', likes: 67},
//     {title: 'Post 3', author: 'User 3', likes: 345},
//     {title: 'Post 4', author: 'User 6', likes: 1023},
//     {title: 'Post 5', author: 'User 2', likes: 150},
// ];

// let newArr = posts.sort((a, b) => b.likes - a.likes).slice(0, 3);

// newArr = newArr.map(item => item.title);

// console.log(newArr);