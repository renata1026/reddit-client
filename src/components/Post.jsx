// import React from 'react';
// import { useOutletContext, useParams } from 'react-router-dom';

// const Post = () => {
//   const { posts, setPosts } = useOutletContext();
//   //update posts
//   const updatedPosts = [...posts, newPost];
//   console.log(updatedPosts);
//   setPosts(updatedPosts);
//   //   const { postId } = useParams();
//   //   const post = posts.find((_post) => _post.id === +postId);
//   //   console.log(post);
//   return (
//     <div>
//       {updatedPosts.map((post) => (
//         <div key={post.id}>
//           <h2>{post.title}</h2>
//           <p>{post.text}</p>
//         </div>
//       ))}
//       {/* <h2>{post.name}</h2>
//       <h2>{post.id}</h2> */}
//     </div>
//   );
// };

// export default Post;
//     // Assuming the API returns the updated post, you can find it in the posts array
// const updatedPost = info.updatedPost;
// const updatedPostIndex = posts.findIndex(
//   (_post) => _post.id === updatedPost.id
// );

// if (updatedPostIndex !== -1) {
//   // Update the post in the posts array
//   const updatedPosts = [...posts];
//   updatedPosts[updatedPostIndex] = updatedPost;
//   setUpdatedPost(updatedPosts);
// } else {
//   console.error('Updated post not found in posts array');
//     }
//   }
