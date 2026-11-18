# 日英音声翻訳（端末内AI・オフライン対応）

マイクの声を文字起こしして、日本語⇔英語に翻訳し、読み上げる自分用アプリです。
AIはすべてブラウザ（端末）の中で動きます。音声や文字は外部に送信しません。
初回だけモデルをダウンロードし、その後はオフラインで使えます。

- 公開ページ: https://tomomo-no.github.io/voice-translator/
- 対応: PCのChrome / Android Chrome / iPhone Safari（iOS 26以降、ホーム画面に追加して使用）

## 使っているモデル・ライブラリとライセンス
| 用途 | 名前 | ライセンス |
|---|---|---|
| ライブラリ | Transformers.js 4.3.2（ONNX Runtime Web 含む） | Apache 2.0（ORT: MIT） |
| 音声認識 | Whisper base / small（OpenAI、ONNX: Xenova） | MIT |
| 日→英 | opus-mt-ja-en（Helsinki-NLP、ONNX: Xenova） | Apache 2.0 |
| 英→日（推奨） | Qwen3 0.6B（Qwen、ONNX: onnx-community） | Apache 2.0 |
| 英→日 | M2M100 418M（Meta、ONNX: Xenova） | MIT |
| 英→日（比較用） | opus-mt-en-jap（Helsinki-NLP、ONNX: Xenova） | Apache 2.0 |
| 読み上げ | ブラウザ内蔵の音声合成（Web Speech API） | OS標準 |

## ファイル
- `index.html` … アプリ本体（1ファイル）
- `sw.js` … オフライン用（アプリ本体を端末に保存）
- `manifest.webmanifest`, `icon-*.png` … ホーム画面に追加するための設定
