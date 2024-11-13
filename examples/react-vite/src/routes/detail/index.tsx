import { useParams } from "react-router";

export default function Detail() {
  const params = useParams();
  return <div>Detail ID: {params.id}</div>;
}
