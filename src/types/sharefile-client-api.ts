export namespace SharefileNodeAPI {
  export namespace Items {
    export interface UpdateItem_Params {
      /** ID of the Item object. */
      id: string;
      /** BatchID for Async Operation. */
      batchid: string;
      /** Async Operation size in bytes. */
      batchSizeInBytes: number;
      /** Indicates whether the operation is to be executed synchronously. */
      forceSync: boolean;
      /** Indicates whether the operation is to be scheduled for Bot processing. */
      scheduleAsync: boolean;
      /** Specifies whether to rename the folder if there is a conflict. */
      resolveFolderNameConflict: boolean;
      /** Indicates whether an email should be sent to users subscribed to Upload Notifications. */
      notify: boolean;
    }

    export interface UpdateItemOps_Body {
      /** Updated Item Name. */
      Name?: string;
      /** Updated Item File Name. */
      FileName?: string;
      /** Updated Item Description. */
      Description?: string;
      /** Updated Item Expiration Date. */
      ExpirationDate?: Date;
      /** Updated Parent container of the Item. */
      Parent?: { Id?: string };
      /** Updated Storage Zone that contains the Item. */
      Zone?: { Id?: string };
    }
  }
  export interface Auth {
    subdomain: string;
    username: string;
    password: string;
    clientId: string;
    clientSecret: string;
  }
}
