import {inject} from "aurelia-framework";
import {DataServices} from "./data-services";
import {Galleries} from "./galleries";

@inject(DataServices, Galleries)
export class Pictures {
    constructor(data, galleries) {
        this.data = data;
        this.galleries = galleries;
        this.PICTURE_SERVICE = "pictures"
        this.pictureList = [];
    }

    async getGalleryPictures(id) {
        let response = await this.data.get(this.galleries.GALLERY_SERVICE + "/" + id + "/" + this.PICTURE_SERVICE);
        if (!response.error && !response.message) {
            this.pictureList = response;
        } else {
            this.pictureList = [];
        }
    }
    
    async getPicture(galleryId, pictureId) {
        let response = await this.data.get(this.galleries.GALLERY_SERVICE + "/" + galleryId + "/" + this.PICTURE_SERVICE + "/" + pictureId);
        if (!response.error && !response.message) {
            return response;
        }
    }

    async save(picture) {
        console.log(picture);
        console.log(picture._id);
        if (!picture._id) {
            let response = await this.data.post(picture, this.PICTURE_SERVICE)
            if (!response.error) {
                this.pictureList.push(response);
            }
            return response;
        } else {
            let response = await this.data.put(picture, this.galleries.GALLERY_SERVICE + "/" + picture.galleryId + "/" + this.PICTURE_SERVICE + "/" + picture._id);
            if (!response.error) {
            }
            return response;
        }
    }
    
    async delete(id) {
        let response = await this.data.delete(this.galleries.GALLERY_SERVICE + "/" + this.data.galleryId + "/" + this.PICTURE_SERVICE + "/" + id);
        if (!response.error) {
            for (let i = 0; i < this.pictureList.length; i++) {
                if (this.pictureList[i]._id == id) {
                    this.pictureList.splice(i, 1);
                }
            }
        }
    }

    async uploadImageFile(files, userId, galleryId, pictureId) {
        let formData = new FormData();

        console.log("looking at file");
        files.forEach((item, index) => {
            formData.append("file" + index, item);
        });

        let response = await this.data.uploadFiles(formData, this.PICTURE_SERVICE + "/" + userId + "/" + galleryId + "/" + pictureId + "/files");
    }
}