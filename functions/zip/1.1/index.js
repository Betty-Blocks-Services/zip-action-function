import JSZip from 'jszip';

const getUniqueFilename = (filename, filenames) => {
  let count = 1;
  let newFilename = filename;
  while (filenames.includes(newFilename)) {
    const dotIndex = filename.lastIndexOf('.');
    if (dotIndex !== -1) {
      newFilename = `${filename.slice(0, dotIndex)}_${count}${filename.slice(
        dotIndex
      )}`;
    } else {
      newFilename = `${filename}_${count}`;
    }
    count++;
  }
  filenames.push(newFilename);
  return newFilename;
};

const zip = async ({
  modelTarget: { name: modelNameTarget },
  propertyTarget: [{ name: propertyNameTarget }],
  propertySource: [{ name: propertyNameSource }],
  collection: { data: collection },
  fileName,
}) => {
  const uniqueFilenames = [];
  const jsZip = new JSZip();

  const filteredCollection = collection.filter(
    (item) => Object.keys(item[propertyNameSource]).length !== 0
  );

  const zipFileReferences = await Promise.all(
    filteredCollection.map(async (item) => {
      const { url, name } = item[propertyNameSource];
      const zipFilename = getUniqueFilename(name, uniqueFilenames);
      const response = await fetch(url);
      const arrayBuffer = new Uint8Array(response._blob.buffer);

      return {
        fileName: zipFilename,
        file: arrayBuffer,
      };
    })
  );

  zipFileReferences.forEach(({ fileName, file }) => {
    jsZip.file(fileName, file);
  });

  const arrayBuffer = await jsZip.generateAsync({ type: 'uint8array' });

  return {
    reference: await storeFile(modelNameTarget, propertyNameTarget, {
      contentType: 'application/zip',
      extension: 'zip',
      fileName: `${fileName}`,
      fileBuffer: arrayBuffer,
    }),
  };
};

export default zip;
