import { fetchData } from "@/shared/api/fetchData";

interface bodyType {
  title: string;
  content: string;
  status: string;
  tags: string[];
  location: string;
  thumbnail?: string;
}
type ImageResponse = {
  imageUrl: string;
};

export const submitEssay = async (
  formData: FormData,
  body: bodyType
): Promise<any> => {
  try {
    if (formData && Object.keys(formData).length > 0) {
      const { data: imageData, status: imageStatus } =
        await fetchData<ImageResponse>("essays/images", "post", formData);
      if (imageStatus === 201) {
        body.thumbnail = imageData.imageUrl;
      }
    }
    const { data, status } = await fetchData("essays", "post", body);
    return { data: data, status };
  } catch (err) {
    console.log(err);
    return { data: [], status: 500 };
  }
};
