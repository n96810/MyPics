import {inject} from "aurelia-framework";
import {DataServices} from "./data-services";

@inject(DataServices)
export class Galleries {
    constructor(data) {
        this.data = data;
        this.GALLERY_SERVICE = "galleries"
        this.galleryList = [];
    }

    async getUserGalleries(id) {
        let response = await this.data.get(id + "/" + this.GALLERY_SERVICE);
        if (!response.error && !response.message) {
            this.galleryList = response;
        }
    }

    async save(gallery) {
        if (gallery)
        {
            if (!gallery._id) {
                let response = await this.data.post(gallery, this.GALLERY_SERVICE);
                if (!response.error) {
                    console.log("adding to array");
                    this.galleryList.push(response);
                }
                return response;
            } else {
                let response = await this.data.put(gallery, this.GALLERY_SERVICE + "/" + gallery._id);
                if (!response.error) {
                }
                return response;
            }
        }
    }
    
    async delete(id) {
        let response = await this.data.delete(this.GALLERY_SERVICE + "/" + gallery._id);
        if (!response.error) {
            for (let i = 0; i < this.galleries.length; i++) {
                if (this.galleryList[i]._id == id) {
                    this.galleryList.splice(i, 1);
                }
            }
        }
    }
}