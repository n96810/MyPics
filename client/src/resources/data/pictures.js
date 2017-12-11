import {inject} from "aurelia-framework";
import {DataServices} from "./data-services";
import {Galleries} from "./galleries";

@inject(DataServices)
export class Pictures {
    constructor(data) {
        this.data = data;
        this.PICTURE_SERVICE = "pictures"
        this.pictures = [];
    }

    async getGalleryPictures(id) {
        let response = await this.data.get(Galleries.GALLERY_SERVICE + "/" + id + "/" + this.PICTURE_SERVICE);
        if (!response.error && !response.message) {
            this.pictures = response;
        }
    }
    
    async getPicture(id) {
        let response = await this.data.get(Galleries.GALLERY_SERVICE + "/" + data.galleryId + "/" + this.PICTURE_SERVICE + "/" + id);
        if (!response.error && !response.message) {
            this.currentPicture = response;
        }
    }

    async savePicture(picture) {
        if (!picture._id) {
            let response = await this.data.post(picture, this.PICTURE_SERVICE)
            if (!response.error) {
                this.pictures.push(response);
            }
            return response;
        } else {
            let response = await this.data.put(picture, this.PICTURE_SERVICE + "/" + picture);
            if (!response.error) {
            }
            return response;
        }
    }
    
    async deletePicture(id) {
        let response = await this.data.delete(Gallery.GALLERY_SERVICE + "/" + data.galleryId + "/" + this.PICTURE_SERVICE + "/" + id);
        if (!response.error) {
            for (let i = 0; i < this.pictures.length; i++) {
                if (this.pictures[i]._id == id) {
                    this.pictures.splice(i, 1);
                }
            }
        }
    }
}