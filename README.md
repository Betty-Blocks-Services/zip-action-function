# ZIP action function

This function compresses multiple files from a specified property of a collection into a single ZIP file. 
> [!IMPORTANT]
> Please note that <b>the function does not store the generated file in the database</b>. Instead, it returns a temporary file reference that should be saved using a Create or Update step.

<br/>

## Configuration

#### Collection to read files from:

A pre-defined collection that contains the files that need to be compressed into a ZIP archive file.

#### Property to read files from:

The file/image property from the selected collection that contains the files.

#### Model and property to save the file into:

The target model and file property where the ZIP file will be stored. These options are required to generate a file reference that matches the file property used in your Create or Update step, so make sure they align.

#### Name of the ZIP file:

The name of the ZIP file that will be generated.


#### As:

The output variable name that you can use to save the ZIP file using a create or update step.

<br/>

# UNZIP action function

This function extracts files from a ZIP file in a specified property. 
> [!IMPORTANT]
> Please note that <b>the extracted files are also not stored in the database</b>. The function returns an array of temporary file references, which you can store using a Loop combined with a Create or Update step.

<br/>

## Configuration

#### ZIP file

The file property in which the ZIP is stored.

#### Model and property to save the extracted files into:

The target model and property where the extracted files will be stored. These options are required to generate file references that match the file property used in your Create or Update step, so make sure they align. It's not possible to save the extracted files in different properties.

#### As:

The output variable name for the array of references that you can use in a Loop step.
