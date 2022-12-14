import React, { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";
import { ACTION } from "./action";
import { useMemoizedFn } from "ahooks";
import { getComments, getCommentById } from "../utils/query";
// import { useImmerReducer } from "use-immer"; // !TODO: maybe useful for some case

const HeexContext = createContext();

const initialState = {
    page: 1,
    commentCount: 0,
    comments: [],
    sortingMethod: "newest",
};

const HeexContextProvider = (props) => {
    const { children, pageId } = props;

    const [state, dispatch] = useReducer(reducer, { ...initialState, pageId });

    const refreshCommentsWithLimit = useMemoizedFn(async () => {
        // limit is the current number of comments, no need to fetch all
        const comments = await getComments({ limit: 25, pageId: state.pageId });
        if (comments !== undefined) {
            dispatch({
                type: ACTION.SET_COMMENTS,
                payload: { comments },
            });

            dispatch({
                type: ACTION.INCR_COMMENT_COUNT,
            });
        }
    });

    const refreshThread = useMemoizedFn(async (param) => {
        const { cid } = param || {};
        if (!cid) return;
        const comment = await getCommentById(cid);
        if (comment === undefined) return;
        const index = state.comments.findIndex((c) => c.objectId === cid);
        dispatch({
            type: ACTION.REFRESH_THREAD,
            payload: { toBeRefreshedIndex: index, toBeRefreshed: comment },
        });
    });

    return (
        <HeexContext.Provider
            value={{ state, dispatch, refreshCommentsWithLimit, refreshThread }}
        >
            {children}
        </HeexContext.Provider>
    );
};

const useHeexContext = () => useContext(HeexContext);

export { ACTION, HeexContextProvider, useHeexContext };
