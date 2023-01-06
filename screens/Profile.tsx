import React, { useEffect } from "react";
import {
  ScrollView,
  View,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Icon, ProfileItem } from "../components";
import styles, { WHITE } from "../assets/styles";
import { ApiProfileCollection } from "../backend/appwrite/service/database/collection/profile";
import { Constants } from "../Constants";
import store, { RootState } from "../redux_modules";
import {
  AChangeDisplayProfile,
  AChangeMetaProfile,
} from "../redux_modules/action";
import {
  IProfileItem,
  ISProfileDisplayItem,
  ISProfileMetaItem,
} from "../interfaces/profile";
import { objectFilterKey, objectMapKey } from "../backend/objectUtil";
import { ApiProfileBucket } from "../backend/appwrite/service/storage/bucket/profile";
import { useSelector } from "react-redux";
import { ISearchCardScreen } from "../interfaces/search";
import { snakeCase } from "../backend/stringUtil";
import {
  EMPTY_CARD,
  NEW_CARD,
} from "../redux_modules/reducer/change_search_card_screen";

const Profile = ({ navigation }: { navigation: any }) => {
  let apiProfileCollection = new ApiProfileCollection(
    Constants.API_ENDPOINT,
    Constants.P_NAMECARD_ID,
    Constants.DB_NAMECARD_ID,
    Constants.C_PROFILE_ID
  );

  let apiProfileBucket = new ApiProfileBucket(
    Constants.API_ENDPOINT,
    Constants.P_NAMECARD_ID,
    Constants.BKT_NAMECARD_ID
  );

  let searchCardScreen: ISearchCardScreen = useSelector(
    (state: RootState) => state.searchCardScreen
  );

  let profileItem: IProfileItem = useSelector(
    (state: RootState) => state.profile
  );

  useEffect(() => {
    if (
      searchCardScreen.selectedCard.documentId &&
      searchCardScreen.selectedCard.documentId !== EMPTY_CARD.documentId &&
      searchCardScreen.selectedCard.documentId !== NEW_CARD.documentId
    ) {
      let promise = apiProfileCollection.queryByDocumentId(
        searchCardScreen.selectedCard.documentId
      );
      promise.then(
        function (response: any) {
          let newDisplayState = objectMapKey(
            objectFilterKey(response.documents[0], ISProfileDisplayItem),
            ISProfileDisplayItem
          );
          let newMetaState = objectMapKey(
            objectFilterKey(response.documents[0], ISProfileMetaItem),
            ISProfileMetaItem
          );
          console.log("set profile state", {
            display: newDisplayState,
            meta: newMetaState,
          });
          store.dispatch(AChangeDisplayProfile(newDisplayState));
          store.dispatch(AChangeMetaProfile(newMetaState));
        },
        function (error: any) {
          console.error(error);
        }
      );
    }
  }, [searchCardScreen.selectedCard.documentId]);

  let imageName = snakeCase(profileItem.display.name + " 1");

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={{
        height: "100%",
        alignItems: "center",
      }}
    >
      <ScrollView style={styles.containerProfile}>
        <ImageBackground
          source={
            profileItem.display.imagePath
              ? {
                  uri: apiProfileBucket.getFilePreview(imageName).toString(),
                }
              : {}
          }
          style={styles.photo}
        ></ImageBackground>
        <View style={styles.top}>
          <TouchableOpacity>
            <Icon
              name="chevron-back"
              size={20}
              color={WHITE}
              style={styles.topIconLeft}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Icon
              name="ellipsis-vertical"
              size={20}
              color={WHITE}
              style={styles.topIconRight}
            />
          </TouchableOpacity>
        </View>

        <ProfileItem />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
