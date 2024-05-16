# ZIP action function

This function ZIP's multiple files from a specified property from a collection. Please note that the output is a temporary URL and the ZIP file itself needs to be stored in a create/update event via the temporary url.

## Configure the function

### Source collection:

![](https://raw.githubusercontent.com/Betty-Services/zip-action-function/main/img/source_collection.png)

Pre-defined collection which is used as source. This determines which files need to be Zipped.

### Property (database)name:

![](https://raw.githubusercontent.com/Betty-Services/zip-action-function/main/img/property_name.png)

Speficies the datamodel/collection property by assigning it's database name. For more information regarding the database name please see: https://docs.bettyblocks.com/en/articles/6205331-data-model-standards-best-practices#h_67b4116b90

### Model and property to save the file into:

![](https://raw.githubusercontent.com/Betty-Services/zip-action-function/main/img/model_property.png)

The target model is the model where the file will eventually be saved. The property is the property from the model where the file will be saved.

### Filename:

![](https://raw.githubusercontent.com/Betty-Services/zip-action-function/main/img/filename.png)

The Filename of the ZIP file

### As:

    ![As](https://raw.githubusercontent.com/Betty-Services/zip-action-function/main/img/as.png)

The output variable name, which you can be used to save the ZIP file in a update or create step.
