import React from 'react'

/**
 * 1. 好的typescript應用，需要利用好隱式推斷，利用好第三方的泛型可以大大優化這點
 * 2. App中不同場景，所要消費的物件形狀並不相同，例如：同樣是User，Get、Update、Form，都可能有所不同，以下會分析差異
 * 3. 既然不同場景下的形狀會有所不同，一個合理的MentalModel就顯得格外重要，因為從Type延伸出去的「function」，都是基於「一個理想形狀的物件所構建而成」
 *  ，什麼是「理想形狀」=> 是Get、Post、Form的哪一個呢？是這邊要思考的問題．
 * 4. 另外，傳遞的過程，自動的轉換形狀，也是我們非常渴望的
 *  舉例來說：
 *  Form (不包含ID、為了符合下拉機制性別Union中包含一個undefined)
 *  => CreatePayload (不包含ID、因為經過yup的驗證，性別Union中已經不存在undefined)
 *  => Get (完整建構，包含ID、性別Union中已經不存在undefined)
 * 5. 這些不同形狀的interface若要強制塞在一起，勢必會造成開發人員對於interface的不信任，
 *  有點像是，雖然我知道 我在會員列表一定會拿到ID，但是因為要遵守規則，所以要多寫type guard，連自己都會覺得很蠢
 * 6. 如果不塞在一起，除了各寫各的以外，還必須思考「哪些地方適合寫interface，對於日後的維護性最高」
 * 7. Go~
 */

export default function BetterTypeForm() {
  return <div>BetterTypeForm</div>
}
