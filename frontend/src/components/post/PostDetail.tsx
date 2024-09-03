import { api } from "@/api/instance";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Nav/Navbar";

// export async function action({ params }: { params: { id: string } }) {
// 	const id = params.id;
// 	const res = await api.get(`/api/trips/${id}/?format=json`);
// 	console.log(res.data);
// 	setPost(res.data);
// }

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState([] as any);

  const getPost = async () => {
    const res = await api.get(`/api/trips/${id}/?format=json`);
    console.log(res.data);
    setPost(res.data);
  };

  const joinNewGroup = () => {
    const token = localStorage.getItem("token");
    return axios.post(
      `http://192.168.40.65:8000/api/trips/${id}/join/?format=json`,
      {
        // Wrap headers object inside curly braces
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
  };

  useEffect(() => {
    getPost();
  }, []);

  const { cover_image, title, description, start_date, end_date } = post;

  return (
    <>
      {post.length !== 0 && (
        <div className="post-card-detail mt-5">
          {cover_image && (
            <img
              src={cover_image}
              alt="Card Image"
              className="card-detail-img"
            />
          )}
          <div className="card-content-details">
            <h2 className="card-title-detail">{title}</h2>
            <p className="card-dates">
              From : <span className="start-end-detail">{start_date}</span>
            </p>
            <p className="card-dates">
              To : <span className="start-end-detail">{end_date}</span>
            </p>
            <p className="card-description-detail">{description}</p>
          </div>
          <div>
            <form method="post" onSubmit={() => joinNewGroup()}>
              <input type="hidden" name="_id" value={id} />
              <Link to={`/messages/${id}`} className="join-btn">
                Join
              </Link>
            </form>
          </div>
        </div>
      )}
      <Navbar />
    </>
  );
};

export default PostDetail;
