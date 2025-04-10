import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const CommentsSection = ({ videoId }) => {
  const auth = useSelector((state) => state.auth);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/comments/${videoId}?page=${page}&limit=10`
      );
      const data = await res.json();
      setComments(data.data.comments);
      setTotalPages(data.data.totalPages);
    } catch (error) {
      console.error("Error fetching comments", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [videoId, page]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/comments/${videoId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ content: commentText }),
        }
      );

      const data = await res.json();
      toast.success("Comment added");
      setComments((prev) => [data.data, ...prev]);
      setCommentText("");
    } catch (error) {
      console.error("Error posting comment", error);
      toast.error("Failed to post comment");
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold text-blue-700 mb-5">Comments</h3>

      {/* Existing Comments */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment, idx) => (
            <div
              key={idx}
              className="bg-blue-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={comment.owner?.avatar}
                  alt={comment.owner?.fullname}
                  className="w-8 h-8 rounded-full border border-blue-200"
                />
                <p className="text-sm font-semibold text-blue-800">
                  {comment.owner?.fullname}
                </p>
              </div>
              <p className="text-sm text-gray-700">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No comments yet.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <Button
            className="bg-blue-100 text-blue-700 hover:bg-blue-200"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-blue-600 font-medium">
            Page {page} of {totalPages}
          </span>
          <Button
            className="bg-blue-100 text-blue-700 hover:bg-blue-200"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      )}

      {/* Add Comment Form (only if logged in) */}
      {auth.status && (
        <form
          onSubmit={handleAddComment}
          className="mt-8 bg-white p-4 rounded-xl shadow-md space-y-3"
        >
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment..."
            className="w-full p-3 rounded-lg bg-blue-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none min-h-[70px]"
            required
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm"
            >
              Post Comment
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentsSection;
