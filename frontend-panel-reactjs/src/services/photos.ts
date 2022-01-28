import type { SetStateAction, Dispatch } from "react";
import type { PhotosResponse, GetPhotosParms } from "types";
import { http } from "utils";

export class PhotoServices {
  static uri = "photos";
  static findAll = (params?: GetPhotosParms) => {
    return http.get<PhotosResponse>(this.uri, { params });
  };

  static create = (
    data: FormData,
    progressSetter?: Dispatch<SetStateAction<number>>
  ) => {
    return http.post(this.uri, data, {
      onUploadProgress: function (progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        progressSetter?.(percentCompleted);
      },
    });
  };
}
