import Post from "./Post"
import postUtilities from "../utilities/postUtilities"

function PostContainer({ posts, user }) {
    return (
        <div>
            {posts.length === 0 ?
                (<h2 className='my-5'>Nothing to show</h2>) :
                (posts.map((post) =>
                    <Post
                        key={post._id}
                        post={post}
                        unameColorHash={postUtilities.hashUname(post.author.username)}
                        postDate={postUtilities.dateify(post.createdAt)}
                        fromCurrUser={user && (post.author._id === user.id)}
                        isLiked={user ? user.liked_posts.includes(post._id) : false}
                        likefunctions={[postUtilities.likePost, postUtilities.unlikePost]}
                        token={user ? user.token : null}
                    />
                ))
            }
        </div>
    )
}

export default PostContainer