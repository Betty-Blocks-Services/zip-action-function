# ZIP action function

This function ZIP's multiple files from a specified property from a collection. Please note that the output is a temporary URL and the ZIP file itself needs to be stored in a create/update event via the temporary url.

## Configure the function

### Source collection:

Pre-defined collection which is used as source. This determines which files need to be Zipped.

### Property (database)name:

Speficies the datamodel/collection property by assigning it's database name. For more information regarding the database name please see: https://docs.bettyblocks.com/en/articles/6205331-data-model-standards-best-practices#h_67b4116b90

### Model and property to save the file into:

The target model is the model where the file will eventually be saved. The property is the property from the model where the file will be saved.

### Filename:

The Filename of the ZIP file

### As:

The output variable name, which you can be used to save the ZIP file in a update or create step.
