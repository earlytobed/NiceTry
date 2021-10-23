import authService from "./auth.service";

class UploadService {
    constructor() {
        this.session = authService.session;
    }

    upload(torrentFile) {
        return this.session
            .post("/api/torrent/upload_file", torrentFile, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(response => {
                if (response.status == 200) {
                    return response.data;
                }
            })
            .catch(error => {
                return error;
            });
    }

    submit(torrent) {
        return this.session
            .post("/api/torrent/create_torrent", torrent, {})
            .then(response => {
                if (response.status == 200) {
                    return response.data;
                }
            })
            .catch(error => {
                return error;
            });
    }
}

export default new UploadService();
