import {inject} from "aurelia-framework";
import {DataServices} from "./data-services";
import {Galleries} from "./galleries";

@inject(DataServices, Galleries)
export class Pictures {
    constructor(data, galleries) {
        this.data = data;
        this.galleries = galleries;
        this.PICTURE_SERVICE = "pictures"
        this.pictures = [];
    }

    async getGalleryPictures(id) {
        console.log("route: " + this.galleries.GALLERY_SERVICE + "/" + id + "/" + this.PICTURE_SERVICE);
        let response = await this.data.get(this.galleries.GALLERY_SERVICE + "/" + id + "/" + this.PICTURE_SERVICE);
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

    async save(picture) {
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