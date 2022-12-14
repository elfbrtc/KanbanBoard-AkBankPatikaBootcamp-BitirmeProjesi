import {
  Children,
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { boardDetail } from '../../services/http/scrumboard/endpoints/boardDetail'
import { BoardDetailType, ContextType, CreateBoardListType } from './types'

export const initialState: BoardDetailType = {
  singleList: [],
  labels : []
}

export const BoardDetailContext = createContext<ContextType>({
  dispatches: {},
  state: initialState,
})

export const BoardDetailProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<BoardDetailType>(initialState)
  const dispatches: ContextType['dispatches'] = {}
  useEffect(() => {
    boardDetail.getLabelList().then((data: any) => {
      setState((prev) => ({...prev, labels: data.data}))
    })
  }, [])

  dispatches.getBoardList = (boardList: any) => {
    setState((prev) => ({ ...prev, singleList: boardList }))
  }

  dispatches.createBoardList = (boardList: any) => {
    setState((prev) => ({ ...prev, singleList: boardList }))
  }

  dispatches.updateBoardList = (boardList: any) => {
    let allListData = state.singleList
    let dataIndex = allListData.findIndex((item) => 
        item.id === boardList.id
    )
    allListData[dataIndex] = boardList
    setState((prev) => ({ ...prev, singleList: allListData }))
    console.log(state.singleList)
  }
  
  dispatches.createListCard = (listId: any, listCard: any) => {
    let allListData = state.singleList
    let dataIndex = allListData.findIndex((item) => 
        item.id === listId
    )
    allListData[dataIndex] = listCard
    setState((prev) => ({ ...prev, singleList: allListData }))
  }

  return (
    <BoardDetailContext.Provider
      value={{
        state,
        dispatches,
      }}
    >
      {children}
    </BoardDetailContext.Provider>
  )
}

export const useBoardDetailContext = () => {
  return useContext(BoardDetailContext)
}