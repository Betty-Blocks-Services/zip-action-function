# ZIP action function

This function ZIPs multiple files from a specified property from a collection. Please note that the output is a temporary reference that needs to be stored in the database using a Create or Update step.

<br/>

## Configuration

#### Collection to read files from:

A pre-defined collection that contains the files that need to be compressed into a ZIP archive file.

#### Property to read files from:

The file/image property from the selected collection that contains the files.

#### Model and property to save the file into:

The target model and property where the ZIP file will be stored.

#### Name of the ZIP file:

The name of the ZIP file that will be generated.


#### As:

The output variable name that you can use to save the ZIP file using a create or update step.

<br/>

# UNZIP action function

This function UNZIPs a ZIP file from a specified property. Please note that the output is an array of temporary references that need to be stored in the database using a Loop and Create or Update step.

<br/>

## Configuration

#### ZIP file

The file property in which the ZIP is stored.

#### Model and property to save the extracted files into:

The target model and property where the extracted files will be stored. 

#### As:

The output variable name for the array of references that you can use in a Loop step.
