// Used to check the type's attributes
export const ISSearchCard = {
  Name: "name",
  $id: "documentId",
  ImagePath: "imagePath",
};

export interface ISearchCard {
  name: string;
  documentId: string;
  imagePath?: any;
}

export interface ISearchCardScreen {
  selectedCard: ISearchCard;
  searchCard: ISearchCard[];
  longPress: boolean;
  // it is string because we only need its value to be changed
  renderScreen?: string;
}
