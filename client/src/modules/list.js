import {inject} from "aurelia-framework";
import {Galleries} from "../resources/data/galleries";
import {Pictures} from "../resources/data/pictures";
import {AuthService} from "aurelia-auth"

@inject(Galleries, Pictures, AuthService)
export class List {
    constructor(galleries, pictures, auth) {
        this.galleries = galleries;
        this.pictures = pictures;
        this.auth = auth;

        this.user = JSON.parse(sessionStorage.getItem("user"));
        this.showGalleryList = true;

        this.galleryObject = {
            "userId": this.user._id,
            "name": "",
            "description": "",
            "dateCreated": new Date()
        };
    }

    logout() {
        sessionStorage.removeItem("user");
        this.auth.logout();
    }

    async activate() {
        await this.galleries.getUserGalleries(this.user._id);
    }

    async openGallery(gallery) {
        this.galleryObject = gallery;
        await this.pictures.getGalleryPictures(this.galleryObject._id);
        this.pictureObject = {
            "name": "",
            "description": "",
            "galleryId": this.galleryObject._id
        }
        this.showGalleryList = false;
    }

    async exitGallery() {
        this.showGalleryList = true;
    }

    async saveGallery() {
        if (this.addGallery) {
            let response = await this.galleries.save(this.addGallery);
            if (response.error) {
                alert("There was an issue saving this gallery");
            } else {
                var galleryId = response._id;

            }
        }
    }

    deleteGallery(gallery) {
        this.galleries.delete(gallery._id);
    }

    async savePicture() {
        if (this.pictureObject) {
            let response = await this.pictures.save(this.pictureObject);
            if (response.error) {
                alert("There was an issue saving this picture");
            } else {
                var pictureId = response._id;
                if (this.imageFile && this.imageFile.length) {
                    await this.pictures.uploadImageFile(this.imageFile, this.galleryObject._id, pictureId);
                    this.imageFile = [];
                }
            }
        }
    }

    async openPicture(picture) {
        this.pictureObject = picture;
        console.log(this.pictureObject);
    }

    async deletePicture(picture) {
        this.pictures.delete(picture._id);
    }

    async uploadPicture() {
        this.imageFile = new Array();
        this.imageFile.push(this.files[0]);
    }
}