# EPA Learning Assess


## Usage

To be updated.


## Todo Lists

- 要上傳 lecture.json
- use iFrame on the right side
- filter "other lecture" manually

- Variable in JavaScript callback functions always gets last value in loop?
- 確保重複使用時，變數都有正常 init()
- [Issue 1]CSV 的最後一行最好加上 newline，否則可能會重複算到最後一行（同樣的字串，在檔案中間 跟在檔案最後面，會被視為不同字串，應該跟換行符號有關係）
 - [Solved] 只要在每一行最後面加上 "," 即可，是因為 split(",") 的關係嗎?
- [Issue 2] 從 CSV 讀取進來的字串 跟 從 JSON 讀取進來的字串不一樣！？
 - 從 CSV 經過 split '\n' ',' 後的「最後一行」的字串 跟 從 JSON 讀取進來的字串一樣。最後一行以外的字串卻都不被視為一樣。
 - 加上 .trim() 試試看？
 - https://stackoverflow.com/questions/863524/javascript-string-compare-sometimes-fails

## License

This project is licensed under the terms of the [MIT license](http://opensource.org/licenses/MIT).

Please note that this project is built with materials from the following parties:

- [Bootstrap](http://getbootstrap.com/)
- [jQuery](https://jquery.com/)

Please also refer to their Licenses for further information.

