// Used to check the type's attributes
export const ISProfileDisplayItem = {
  Name: "name",
  FriendshipStage: "friendshipStage",
  LivingAddress: "livingAddress",
  Education: "education",
  Activity: "activity",
  Comment: "comment",
  Todo: "todo",
  ImagePath: "imagePath",
};

export interface IProfileDisplayItem {
  name: string;
  livingAddress?: string[];
  friendshipStage?: string[];
  education?: string[];
  activity?: string[];
  comment?: string[];
  todo?: string[];
  imagePath?: any;
}

// Used to check the type's attributes
export const ISProfileMetaItem = {
  $id: "documentId",
};

export interface IProfileMetaItem {
  documentId: string;
}

export interface IProfileItem {
  display: IProfileDisplayItem;
  meta: IProfileMetaItem;
}

export interface IProfileScreenActivity {
  friendshipDropdownOpen: boolean;
}

export interface ISwipeableItem {
  onSwipeableCloseCallback(
    direction: any,
    onSwipeableCloseCallbackProps: any
  ): void;
  onSwipeableCloseCallbackProps?: any;
}

export interface IProfileArrayItem {
  value: string[];
  valueHandler: any;
  k: string;
  profileItem: IProfileItem;
}
