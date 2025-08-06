import JSZip from 'jszip';

const unzip = async ({
  propertyZipFile: { url: zipFileUrl },
  modelTarget: { name: modelNameTarget },
  propertyTarget: [{ name: propertyNameTarget }],
}) => {
  if (!zipFileUrl) {
    throw new Error('No ZIP file was found');
  }

  try {
    const response = await fetch(zipFileUrl);
    const arrayBuffer = new Uint8Array(response._blob.buffer);

    // Load the ZIP file using JSZip (following documentation pattern)
    const zip = await JSZip.loadAsync(arrayBuffer);

    // Extract all files from the ZIP and store them
    const fileReferences = [];

    for (const [filename, zipEntry] of Object.entries(zip.files)) {
      // Skip directories and macOS metadata files
      if (!zipEntry.dir && !isMacOSMetadataFile(filename)) {
        try {
          // Get file content as Uint8Array for storage
          const fileContent = await zipEntry.async('uint8array');

          // Store the file in the target model property
          const fileReference = await storeFile(
            modelNameTarget,
            propertyNameTarget,
            {
              contentType: getContentType(filename),
              extension: getFileExtension(filename),
              fileName: filename,
              fileBuffer: fileContent,
            }
          );

          fileReferences.push(fileReference);
        } catch (error) {
          throw new Error(
            `Error extracting/storing file ${filename}: ${
              error.message || JSON.stringify(error)
            }`
          );
        }
      }
    }

    return {
      references: fileReferences,
    };
  } catch (error) {
    throw new Error(
      `Error processing ZIP file: ${error.message || JSON.stringify(error)}`
    );
  }
};

// Helper function to determine content type based on file extension
const getContentType = (filename) => {
  const extension = getFileExtension(filename).toLowerCase();
  const contentTypes = {
    txt: 'text/plain',
    json: 'application/json',
    xml: 'application/xml',
    html: 'text/html',
    htm: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    pdf: 'application/pdf',
    zip: 'application/zip',
    csv: 'text/csv',
    md: 'text/markdown',
    log: 'text/plain',
  };

  return contentTypes[extension] || 'application/octet-stream';
};

// Helper function to get file extension
const getFileExtension = (filename) => {
  const lastDotIndex = filename.lastIndexOf('.');
  return lastDotIndex !== -1 ? filename.slice(lastDotIndex + 1) : '';
};

// Helper function to detect macOS metadata files
const isMacOSMetadataFile = (filename) => {
  // Check for __MACOSX directory files
  if (filename.startsWith('__MACOSX/')) {
    return true;
  }

  // Check for ._ files (macOS resource fork files)
  if (filename.startsWith('._') || filename.includes('/._')) {
    return true;
  }

  // Check for other macOS-specific metadata
  if (filename.includes('.DS_Store') || filename.includes('Thumbs.db')) {
    return true;
  }

  return false;
};

export default unzip;
