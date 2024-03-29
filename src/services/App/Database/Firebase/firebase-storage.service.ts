import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BlobHelper } from 'src/helpers/BlobHelper';
import { FirebaseHelper } from 'src/helpers/FirebaseHelper';
import { ObjectHelper } from 'src/helpers/ObjectHelper';
import { DbDataType } from 'src/services/Enums/DbDataType';
import { DbEntities } from 'src/services/Enums/DbEntitities';
import { AssetsService } from 'src/services/Services/assets/assets.service';
import { IDatabase } from 'src/services/Interfaces/Database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService implements IDatabase {

  constructor(
    private assets: AssetsService,
    private sanitizer: DomSanitizer,) {
  }

  /**Prototype to get all elements associated to the specified entity */
  async getAllItems(datatype: DbDataType): Promise<object[]> {
    const credentials = await this.getCredentials();
    let items: object[] = [];
    switch (datatype) {
      case DbDataType.GALLERY:     
        items = await this.getGalleryItems(credentials);
        break;
      default:
        break;
    }
    return items;
  }

  /**
   * Method saving the soecified element on firebase
   * at the specified object key. 
   * @param key 
   * @param savedImageFile 
   * @returns 
   */
  async saveElement(key: string, savedImageFile: object) {
    const credentials = await this.getCredentials();
    let data = await FirebaseHelper.getData(credentials, key) as object[];
    data = data != null ? data : [];

    FirebaseHelper.pushToChild(savedImageFile, credentials, key);
  }

  /**Method getting the photoes from the gallery using 
   * the firebase realtime database. */
  async getGalleryItems(credentials: object): Promise<object[]> {
    const key = DbEntities[DbEntities.PHOTO_STORAGE];   
    const allPhotos = await FirebaseHelper.getData(credentials, key) as object[];
    let fixedData: object[] = [];
    if (allPhotos != null) {
      fixedData = this.sanitizePhotoes(allPhotos);
    }
    return fixedData;
  }

  /**
   * Method sinifizing the photoes gotten from firebase.
   * @param data 
   */
  sanitizePhotoes(data: object[]): object[] {
    let arr: object[] = [];
    if (data != null) {
      data.forEach((element) => {
        const blob = BlobHelper.convertBase64ToBlob(element['blobBase64'] as string);
        let objectURLa = URL.createObjectURL(blob);
        const imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURLa);
        const index = ObjectHelper.getValueKey(data, element);
        data[index]["webviewPath"] = imageUrl;
        arr.push(data[index]);
      });

    }
    return arr;
  }

  //#region getters

  /**Method getting the firebase credentials fromt he assets */
  async getCredentials() {
  const credentials = await this.assets.getFile('assets/Firebase/sportmonitoring_credentials.json');
  return JSON.parse(JSON.stringify(credentials));
}

  //#endregion
}
