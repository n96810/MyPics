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

        this.addGallery = {
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
        console.log(this.pictures.pictureList);
        this.addPicture = {
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
                console.log(response.error);
            } else {
                var galleryId = response._id;

            }
        }
    }

    deleteGallery(gallery) {
        this.galleries.delete(gallery._id);
    }

    async savePicture() {
        if (this.addPicture) {
            let response = await this.pictures.save(this.addPicture);
            if (response.error) {
                alert("There was an issue saving this picture");
                console.log(response.error);
            } else {
                var pictureId = response._id;
                console.log("response: " + response);
                console.log("id: " + pictureId);
                if (this.imageFile && this.imageFile.length) {
                    await this.pictures.uploadImageFile(this.imageFile, this.galleryObject._id, pictureId);
                    console.log("done save picture");
                    this.imageFile = [];
                }
            }
        }
    }

    async openPicture(picture) {
        console.log("picture");
        console.log(picture);
        console.log(picture.imageFile);
        this.pictureObject = picture;
        console.log("Picture source: " + "uploads/" + this.pictureObject.galleryId + "/" + this.pictureObject._id + "/" + this.pictureObject.imageFile.filename)
    }

    async deletePicture(picture) {
        this.pictures.delete(picture._id);
    }

    async uploadPicture() {
        this.imageFile = new Array();
        this.imageFile.push(this.files[0]);
    }
}