import dotenv from 'dotenv';

dotenv.config();
const {
  VUE_APP_UPLOAD_PRESET,
  VUE_APP_CLOUD_NAME
} = process.env;
const url = `https://api.cloudinary.com/v1_1/${VUE_APP_CLOUD_NAME}/upload`;
export default async (files) => {
  const formData = new FormData();
  formData.append('file', files[0]);
  formData.append('upload_preset', VUE_APP_UPLOAD_PRESET);
  formData.append('tags', 'gs-vue,gs-vue-uploaded');
  const response = await fetch(url, {
    method: 'POST',
    body: formData
  });
  return response.json();
};
