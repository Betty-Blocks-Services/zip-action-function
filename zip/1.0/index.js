import JSZip from "jszip";

const snakeToCamel = (str) => {
  str = str.replace(/_[0-9]/g, (m, chr) => "!" + m);
  str = str.replace(/[^a-zA-Z0-9!]+(.)/g, (m, chr) => chr.toUpperCase());
  return str.replace(/[!]/g, "_");
};

const zip = async ({
  modelTarget: { name: modelNameTarget },
  propertyTarget: [{ name: propertyNameTarget }],
  propertyName,
  collection: { data: collection },
  fileName,
}) => {
  const formattedPropertyName = snakeToCamel(propertyName);
  const jsZip = new JSZip();

  const filteredCollection = collection.filter(
    (item) => Object.keys(item[formattedPropertyName]).length !== 0
  );

  const zipFileReferences = await Promise.all(
    filteredCollection.map(async (item) => {
      const { url, name } = item[formattedPropertyName];

      const response = await fetch(url);
      const arrayBuffer = new Uint8Array(response._blob.buffer);

      return { fileName: name, file: arrayBuffer };
    })
  );

  zipFileReferences.forEach(({ fileName, file }) => {
    jsZip.file(fileName, file);
  });

  const arrayBuffer = await jsZip.generateAsync({ type: "uint8array" });

  return {
    reference: await storeFile(modelNameTarget, propertyNameTarget, {
      contentType: "application/zip",
      extension: "zip",
      fileName: `${fileName}`,
      fileBuffer: arrayBuffer,
    }),
  };
};

export default zip;
