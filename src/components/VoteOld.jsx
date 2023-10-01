// import React from 'react';
// import { useOutletContext } from 'react-router-dom';
// import { BiDownvote, BiUpvote } from 'react-icons/bi';
// import { API } from '../lib';

// const Vote = () => {
//   const { posts, token, fetchPost, user } = useOutletContext();

//   const handleUpvote = async (postId) => {
//     const postToUpdate = posts.find((p) => p.id === postId);

//     if (!postToUpdate) {
//       console.error('Post not found');
//       return;
//     }

//     const likeIndex = postToUpdate.upvotes.find(
//       (upvote) => upvote.userId === user.id
//     );

//     if (likeIndex === -1) {
//       // If the user has already liked the post, remove the like
//       const response = await fetch(`${API}/votes/upvotes/${postId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           postId: postToUpdate.id,
//         }),
//       });
//       const data = await response.json();
//       console.log(data);
//       fetchPost();
//     } else {
//       // If the user hasn't liked the post, add a new like
//       const response = await fetch(`${API}/votes/upvotes/${postId}`, {
//         method: 'POST',
//         headers: {
//           'Content-type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           postId: postToUpdate.id,
//         }),
//       });

//       const data = await response.json();
//       console.log(data);
//       fetchPost();
//     }
//   };

//   const handleDownvote = async (postId) => {
//     const postToUpdate = posts.find((p) => p.id === postId);

//     if (!postToUpdate) {
//       console.error('Post not found');
//       return;
//     }

//     const upvoteIndex = postToUpdate.upvotes.findIndex(
//       (upvote) => upvote.userId === user.id
//     );

//     if (upvoteIndex !== -1) {
//       // If the user has already upvoted the post, remove the upvote
//       const response = await fetch(`${API}/votes/upvotes/${postId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           postId: postToUpdate.id,
//         }),
//       });
//       const data = await response.json();
//       console.log(data);
//       fetchPost();
//     }

//     // Now you can proceed to add a downvote
//     const response = await fetch(`${API}/votes/downvotes/${postId}`, {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         postId: postToUpdate.id,
//       }),
//     });

//     const data = await response.json();
//     console.log(data);
//     fetchPost();
//   };

//   return (
//     <>
//       {/* <div className="post-container">
//         {posts.map((post) => (
//           <div className="reddit-post" key={post.id}>
//             <div className="post-header">
//               <p className="subreddit">
//                 {post.subreddit.name}/ {post.user.username}
//               </p> */}
//       {/* </div> */}
//       <div className="display-likes">
//         <div className="like-buttons">
//           <div className="upVote">
//             <button
//               onClick={() => handleUpvote(posts.id)}
//               className="icon-button"
//             >
//               <BiUpvote />
//             </button>
//           </div>
//           <div className="downVote">
//             <button
//               onClick={() => handleDownvote(posts.id)}
//               className="icon-button"
//             >
//               <BiDownvote />
//             </button>
//           </div>
//         </div>
//         {/* Likes: {posts.upvotes.length - posts.downvotes.length} */}
//       </div>
//       {/* <h2 className="post-title">{post.title}</h2>
//             <p className="post-text">{post.text}</p> */}
//       {/* </div> */}
//       {/* ))}
//       </div> */}
//     </>
//   );
// };

// export default Vote;
