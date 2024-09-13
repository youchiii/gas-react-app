import React, { useState } from 'react';

const App: React.FC = () => {
  const [input, setInput] = useState<string>(''); // 入力フィールドの状態
  const [responseData, setResponseData] = useState<any>(null); // GASからのレスポンスの状態

  const handleSendData = async () => {
    const apiUrl = 'https://script.google.com/macros/s/AKfycbwDrU2DvO3Re7UBnVio0C0vQ4mJtET3LmW24T__hh-8RaXtgX8gFX4IeFCecLJWRa66/exec'; // GASのAPI URL

    const data = {
      message: input
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        mode: 'cors' //CORSを有効にする
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('GAS Response:', result); // デバッグ用ログ
      setResponseData(result); // レスポンスデータを状態に保存
    } catch (error) {
      console.error('Error sending data to GAS:', error);
    }
  };

  return (
    <div>
      <h1>ﾚﾚｼﾞｼﾞｶﾞｶﾞｶﾞｶﾞｶﾞｶﾞGAS</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="メッセージを入力"
      />
      <button onClick={handleSendData}>Send Data to GAS</button>
      {responseData && (
        <div>
          <h2>Response from GAS:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
