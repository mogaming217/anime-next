import { NextPage } from "next";
import { App } from "components/App";
import { Const } from "lib/const";
import { publicEnv } from "env";

const term = `
最終変更日 2018年10月24日
本利用規約（以下「本規約」といいます。）には、株式会社マカセテ（以下「当社」といいます。）の提供するサービス「${Const.SERVICE_NAME}」のご利用にあたり、登録ユーザーの皆様に遵守していただかなければならない事項及び当社と登録ユーザーの皆様との間の権利義務関係が定められております。当該サービスを登録ユーザーとしてご利用になる方は、本規約に同意する前に、必ず全文お読み下さいますようお願い致します。

第1条 適　用
1. 本規約は、本サービス（第2条に定義）の利用に関する当社と登録ユーザー（第2条に定義）との間の権利義務関係を定めることを目的とし、登録ユーザーと当社の間の本サービスの利用に関わる一切の関係に適用されます。
2. 当社が当社ウェブサイト（第2条に定義）上で随時掲載する本サービスに関するルール、諸規定等は本規約の一部を構成するものとします。

第2条 定　義
本規約において使用する以下の用語は各々以下に定める意味を有するものとします。
(1)「知的財産権」とは、著作権、特許権、実用新案権、商標権、意匠権その他の知的財産権（それらの権利を取得し、又はそれらの権利につき登録等を出願する権利を含みます。）を意味します。
(2)「当社ウェブサイト」とは、そのドメインが「${publicEnv.host.replace('https://', '')}」である当社が運営するウェブサイト（理由の如何を問わず当社のウェブサイトのドメイン又は内容が変更された場合は、当該変更後のウェブサイトを含みます。）を意味します。
(3)「登録希望者」とは、第3条において定義された「登録希望者」を意味します。
(4)「登録情報」とは、第3条において定義された「登録情報」を意味します。
(5)「登録ユーザー」とは、第3条に基づき本サービスの利用者としての登録がなされた個人又は法人を意味します。
(6)「本サービス」とは、当社が提供するという名称「${Const.SERVICE_NAME}」のサービス（理由の如何を問わずサービスの名称又は内容が変更された場合は、当該変更後のサービスを含みます。）を意味します。
(7)「利用契約」とは、第3条第4項に基づき当社と登録ユーザーの間で成立する、本規約の諸規定に従った本サービスの利用契約を意味します。
(8)「外部サービス」とは、Google、その他の他の事業者が提供している、本サービスの実施に利用されるサービスを意味します。
(9)「外部事業者」とは、外部サービスのサービス提供者を意味します。
(10)「外部利用規約」とは、登録ユーザーと外部事業者との権利関係を定める規約を意味します。

第3条 登　録
1. 本サービスの利用を希望する者（以下「登録希望者」といいます。）は、本規約を遵守することに同意し、かつ当社の定める一定の情報（以下「登録情報」といいます。）を当社の定める方法で当社に提供することにより、当社に対し、本サービスの利用の登録を申請することができます。
2. 登録の申請は必ず本サービスを利用する個人又は法人自身が行わなければならず、原則として代理人による登録申請は認められません。また、登録希望者は、登録の申請にあたり、真実、正確かつ最新の情報を当社に提供しなければなりません。
3. 当社は、当社の基準に従って、登録希望者の登録の可否を判断し、当社が登録を認める場合にはその旨を登録希望者に通知し、この通知により登録希望者の登録ユーザーとしての登録は完了したものとします。
4. 前項に定める登録の完了時に、本規約の諸規定に従った本サービスの利用契約が登録ユーザーと当社の間に成立し、登録ユーザーは本サービスを当社の定める方法で利用することができるようになります。
5. 当社は、第1項に基づき登録を申請した者が、以下の各号のいずれかの事由に該当する場合は、登録を拒否することがあります。
(1) 本規約に違反するおそれがあると当社が判断した場合
(2) 当社に提供された登録情報の全部又は一部につき虚偽、誤記又は記載漏れがあった場合
(3) 過去に本サービスの利用の登録を取り消された者である場合
(4) 未成年者、成年被後見人、被保佐人又は被補助人のいずれかであり、法定代理人、後見人､保佐人又は補助人の同意等を得ていなかった場合
(5) 反社会的勢力等（暴力団、暴力団員、右翼団体、反社会的勢力、その他これに準ずる者を意味します。以下同じ。）である、又は資金提供その他を通じて反社会的勢力等の維持、運営若しくは経営に協力若しくは関与する等反社会的勢力等との何らかの交流若しくは関与を行っていると当社が判断した場合
(6) その他、当社が登録を適当でないと判断した場合

第4条 登録情報の変更
登録ユーザーは、登録情報に変更があった場合は、遅滞なく、当社の定める方法により、当該変更事項を当社に通知し、当社から要求された資料を提出するものとします。

第5条 本サービスの利用
1. 登録ユーザーは、利用契約の有効期間中、本規約の目的の範囲内でかつ本規約に違反しない範囲内で、当社の定める方法に従い、本サービスを利用することができます。
2. 本サービスの提供を受けるために必要な、コンピューター、ソフトウェアその他の機器、通信回線その他の通信環境等の準備及び維持は、登録ユーザーの費用と責任において行うものとします。
3.登録ユーザーは自己の本サービスの利用環境に応じて、コンピューター・ウィルスの感染の防止、不正アクセス及び情報漏洩の防止等のセキュリティ対策を自らの費用と責任において講じるものとします。

第6条 禁止行為
1. 登録ユーザーは、本サービスの利用にあたり、以下の各号のいずれかに該当する行為をしてはなりません。
(1) 当社、又は他の登録ユーザー、外部事業者その他の第三者の知的財産権、肖像権、プライバシーの権利、名誉、その他の権利又は利益を侵害する行為（かかる侵害を直接又は間接に惹起する行為を含みます。）
(2) 犯罪行為に関連する行為又は公序良俗に反する行為
(3) 猥褻な情報又は青少年に有害な情報を送信する行為
(4) 異性交際に関する情報を送信する行為
(5) 法令又は当社若しくは登録ユーザーが所属する業界団体の内部規則に違反する行為
(6) コンピューター・ウィルスその他の有害なコンピューター・プログラムを含む情報を送信する行為
(7) 本サービスに関し利用しうる情報を改ざんする行為
(8) 当社が定める一定のデータ容量以上のデータを本サービスを通じて送信する行為
(9) 当社による本サービスの運営を妨害するおそれのある行為
(10) その他、当社が不適切と判断する行為
2. 当社は、本サービスにおける登録ユーザーによる情報の送信行為が前項各号のいずれかに該当し、又は該当するおそれがあると当社が判断した場合には、登録ユーザーに事前に通知することなく、当該情報の全部又は一部を削除することができるものとします。当社は、本項に基づき当社が行った措置に基づき登録ユーザーに生じた損害について一切の責任を負いません。

第8条 本サービスの停止等
1. 当社は、以下のいずれかに該当する場合には、登録ユーザーに事前に通知することなく、本サービスの利用の全部又は一部を停止又は中断することができるものとします。
(1) 本サービスに係るコンピューター・システムの点検又は保守作業を定期的又は緊急に行う場合
(2) コンピューター、通信回線等が事故により停止した場合
(3) 火災、停電、天災地変などの不可抗力により本サービスの運営ができなくなった場合
(4) 外部サービスに、トラブル、サービス提供の中断又は停止、本サービスとの連携の停止、仕様変更等が生じた場合
(5) その他、当社が停止又は中断を必要と判断した場合
2. 当社は、当社の都合により、本サービスの提供を終了することができます。この場合、当社は登録ユーザーに事前に通知するものとします。
3.当社は、本条に基づき当社が行った措置に基づき登録ユーザーに生じた損害について一切の責任を負いません。

第9条 情報の保存
当社は、登録ユーザーが送受信したメッセージその他の情報を運営上一定期間保存していた場合であっても、かかる情報を保存する義務を負うものではなく、当社はいつでもこれらの情報を削除できるものとします。なお、当社は本条に基づき当社が行った措置に基づき登録ユーザーに生じた損害について一切の責任を負いません。

第10条 ダウンロード等についての注意事項
登録ユーザーは、本サービスの利用開始に際し又は本サービスの利用中に、当社ウェブサイトからのダウンロードその他の方法によりソフトウェア等を登録ユーザーのコンピューター等にインストールする場合には、登録ユーザーが保有する情報の消滅若しくは改変又は機器の故障、損傷等が生じないよう十分な注意を払うものとし、当社は登録ユーザーに発生したかかる損害について一切責任を負わないものとします。

第11条 権利帰属
1. 当社ウェブサイト及び本サービスに関する所有権及び知的財産権は全て当社又は当社にライセンスを許諾している者に帰属しており、本規約に定める登録に基づく本サービスの利用許諾は、本規約において明示されているものを除き、当社ウェブサイト又は本サービスに関する当社又は当社にライセンスを許諾している者の知的財産権の譲渡又は使用許諾を意味するものではありません。登録ユーザーは、いかなる理由によっても当社又は当社にライセンスを許諾している者の知的財産権を侵害するおそれのある行為（逆アセンブル、逆コンパイル、リバースエンジニアリングを含みますが、これに限定されません。）をしないものとします。
2. 当社ウェブサイト又は本サービスにおいて、登録ユーザーが投稿その他送信を行った文章、画像、動画その他のデータについては、当社において、無償で自由に利用（複製、複写、改変、第三者への再許諾その他のあらゆる利用を含みます。）することができるものとします。

第12条 登録取消等
1. 当社は、登録ユーザーが、以下の各号のいずれかの事由に該当する場合は、事前に通知又は催告することなく、当該登録ユーザーについて本サービスの利用を一時的に停止し、又は登録ユーザーとしての登録を取り消すことができます。
(1) 本規約のいずれかの条項に違反した場合
(2) 登録情報に虚偽の事実があることが判明した場合
(3) 当社、他の登録ユーザー、外部事業者その他の第三者に損害を生じさせるおそれのある目的又は方法で本サービスを利用した、又は利用しようとした場合
(4) 外部利用規約に違反したことその他の理由によって、登録ユーザーが外部事業者から、そのサービスの提供や連携を受けられなくなった場合
(5) 手段の如何を問わず、本サービスの運営を妨害した場合
(6) 支払停止若しくは支払不能となり、又は破産手続開始、民事再生手続開始、会社更生手続開始、特別清算開始若しくはこれらに類する手続の開始の申立てがあった場合
(7) 自ら振出し、若しくは引受けた手形又は小切手につき、不渡りの処分を受けた場合
(8) 差押、仮差押、仮処分、強制執行又は競売の申立てがあった場合
(9) 租税公課の滞納処分を受けた場合
(10) 死亡した場合又は後見開始、保佐開始若しくは補助開始の審判を受けた場合
(11) 第3条第5項各号に該当する場合
(12) その他、当社が登録ユーザーとしての登録の継続を適当でないと判断した場合
2. 前項各号のいずれかの事由に該当した場合、登録ユーザーは、当社に対して負っている債務の一切について当然に期限の利益を失い、直ちに当社に対して全ての債務の支払を行わなければなりません。
3.登録ユーザーは、30日前までに当社所定の方法で当社に通知することにより、自己の登録ユーザーとしての登録を取り消すことができます。
4.当社は、30日前までに当社所定の方法で登録ユーザーに通知することにより、登録ユーザーの登録を取り消すことができます。
5.当社は、本条に基づき当社が行った行為により登録ユーザーに生じた損害について一切の責任を負いません。
6.本条に基づき登録ユーザーの登録が取り消された場合、登録ユーザーは、当社の指示に基づき、当社から提供を受けた本サービスに関連するソフトウェア、マニュ${Const.SERVICE_NAME}その他の物につき、返還、廃棄その他の処分を行うものとします。

第13条 保証の否認及び免責
1. 本サービスは、外部サービスと連携することがありますが、かかる連携を保証するものではなく、本サービスにおいて外部サービスと連携できなかった場合でも、当社は一切の責任を負いません。
2. 本サービスが外部サービスと連携している場合において、登録ユーザーは外部利用規約を自己の費用と責任で遵守するものとし、登録ユーザーと当該外部サービスを運営する外部事業者との間で紛争等が生じた場合でも、当社は当該紛争等について一切の責任を負いません。
3. 登録ユーザーは、本サービスを利用することが、登録ユーザーに適用のある法令、業界団体の内部規則等に違反するか否かを自己の責任と費用に基づいて調査するものとし、当社は、登録ユーザーによる本サービスの利用が、登録ユーザーに適用のある法令、業界団体の内部規則等に適合することを何ら保証するものではありません。
4. 本サービス又は当社ウェブサイトに関連して登録ユーザーと他の登録ユーザー、外部事業者その他の第三者との間において生じた取引、連絡、紛争等については、登録ユーザーの責任において処理及び解決するものとし、当社はかかる事項について一切責任を負いません。
5. 当社は、当社による本サービスの提供の中断、停止、終了、利用不能又は変更、登録ユーザーのメッセージ又は情報の削除又は消失､登録ユーザーの登録の取消、本サービスの利用によるデータの消失又は機器の故障若しくは損傷、その他本サービスに関連して登録ユーザーが被った損害につき、賠償する責任を一切負わないものとします。
6. 当社ウェブサイトから他のウェブサイトへのリンク又は他のウェブサイトから当社ウェブサイトへのリンクが提供されている場合でも、当社は、当社ウェブサイト以外のウェブサイト及びそこから得られる情報に関して如何なる理由に基づいても一切の責任を負わないものとします。
7. 当社は、本サービスに関連して登録ユーザーが被った損害について、一切賠償の責任を負いません。

第14条 紛争処理及び損害賠償
1. 登録ユーザーは、本規約に違反することにより、又は本サービスの利用に関連して当社に損害を与えた場合、当社に対しその損害を賠償しなければなりません。
2. 登録ユーザーが、本サービスに関連して他の登録ユーザー、外部事業者その他の第三者からクレームを受け又はそれらの者との間で紛争を生じた場合には、直ちにその内容を当社に通知するとともに、登録ユーザーの費用と責任において当該クレーム又は紛争を処理し、当社からの要請に基づき、その経過及び結果を当社に報告するものとします。
3. 登録ユーザーによる本サービスの利用に関連して、当社が、他の登録ユーザー、外部事業者その他の第三者から権利侵害その他の理由により何らかの請求を受けた場合は、登録ユーザーは当該請求に基づき当社が当該第三者に支払を余儀なくされた金額を賠償しなければなりません。

第15条 秘密保持
1. 本規約において「秘密情報」とは、利用契約又は本サービスに関連して、登録ユーザーが、当社より書面、口頭若しくは記録媒体等により提供若しくは開示されたか、又は知り得た、当社の技術、営業、業務、財務、組織、その他の事項に関する全ての情報を意味します。但し、(1)当社から提供若しくは開示がなされたとき又は知得したときに、既に一般に公知となっていた、又は既に知得していたもの、(2)当社から提供若しくは開示又は知得した後、自己の責めに帰せざる事由により刊行物その他により公知となったもの、(3)提供又は開示の権限のある第三者から秘密保持義務を負わされることなく適法に取得したもの、(4)秘密情報によることなく単独で開発したもの、(5)当社から秘密保持の必要なき旨書面で確認されたものについては、秘密情報から除外するものとします。
2. 登録ユーザーは、秘密情報を本サービスの利用の目的のみに利用するとともに、当社の書面による承諾なしに第三者に当社の秘密情報を提供、開示又は漏洩しないものとします。
3. 第2項の定めに拘わらず、登録ユーザーは、法律、裁判所又は政府機関の命令、要求又は要請に基づき、秘密情報を開示することができます。但し、当該命令、要求又は要請があった場合、速やかにその旨を当社に通知しなければなりません。
4. 登録ユーザーは、秘密情報を記載した文書又は磁気記録媒体等を複製する場合には、事前に当社の書面による承諾を得ることとし、複製物の管理については第2項に準じて厳重に行うものとします。
5. 登録ユーザーは、当社から求められた場合にはいつでも、遅滞なく、当社の指示に従い、秘密情報並びに秘密情報を記載又は包含した書面その他の記録媒体物及びその全ての複製物を返却又は廃棄しなければなりません。

第16条 有効期間
利用契約は、登録ユーザーについて第3条に基づく登録が完了した日に効力を生じ、
当該登録ユーザーの登録が取り消された日又は本サービスの提供が終了した日のいずれか早い日まで、当社と登録ユーザーとの間で有効に存続するものとします。

第17条 本規約等の変更
1. 当社は、本サービスの内容を自由に変更できるものとします。
2. 当社は、本規約（当社ウェブサイトに掲載する本サービスに関するルール、諸規定等を含みます。以下本項において同じ。）を変更できるものとします。当社は、本規約を変更した場合には、登録ユーザーに当該変更内容を通知するものとし、当該変更内容の通知後、登録ユーザーが本サービスを利用した場合又は当社の定める期間内に登録取消の手続をとらなかった場合には、登録ユーザーは、本規約の変更に同意したものとみなします。

第18条 連絡/通知
本サービスに関する問い合わせその他登録ユーザーから当社に対する連絡又は通知、及び本規約の変更に関する通知その他当社から登録ユーザーに対する連絡又は通知は、当社の定める方法で行うものとします。

第19条 本規約の譲渡等
1. 登録ユーザーは、当社の書面による事前の承諾なく、利用契約上の地位又は本規約に基づく権利若しくは義務につき、第三者に対し、譲渡、移転、担保設定、その他の処分をすることはできません。
2. 当社は本サービスにかかる事業を他社に譲渡した場合には、当該事業譲渡に伴い利用契約上の地位、本規約に基づく権利及び義務並びに登録ユーザーの登録情報その他の顧客情報を当該事業譲渡の譲受人に譲渡することができるものとし、登録ユーザーは、かかる譲渡につき本項において予め同意したものとします。なお、本項に定める事業譲渡には、通常の事業譲渡のみならず、会社分割その他事業が移転するあらゆる場合を含むものとします。

第20条 完全合意
本規約は、本規約に含まれる事項に関する当社と登録ユーザーとの完全な合意を構成し、口頭又は書面を問わず、本規約に含まれる事項に関する当社と登録ユーザーとの事前の合意、表明及び了解に優先します。

第21条 分離可能性
本規約のいずれかの条項又はその一部が、消費者契約法その他の法令等により無効又は執行不能と判断された場合であっても、本規約の残りの規定及び一部が無効又は執行不能と判断された規定の残りの部分は、継続して完全に効力を有し、当社及び登録ユーザーは、当該無効若しくは執行不能の条項又は部分を適法とし、執行力を持たせるために必要な範囲で修正し、当該無効若しくは執行不能な条項又は部分の趣旨並びに法律的及び経済的に同等の効果を確保できるように努めるものとします。

第22条 存続規定
第6条（未払がある場合に限ります。）、第7条第2項、第8条第3項、第9条から第11条まで、第12条第2項、第5項及び第6項、第13条から第15条まで、並びに第19条から第23条までの規定は利用契約の終了後も有効に存続するものとします。

第23条 準拠法及び管轄裁判所
本規約の準拠法は日本法とし、本規約に起因し又は関連する一切の紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。

第24条 協議解決
当社及び登録ユーザーは、本規約に定めのない事項又は本規約の解釈に疑義が生じた場合には、互いに信義誠実の原則に従って協議の上速やかに解決を図るものとします。
`

const TermsPage: NextPage = () => {
  return (
    <App>
      <div style={{ whiteSpace: 'pre-wrap' }}>
        {term}
      </div>
    </App>
  )
}

export default TermsPage
