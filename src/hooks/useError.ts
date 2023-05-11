// 13.エラーメッセージをハンドリングするカスタムフックを作成
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CsrfToken } from '../types'
import useStore from '../store'

export const useError = () => {
  const navigate = useNavigate()
  const resetEditedTask = useStore((state) => state.resetEditedTask)
  const getCsrfToken = async () => {
    const { data } = await axios.get<CsrfToken>(
      `${process.env.REACT_APP_API_URL}/csrf`
    )
    axios.defaults.headers.common['X-CSRF-TOKEN'] = data.csrf_token
  }
  // スイッチエラーハンドリング
  const switchErrorHandling = (msg: string) => {
    switch (msg) {
      case 'invalid csrf token':
        getCsrfToken()
        alert('CSRF token is invalid, please try again')
        break

      case 'invalid or expired jwt':
        alert('access token expired, please login')
        resetEditedTask()
        navigate('/')
        break

      case 'missing or malformed jwt':
        alert('access token is not valid, please login')
        resetEditedTask()
        navigate('/')
        break

      case 'duplicated key not allowed':
        alert('email already exist, please use another one')
        break

      case 'crypto/bcrypt: hashedPassword is not the hash of the given password':
        alert('password is not correct')
        break

      case 'record not found':
        alert('email is not correct')
        break

      default:
        alert(msg)
    }
  }
  return { switchErrorHandling }
}

// 解説
// このコードは、`useError`というカスタムフックを定義しています。このフックは、エラーメッセージに基づいて適切なエラーハンドリングを行う機能を提供しています。以下に、コード内で行われていることを説明します。
// 1. 必要なライブラリやコンポーネントをインポートしています。これには`axios`、`useNavigate`、`CsrfToken`型、そして`useStore`が含まれます。
// 2. `useNavigate`フックを使って`navigate`関数を取得し、アプリ内のナビゲーションを実行できるようにしています。
// 3. `useStore`フックから`resetEditedTask`関数を取得しています。この関数は、状態管理ストア内の`editedTask`をリセットするために使用されます。
// 4. `getCsrfToken`という非同期関数を定義しています。この関数は、APIからCSRFトークンを取得し、それをaxiosのデフォルトヘッダーに設定しています。これにより、以降のaxiosリクエストにCSRFトークンが自動的に含まれます。
// 5. `switchErrorHandling`関数を定義しています。この関数は、引数`msg`に渡されたエラーメッセージに基づいて適切なエラーハンドリングを行います。`switch`文を使って、エラーメッセージごとに異なる処理を実行しています。
//    - 'invalid csrf token': CSRFトークンが無効の場合、新しいトークンを取得し、アラートでユーザーに知らせます。
//    - 'invalid or expired jwt'と'missing or malformed jwt': JWTが無効または期限切れの場合、アラートでユーザーに知らせ、`resetEditedTask()`を呼び出してタスクをリセットし、ログインページにリダイレクトします。
//    - 'duplicated key not allowed': 既に存在するメールアドレスが入力された場合、アラートでユーザーに知らせます。
//    - 'crypto/bcrypt: hashedPassword is not the hash of the given password': パスワードが正しくない場合、アラートでユーザーに知らせます。
//    - 'record not found': メールアドレスが正しくない場合、アラートでユーザーに知らせます。
//    - それ以外のエラーメッセージ: その他のエラーメッセージが渡された場合、アラートでそのメッセージをユーザーに知らせます。
// 6. 最後に、`switchErrorHandling`関数を返して、このカスタムフックを使用する
