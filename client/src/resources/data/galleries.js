import {inject} from "aurelia-framework";
import {DataServices} from "./data-services";

@inject(DataServices)
export class Galleries {
    constructor(data) {
        this.data = data;
        this.GALLERY_SERVICE = "galleries"
        this.galleries = [];
    }

    async getUserGalleries(id) {
        let response = await this.data.get(id + "/" + this.GALLERY_SERVICE);
        if (!response.error && !response.message) {
            this.galleries = response;
        }
    }

    async saveGallery(gallery) {
        if (!gallery._id) {
            let response = await this.data.post(gallery, this.GALLERY_SERVICE)
            if (!response.error) {
                this.galleries.push(response);
            }
            return response;
        } else {
            let response = await this.data.put(gallery, this.GALLERY_SERVICE + "/" + gallery._id);
            if (!response.error) {
            }
            return response;
        }
    }
    
    async deleteGallery(id) {
        let response = await this.data.delete(this.GALLERY_SERVICE + "/" + gallery._id);
        if (!response.error) {
            for (let i = 0; i < this.galleries.length; i++) {
                if (this.galleries[i]._id == id) {
                    this.galleries.splice(i, 1);
                }
            }
        }
    }
}