import CryptoJS from "crypto-js";
const key = import.meta.env.VITE_APP_ENCRYPTION_KEY;

export const encryptData = (data: any) => {
  const iv = CryptoJS.lib.WordArray.random(16); // Tạo IV ngẫu nhiên (16 byte)
  const encrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  return {
    encryptedData: encrypted.toString(), // Mã hóa dữ liệu
    iv: iv.toString(CryptoJS.enc.Hex), // Chuyển IV sang dạng Hex
  };
};

export const decryptData = (encryptedData: any, iv: any) => {
  const ivParsed = CryptoJS.enc.Hex.parse(iv); // Giải mã IV từ Hex

  
  const bytes = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Utf8.parse(key), {
    iv: ivParsed,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  return bytes.toString(CryptoJS.enc.Utf8); // Chuyển kết quả về chuỗi utf-8
};
