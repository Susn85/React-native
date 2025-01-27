import { createNavigationContainerRef,CommonActions,StackActions } from "@react-navigation/native";
export const navigationRef = createNavigationContainerRef();
export async function navigate(routName: string, params?: object) {
    await navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.navigate(routName, params));
    }
}
export async function resetAndNavigate(routName: string){
    await navigationRef.isReady();
      if(navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: routName }],
            })
        );
    }
}
export async function goBack() {
    await navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.goBack());
    }
}
export async function push(routName: string, params?: object) {
    await navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.push(routName, params));
    }
}

export async function prepareNavigation(){
    await navigationRef.isReady();
}
export type RootStackParamList = {

    Welcome: undefined;
  
    Login: undefined;
  
    HomeScreen: undefined;
};  