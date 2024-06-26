// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
  public type ApiError = {
    #ZeroAddress;
    #InvalidTokenId;
    #Unauthorized;
    #Other;
  };

  
  public type Nft = {
    owner: Principal;
    id: TokenId;
    metadata: MetadataDesc;
  };
  public type Dip721NonFungibleToken = {
    maxLimit : Nat16;
    logo : LogoResult;
    name : Text;
    symbol : Text;
  };
  public type ExtendedMetadataResult = {
    #Ok : { token_id : TokenId; metadata_desc : MetadataDesc };
    #Err : ApiError;
  };
  public type InterfaceId = {
    #Burn;
    #Mint;
    #Approval;
    #TransactionHistory;
    #TransferNotification;
  };
  public type LogoResult = { data : Text; logo_type : Text };
  public type MetadataDesc = [MetadataPart];
  public type MetadataKeyVal = { key : Text; val : MetadataVal };
  public type MetadataPart = {
    data : Blob;
    key_val_data : [MetadataKeyVal];
    purpose : MetadataPurpose;
  };
  public type MetadataPurpose = { #Preview; #Rendered };
  public type MetadataResult = { #Ok : MetadataDesc; #Err : ApiError };
  public type MetadataVal = {
    #Nat64Content : Nat64;
    #Nat32Content : Nat32;
    #Nat8Content : Nat8;
    #NatContent : Nat;
    #Nat16Content : Nat16;
    #BlobContent : Blob;
    #TextContent : Text;
  };
  public type MintReceipt = { #Ok : MintReceiptPart; #Err : ApiError };
  public type MintReceiptPart = { id : Nat; token_id : TokenId };
  public type OwnerResult = { #Ok : Principal; #Err : ApiError };
  public type TokenId = Nat64;
  public type TxReceipt = { #Ok : Nat; #Err : ApiError };
  public type Self = actor {
    balanceOfDip721 : shared query Principal -> async Nat64;
    getMaxLimitDip721 : shared query () -> async Nat16;
    getMetadataDip721 : shared query TokenId -> async MetadataResult;
    getMetadataForUserDip721 : shared Principal -> async ExtendedMetadataResult;
    getTokenIdsForUserDip721 : shared query Principal -> async [TokenId];
    logoDip721 : shared query () -> async LogoResult;
    mintDip721 : shared (Principal, MetadataDesc) -> async MintReceipt;
    nameDip721 : shared query () -> async Text;
    ownerOfDip721 : shared query TokenId -> async OwnerResult;
    safeTransferFromDip721 : shared (
        Principal,
        Principal,
        TokenId,
      ) -> async TxReceipt;
    supportedInterfacesDip721 : shared query () -> async [InterfaceId];
    symbolDip721 : shared query () -> async Text;
    totalSupplyDip721 : shared query () -> async Nat64;
    transferFromDip721 : shared (
        Principal,
        Principal,
        TokenId,
      ) -> async TxReceipt;

    getallNft : shared query () -> async [Nft];
  }
}