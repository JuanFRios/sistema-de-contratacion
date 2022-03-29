import React from 'react';
import { Widget } from 'react-cloudinary-upload-widget';

const FileUpload = ({
  folder,
  resourceType,
  text,
  successCallback,
  errorCallback,
}) => (
  <Widget
    sources={['local', 'camera']}
    resourceType={resourceType} // optionally set with 'auto', 'image', 'video' or 'raw' -> default = 'auto'
    cloudName='dtr0n5g9x' // your cloudinary account cloud name.
    uploadPreset='vs8gsai6' // check that an upload preset exists and check mode is signed or unisgned
    buttonText={text} // default 'Upload Files'
    style={{
      color: 'slate-900',
      // fontWeight: 'bold',
      text: 'center',
      backgroundColor: '',
      borderRadius: '',
      margin: 8,
    }}
    folder={folder} // set cloudinary folder name to send file
    autoClose={false} // will close the widget after success. Default true
    onSuccess={successCallback} // add success callback -> returns result
    onFailure={errorCallback} // add failure callback -> returns 'response.error' + 'response.result'
    logging={false} // logs will be provided for success and failure messages,
    destroy // will destroy the widget on completion
    apiKey={552231494151674} // cloudinary API key -> number format
  />
);

export default FileUpload;
