// 8.状態管理したい型の定義
import { create } from 'zustand'

type EditedTask = {
  id: number
  title: string
}

type State = {
  editedTask: EditedTask
  updateEditedTask: (payload: EditedTask) => void
  resetEditedTask: () => void
}

// zustandの処理を記述
const useStore = create<State>((set) => ({
  editedTask: { id: 0, title: '' },
  updateEditedTask: (payload) =>
    set({
      editedTask: payload,
    }),
  resetEditedTask: () => set({ editedTask: { id: 0, title: '' } }),
}))
// このコードは、状態管理のために使用される関数`useStore`を定義しています。`create`関数を使って状態オブジェクト`State`を定義しており、状態オブジェクトの初期状態とアクションを設定しています。以下に、各部分の説明を記載します。
// 1. `editedTask`: これは編集中のタスクを表すオブジェクトで、`id`と`title`の2つのプロパティを持っています。初期状態では、`id`は0で、`title`は空文字列です。
// 2. `updateEditedTask`: この関数は、新しい`payload`（タスクオブジェクト）を受け取り、現在の状態にマージして更新します。これにより、編集中のタスクが変更される場合に使用されます。
// 3. `resetEditedTask`: この関数は、編集中のタスクをリセットし、初期状態に戻します。これは、編集がキャンセルされたり、タスクが完了したりした場合に呼び出されることが想定されます。
// `useStore`は、状態管理ライブラリ（例：Zustand、React-Reduxなど）を使って、アプリケーション全体で状態を共有するためのカスタムフックとして機能することが想定されています。これにより、編集中のタスクの状態を追跡し、アプリケーション全体で一貫性のある状態を維持できます。

export default useStore
