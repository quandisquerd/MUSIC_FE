import { Skeleton } from "antd";
import { useState } from "react";

const LoadingUser = () => {
  const [data] = useState(Array(6).fill(0)); // Tạo mảng 4 phần tử
  return (
    <div className="space-y-4">
      {data.map((_, index) => (
        <Skeleton
          key={index} // Thêm key để tránh lỗi React
          active
          paragraph={false} // Ẩn các dòng văn bản
          className="bg-gray-200"
          title={false} // Ẩn tiêu đề
          style={{
            width: "283px", // Chiều rộng
            height: "64px", // Chiều cao
            borderRadius: "8px", // Góc bo tròn
          }}
        />
      ))}
    </div>
  );
};

export default LoadingUser;
