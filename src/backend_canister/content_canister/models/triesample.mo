import Trie "mo:base/Trie";
import Text "mo:base/Text";
import Error "mo:base/Error";

actor {
  type UserInfo = {
    userName : Text;
    userEmail : Text;
    userPassword : Text;
  };

  


  type Trie<K, V> = Trie.Trie<K, V>;
  type Key<K> = Trie.Key<K>;

  func key(t: Text) : Key<Text> { { hash = Text.hash t; key = t } };

  stable var trie : Trie<Text, UserInfo> = Trie.empty();

  public func signUp( Info : UserInfo) : async Text {
    let userInfo : UserInfo = {
      userName = Info.userName;
      userEmail = Info.userEmail;
      userPassword = Info.userPassword;
    };
    let newTrie = Trie.put(trie, key(userInfo.userEmail), Text.equal, userInfo).0;
    trie := newTrie;
    return "User successfully registered";
  };

  public func fetchUser(userEmail : Text) : async UserInfo {
    switch (Trie.get(trie, key userEmail, Text.equal)) {
      case (?userInfo) { return userInfo };
      case (null) { throw Error.reject("User is not registered") };
    };
  };

  public func login(userEmail : Text, loginInfo : UserInfo) : async Text {
    let storedUserInfo = await fetchUser(userEmail);

    if (Text.equal(loginInfo.userEmail, storedUserInfo.userEmail) and Text.equal(loginInfo.userPassword, storedUserInfo.userPassword)) {
      return "Login success";
    } else {
      throw Error.reject("Invalid user credentials");
    };
  };

  public func updatePassword(userEmail : Text, Info : UserInfo) : async () {
    let userInfo : UserInfo = {
      userName = Info.userName;
      userEmail = Info.userEmail;
      userPassword = Info.userPassword;
    };
    let (newTrie, _) = Trie.put(trie, key userEmail, Text.equal, userInfo);
    trie := newTrie;
  };

  public func deleteData(userEmail : Text) : async Text {
    let (newTrie, _) = Trie.remove(trie, key userEmail, Text.equal);
    trie := newTrie;
    return "User deleted";
  };
};
