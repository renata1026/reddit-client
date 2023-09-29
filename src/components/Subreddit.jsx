// import React from 'react';
// import { useOutletContext, useParams } from 'react-router-dom';
// import CreatePost from './CreatePost';
// import { API } from '../lib';

// const Subreddit = () => {
//   // Get context values
//   const { posts, subreddits } = useOutletContext();

//   // Get the subredditName from URL parameters
//   const { subredditName } = useParams();

//   // Find the subreddit based on the subredditName
//   const subreddit = subreddits.find((sub) => sub.name === subredditName);

//   // Filter posts belonging to the subreddit (if subreddit exists)
//   const filteredPosts = subreddit
//     ? posts.filter((post) => post.subredditId === subreddit.id)
//     : [];

//   return (
//     <div>
//       {/* Render the CreatePost component */}
//       <CreatePost />

//       {/* Render the filtered posts */}
//       {filteredPosts.map((post) => (
//         <div key={post.id}>
//           {/* Display post content, e.g.*/}
//           <h2>{post.title}</h2>
//           <p>{post.text}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Subreddit;
