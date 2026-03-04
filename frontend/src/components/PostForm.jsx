import { useState } from "react";

function PostForm({ onPost }) {

  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;

    onPost(text);
    setText("");
  };

  return (
    <div className="creative-post">
      <textarea
        value={text}
     placeholder="Describe your issue..."
        onChange={(e) => setText(e.target.value)}
      />

      <button className="post-btn" onClick={submit}>
        Post
      </button>
    </div>
  );
}

export default PostForm;