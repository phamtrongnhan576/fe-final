import { fetchPosition } from "./lib/client/api";

export default async function Home() {
  const data = await fetchPosition();
  return (
    <div className=" text-red-600">
      <h1>Welcome to My Page</h1>
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.tenViTri}</h2>
          <p>{item.tinhThanh}</p>
          <p>{item.quocGia}</p>
        </div>
      ))}
    </div>
  );
}
