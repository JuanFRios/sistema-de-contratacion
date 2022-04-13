import React from 'react';
import { Widget } from 'react-cloudinary-upload-widget';

const FileUpload = ({
  folder,
  text,
  resourceType,
  successCallback,
  errorCallback,
}) => (
  <Widget
    sources={['local']}
    resourceType={resourceType} // optionally set with 'auto', 'image', 'video' or 'raw' -> default = 'auto'
    cloudName='dtr0n5g9x'
    uploadPreset='h6ofafvq' // check that an upload preset exists and check mode is signed or unisgned
    buttonText={text} // default 'Upload Files'
    style={{
      color: 'slate-900',
      border: 'none',
      width: '120px',
      borderRadius: '4px',
      height: '15px',
    }} // inline styling only or style id='cloudinary_upload_button'
    folder={folder} // set cloudinary folder name to send file
    autoClose={false} // will close the widget after success. Default true
    onSuccess={successCallback} // add success callback -> returns result
    onFailure={errorCallback} // add failure callback -> returns 'response.error' + 'response.result'
    logging={false} // logs will be provided for success and failure messages,
    widgetStyles={{
      palette: {
        window: '#737373',
        windowBorder: '#FFFFFF',
        tabIcon: '#FF9600',
        menuIcons: '#D7D7D8',
        textDark: '#DEDEDE',
        textLight: '#FFFFFF',
        link: '#0078FF',
        action: '#FF620C',
        inactiveTabIcon: '#B3B3B3',
        error: '#F44235',
        inProgress: '#0078FF',
        complete: '#20B832',
        sourceBg: '#909090',
      },
      fonts: {
        default: null,
        "'Fira Sans', sans-serif": {
          url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
          active: true,
        },
      },
    }} // ability to customise the style of the widget uploader
    destroy // will destroy the widget on completion
    // 👇 FOR SIGNED UPLOADS ONLY 👇

    apiKey={552231494151674} // cloudinary API key -> number format
  />
);

export default FileUpload;
