import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out',
  width: '750px',
  height: '400px'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function DropzoneComponent(props) {
  const [files, setFiles] = useState([]);
  const [label, setLabel] = useState('Select an image...');
  const [labelConfidence, setLabelConfidence] = useState(null);

  useEffect(() => {
    if (label === 'hot dog') {
      console.log('We got a hot dog! Posting to Firestore!');
      // console.log(files[0].data);
      // console.log(labelConfidence);
      const postData = {
        image: files[0].data,
        confidence: labelConfidence
      };
      
      axios.post('/api/hof', postData)
        .then(console.log)
        .catch(console.log);
      // console.log(files[0])
    }
  }, [label])

  const onDrop = useCallback(acceptedFiles => {
    // console.log(`Uploaded file: ${JSON.stringify(acceptedFiles[0], null, 2)}`);


    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          data: reader.result
        })));

        setLabel('Doing magic. Please hold...');

        axios.post(
          'https://www.nyckel.com/v1/functions/c0q3wsnqt6pv29eh/invoke',
          { data: reader.result }
        )
          .then(apiRes => {
            // console.log(`API responded with ${JSON.stringify(apiRes, null, 2)}`);
            const { labelName, confidence } = apiRes.data;
            setLabel(labelName);
            setLabelConfidence((confidence * 100).toFixed(2));
          })
          .catch(apiErr => console.error(`API error: ${apiErr}`));
      }
      // reader.readAsArrayBuffer(file)
      reader.readAsDataURL(file);
    })


    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));


  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    multiple: false,
    // accept: 'image/jpeg, image/png'
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const thumbs = files.map(file => (
    <div key={file.name}>
      <img
        src={file.preview}
        alt={file.name}
        className="max-h-[400px] max-w-[750px]"
      />
    </div>
  ));

  // clean up
  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const dropzone = (
    <div {...getRootProps({style})}>
      <input {...getInputProps()} />
      <div>Drag and drop your image here.</div>
    </div>
  );

  const thumbnailDisplay = (
    <aside className="max-h-[400px] max-w-[750px] block">
      {thumbs}
    </aside>
  );

  const handleButtonClick = () => {
    setFiles([]);
    setLabel('Select an image...');
    setLabelConfidence(null);
  }

  return (
    <section className="flex flex-col items-center h-fit">
      <h1 className="text-xl font-bold">
        {label}
        {labelConfidence && ` - ${labelConfidence}% confidence`}
      </h1>
      {files.length ? thumbnailDisplay : dropzone}
      {(files.length && labelConfidence)
        // ? <button onClick={handleButtonClick} className="block">No way. Do it again.</button>
        ? <button
            type="button"
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500
              hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200
              dark:focus:ring-purple-800 font-medium rounded-lg text-md px-5 py-2.5 
              text-center mr-2 mb-2 mt-4 hover:text-orange-200"
              onClick={handleButtonClick}
            >
            Again Plz
          </button>
        : null
      }
    </section>
  )
}

export default DropzoneComponent;
