import { NavigationActions, StackActions } from "react-navigation";
import { GetCurrentUser } from "./processors/FireBaseManger";

let _navigator;
let _alertModal;

let _routesRequireAuth = [];

function setTopLevelNavigator(navigatorRef, routesRequireAuth) {
  _navigator = navigatorRef;
  _routesRequireAuth = routesRequireAuth;
}

function setTopLevelAlert(modalRef) {
  _alertModal = modalRef;
}

function navigate(routeName, params, subAction = null) {
  var action = NavigationActions.navigate({
    routeName,
    params,
    action: subAction,
  });

  if (_routesRequireAuth.includes(routeName) && GetCurrentUser() == null) {
    action = NavigationActions.navigate({
      routeName: "AuthPage",
    });
  }
  _navigator.dispatch(action);
}

function goBack(key = null) {
  _navigator.dispatch(NavigationActions.back({ key: key }));
}

function push(routeName, params) {
  _navigator.dispatch(
    StackActions.push({
      routeName,
      params,
    })
  );
}

function batchNavigate(batch) {
  for (let i = 0; i < batch.length; i++) {
    navigate(batch[i].routeName, batch[i].params);
  }
}

function replace(currentRoute, routeName, params, actions) {
  _navigator.dispatch(
    StackActions.replace({
      currentRoute,
      routeName,
      routeName,
      params,
      actions,
    })
  );
}

function reset(index, actions) {
  _navigator.dispatch(
    StackActions.reset({
      index,
      actions,
    })
  );
}

function ShowAlert(config) {
  _alertModal.Show(config);
}

function CloseAlert() {
  _alertModal.Close();
}

function getActiveRouteName(navigationState) {
  if (!navigationState) return null;
  const route = navigationState.routes[navigationState.index];
  // Parse the nested navigators
  if (route.routes) return getActiveRouteName(route);
  return route.routeName;
}

// add other navigation functions that you need and export them

export default {
  goBack,
  navigate,
  push,
  replace,
  reset,
  setTopLevelNavigator,
  batchNavigate,
  setTopLevelAlert,
  ShowAlert,
  CloseAlert,
  getActiveRouteName,
};
