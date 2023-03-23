import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store"

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector; //здесь мы не можем вызвать селектор так как он должен вернуть нам state.чтото