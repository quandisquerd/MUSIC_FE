import { Skeleton } from "antd";
import { useState } from "react";

const LoadingDiv = () => {
  const [data] = useState(Array(4).fill(0)); // Tạo mảng 4 phần tử

  return (
    <div className="grid grid-cols-4 gap-4">
      {data.map((_, index) => (
        <Skeleton
          key={index} // Thêm key để tránh lỗi React
          active
          paragraph={false} // Ẩn các dòng văn bản
          className="bg-gray-200"
          title={false} // Ẩn tiêu đề
          style={{
            width: "192px", // Chiều rộng
            height: "252px", // Chiều cao
            borderRadius: "8px", // Góc bo tròn
          }}
        />
      ))}
    </div>
  );
};

export default LoadingDiv;
