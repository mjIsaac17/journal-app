import cloudinary from "cloudinary"; //npm i cloudinary --save-dev
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
  cloud_name: "dajuhzxdz",
  api_key: "314423691472589",
  api_secret: "HmEnIrctcocfmiQm7eTK1BvmjY4",
  secure: true,
});

describe("Tests in fileUpload.js", () => {
  test("should load a file a return an url", async () => {
    const resp = await fetch(
      "https://th.bing.com/th/id/OIP.64Arr45yD13b3bWdsoS0zAHaFP?w=244&h=180&c=7&o=5&pid=1.7"
    );
    const blob = await resp.blob();
    const file = new File([blob], "picture.png");
    const url = await fileUpload(file);
    expect(typeof url).toBe("string");

    //Delete image by id
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");
    //More info here: https://cloudinary.com/documentation/admin_api#delete_resources
    await cloudinary.v2.api.delete_resources(imageId);
  });

  test("should return an error", async () => {
    const file = new File([], "picture.png");
    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
