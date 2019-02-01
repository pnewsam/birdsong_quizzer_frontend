export const UPDATE_PAGE = "UPDATE_PAGE";
export const UPDATE_OFFLINE = "UPDATE_OFFLINE";

export const navigate = path => dispatch => {
  // Extract the page name from path.
  const page = path === "/" ? "view1" : path.slice(1);

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page));
};

const loadPage = page => dispatch => {
  import("../components/home-page.js").then(module => {
    // Put code in here that you want to run every time when
    // navigating to view1 after home-page.js is loaded.
  });

  dispatch(updatePage(page));
};

const updatePage = page => {
  return {
    type: UPDATE_PAGE,
    page
  };
};

export const updateOffline = offline => (dispatch, getState) => {
  dispatch({
    type: UPDATE_OFFLINE,
    offline
  });
};
