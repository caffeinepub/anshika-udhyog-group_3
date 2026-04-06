import Map "mo:core/Map";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import FileStorage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import UserApproval "user-approval/approval";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let approvalState = UserApproval.initState(accessControlState);
  include MixinStorage();

  module MemberId {
    public type T = Text;
    public func compare(id1 : T, id2 : T) : Order.Order {
      Text.compare(id1, id2);
    };
  };

  type Amount = Nat;

  module Amount {
    public type T = Nat;
    public func compare(a : T, b : T) : Order.Order {
      Nat.compare(a, b);
    };
  };

  module KycStatus {
    public type T = { #pending; #approved; #rejected };

    public func compare(a : T, b : T) : Order.Order {
      switch (a, b) {
        case (#pending, #pending) { #equal };
        case (#pending, _) { #less };
        case (_, #pending) { #greater };
        case (#approved, #approved) { #equal };
        case (#approved, _) { #less };
        case (_, #approved) { #greater };
        case (#rejected, #rejected) { #equal };
      };
    };

    public func toText(status : T) : Text {
      switch (status) {
        case (#pending) { "pending" };
        case (#approved) { "approved" };
        case (#rejected) { "rejected" };
      };
    };
  };

  type Member = {
    id : MemberId.T;
    name : Text;
    phone : Text;
    email : Text;
    photo : FileStorage.ExternalBlob;
    amount : Amount.T;
    kycStatus : KycStatus.T;
    principal : Principal;
  };

  module Member {
    public type T = Member;
    public func compare(member1 : T, member2 : T) : Order.Order {
      switch (MemberId.compare(member1.id, member2.id)) {
        case (#equal) {
          switch (Amount.compare(member1.amount, member2.amount)) {
            case (#equal) {
              KycStatus.compare(member1.kycStatus, member2.kycStatus);
            };
            case (other) { other };
          };
        };
        case (other) { other };
      };
    };
  };

  public type PublicMemberProfile = {
    id : Text;
    name : Text;
    phone : Text;
    email : Text;
    photo : FileStorage.ExternalBlob;
    amount : Amount.T;
    kycStatus : Text;
  };

  public type UserProfile = {
    name : Text;
    memberId : ?Text;
    role : Text;
  };

  let members = Map.empty<Text, Member>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Required user profile functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    // Users can only view their own profile, admins can view any profile
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can view profiles");
    };
    if (caller.notEqual(user) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    ignore userProfiles.add(caller, profile);
  };

  // Member management functions
  public shared ({ caller }) func saveMember(id : Text, profile : Member) : async () {
    // Only admins can create/update members, or the member themselves can update their own record
    let existingMember = members.get(Text.compare, id);

    switch (existingMember) {
      case (null) {
        // Creating new member - admin only
        if (not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only admins can create members");
        };
        ignore members.add(Text.compare, id, profile);
      };
      case (?existing) {
        // Updating existing member - admin or the member themselves
        if (not AccessControl.isAdmin(accessControlState, caller) and caller.notEqual(existing.principal)) {
          Runtime.trap("Unauthorized: Only admins or the member can update this record");
        };
        ignore members.add(Text.compare, id, profile);
      };
    };
  };

  public query ({ caller }) func getMember(id : Text) : async PublicMemberProfile {
    // Only authenticated users can view member details
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can view member details");
    };

    switch (members.get(Text.compare, id)) {
      case (null) {
        Runtime.trap("Member not found");
      };
      case (?member) {
        // Non-admins can only view their own full details
        if (not AccessControl.isAdmin(accessControlState, caller) and caller.notEqual(member.principal)) {
          Runtime.trap("Unauthorized: Can only view your own member details");
        };

        {
          id = member.id;
          name = member.name;
          phone = member.phone.toText();
          email = member.email;
          photo = member.photo;
          amount = member.amount;
          kycStatus = KycStatus.toText(member.kycStatus);
        };
      };
    };
  };

  public query ({ caller }) func listMembers() : async [PublicMemberProfile] {
    // Only admins can list all members
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all members");
    };

    let memberList = members.toArray();
    memberList.map(
      func((_, member) : (Text, Member)) : PublicMemberProfile {
        {
          id = member.id;
          name = member.name;
          phone = member.phone.toText();
          email = member.email;
          photo = member.photo;
          amount = member.amount;
          kycStatus = KycStatus.toText(member.kycStatus);
        };
      }
    );
  };

  public shared ({ caller }) func deleteMember(id : Text) : async () {
    // Only admins can delete members
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete members");
    };

    ignore members.remove(Text.compare, id);
  };

  public shared ({ caller }) func updateKycStatus(id : Text, status : KycStatus.T) : async () {
    // Only admins can update KYC status
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update KYC status");
    };

    switch (members.get(Text.compare, id)) {
      case (null) {
        Runtime.trap("Member not found");
      };
      case (?member) {
        let updatedMember = {
          id = member.id;
          name = member.name;
          phone = member.phone;
          email = member.email;
          photo = member.photo;
          amount = member.amount;
          kycStatus = status;
          principal = member.principal;
        };
        ignore members.add(Text.compare, id, updatedMember);
      };
    };
  };

  // Statistics for dashboard - admin only
  public query ({ caller }) func getMemberCount() : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view statistics");
    };
    members.size();
  };

  public query ({ caller }) func getPendingKycCount() : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view statistics");
    };

    var count = 0;
    for ((_, member) in members.entries()) {
      switch (member.kycStatus) {
        case (#pending) { count += 1 };
        case (_) {};
      };
    };
    count;
  };

  // Approval integration functions
  public query ({ caller }) func isCallerApproved() : async Bool {
    AccessControl.hasPermission(accessControlState, caller, #admin) or UserApproval.isApproved(approvalState, caller);
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(approvalState, caller);
  };

  public shared ({ caller }) func setApproval(user : Principal, status : UserApproval.ApprovalStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.setApproval(approvalState, user, status);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.listApprovals(approvalState);
  };
};
