import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Nat16 "mo:base/Nat16";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import List "mo:base/List";
import Array "mo:base/Array";
import Option "mo:base/Option";
import Bool "mo:base/Bool";
import Principal "mo:base/Principal";

module {
    public type LogoResult = {
        logo_type : Text;
        data : Text;
    };

    public type Dip721NonFungibleToken = {
        logo : LogoResult;
        name : Text;
        symbol : Text;
        maxLimit : Nat16;
    };

    public type MetadataDesc = [MetadataPart];

    public type MetadataPart = {
        purpose : MetadataPurpose;
        key_val_data : [MetadataKeyVal];
        data : Blob;
    };
    public type MetadataPurpose = {
        #Preview;
        #Rendered;
    };

    public type MetadataKeyVal = {
        key : Text;
        val : MetadataVal;
    };
    public type MetadataVal = {
        #TextContent : Text;
        #BlobContent : Blob;
        #NatContent : Nat;
        #Nat8Content : Nat8;
        #Nat16Content : Nat16;
        #Nat32Content : Nat32;
        #Nat64Content : Nat64;
    };
    public type Result<S, E> = {
        #Ok : S;
        #Err : E;
    };

    public type MintReceipt = Result<MintReceiptPart, ApiError>;

    public type ApiError = {
        #Unauthorized;
        #InvalidTokenId;
        #ZeroAddress;
        #Other;
    };

    public type MintReceiptPart = {
        token_id : TokenId;
        id : Nat;
    };

    public type TokenId = Nat64;
};
