import React, { Component } from 'react';
import { Growl } from 'primereact/growl';
import { FileUpload } from 'primereact/fileupload';;

class FileUploadDemo extends Component {

    constructor() {
        super();

        this.onUpload = this.onUpload.bind(this);
        this.onBasicUpload = this.onBasicUpload.bind(this);
        this.onBasicUploadAuto = this.onBasicUploadAuto.bind(this);
    }

    onUpload(event) {
        this.growl.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }

    onBasicUpload(event) {
        this.growl.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }

    onBasicUploadAuto(event) {
        this.growl.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
    }

    render() {
        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>FileUpload</h1>
                        <p>FileUpload is an advanced uploader with dragdrop support, multi file uploads, auto uploading, progress tracking and validations.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <h3>Advanced</h3>
                    <FileUpload name="demo[]" url="./upload.php" onUpload={this.onUpload}
                        multiple={true} accept="image/*" maxFileSize={1000000} />

                    <h3>Basic</h3>
                    <FileUpload mode="basic" name="demo[]" url="./upload.php" accept="image/*" maxFileSize={1000000} onUpload={this.onBasicUpload} />

                    <h3>Basic with Auto</h3>
                    <FileUpload mode="basic" name="demo[]" uurl="./upload.php" accept="image/*" maxFileSize={1000000} onUpload={this.onBasicUploadAuto} auto={true} chooseLabel="Browse" />

                    <Growl ref={(el) => { this.growl = el; }}></Growl>
                </div>
            </div>
        )
    }
}

export default FileUploadDemo