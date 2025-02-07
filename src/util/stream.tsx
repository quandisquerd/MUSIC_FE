import { FFmpeg } from '@ffmpeg/ffmpeg';

const ffmpeg:any = new FFmpeg();

const splitAudio = async (audioFile: File) => {
  await ffmpeg.load(); // Tải ffmpeg

  const fileName = audioFile.name;
  
  // Sử dụng fetch để lấy dữ liệu tệp và ghi vào bộ nhớ của ffmpeg
  const fileData = await fetch(URL.createObjectURL(audioFile)).then(res => res.arrayBuffer());
  ffmpeg.FS('writeFile', fileName, new Uint8Array(fileData));

  // Chia nhỏ tệp âm thanh thành các đoạn 10s
  await ffmpeg.run('-i', fileName, '-f', 'segment', '-segment_time', '10', '-c', 'copy', 'out%03d.ts');

  // Đọc các đoạn đã chia nhỏ từ bộ nhớ
  const fileList = [];
  for (let i = 0; i < 10; i++) { // Giả sử tối đa là 10 phần
    try {
      const partFile = ffmpeg.FS('readFile', `out${String(i).padStart(3, '0')}.ts`);
      const blob = new Blob([partFile], { type: 'audio/mp4' });
      fileList.push(URL.createObjectURL(blob));
    } catch (e) {
      break;
    }
  }

  return fileList; // Trả về danh sách các phần đã chia
};
