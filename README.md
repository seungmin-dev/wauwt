## 👕오늘 뭐 입었어?👖

📍 <b>DEMO</b> - <a href="https://wauwt.vercel.app/" target="_blank">https://wauwt.vercel.app/</a><br/><br/>
지금 내가 있는 현 위치에서 2km 반경에 있는 사람들과 얘기를 나눠봐요!<br/>
오늘같은 날씨에 내 이웃주민들은 어떤 옷을 입고 나갔을까요?

<p align="center">
<img width="600" alt="스크린샷 2023-05-26 오후 12 13 11" src="https://github.com/seungmin-dev/wauwt/assets/67530394/376a61c6-00f5-4cda-8f2e-735020419d0e">
</p>

### 🔧 기능 설명

#### 거리 제한
✅ 내 위치에서 약 1.5km 반경 내의 유저들과 정보를 주고 받습니다

#### 날씨
✅ weather openmap api를 사용해 실시간 날씨를 알 수 있습니다

#### 메세징
✅ 200자 이하의 메세지로 정보를 주고 받아요<br/>
✅ 메세지는 3일 뒤에 모두 삭제됩니다<br/>
✅ 부적절한 메세지들은 유저들이 신고할 수 있습니다<br/>

#### 익명
✅ firebase를 연계하여 익명 로그인 기능으로 이용이 가능합니다<br/>
✅ 익명 아이디가 같은 경우 글 삭제가 가능합니다

<br/><br/>
### 🖥 화면 설명

<div>
  <img width="500" alt="스크린샷 2023-05-26 오전 11 32 08" src="https://github.com/seungmin-dev/wauwt/assets/67530394/f4b99e69-9746-4b73-9c30-595077c93b35">
  <img width="500" alt="스크린샷 2023-05-26 오전 11 43 09" src="https://github.com/seungmin-dev/wauwt/assets/67530394/8243b7a2-b78a-4118-a140-7e4d67dc0a04">
</div>

사이트에 진입하면 위치에 기반한 날씨정보를 받아오기 위해 잠시 로딩화면이 보입니다<br/><br/>
  
<div style="display: flex; align-items: center; justify-content: space-around">
  <img width="330" alt="스크린샷 2023-05-26 오전 11 46 55" src="https://github.com/seungmin-dev/wauwt/assets/67530394/a0a3e075-2bcb-43e1-af2e-0d7562d2b65b">
  <img width="330" alt="스크린샷 2023-05-26 오전 11 56 30" src="https://github.com/seungmin-dev/wauwt/assets/67530394/234e3aef-1d04-4671-9d1b-21a051500b3c">
  <img width="330" alt="스크린샷 2023-05-26 오전 11 48 24" src="https://github.com/seungmin-dev/wauwt/assets/67530394/91b7076f-f510-4089-a338-9c04eb040d03">
</div><br/>

익명로그인 버튼을 눌러 익명로그인 후 글쓰기 버튼이 노출되면 글쓰기를 할 수 있습니다<br/><br/>
  
<div>
  <img width="500" alt="스크린샷 2023-05-26 오후 12 00 50" src="https://github.com/seungmin-dev/wauwt/assets/67530394/b1571a52-9591-4e9d-af22-7cb09e850f59">
  <img width="500" alt="스크린샷 2023-05-26 오전 11 32 49" src="https://github.com/seungmin-dev/wauwt/assets/67530394/d6eca5b4-bc12-4528-af06-75b23f1ad1b3">
</div>

200자 제한을 뒀고 작성 후 알려주기 버튼을 누르면 저장됩니다.
<br/><br/>
  
<div>
  <img width="500" alt="스크린샷 2023-05-26 오전 11 32 52" src="https://github.com/seungmin-dev/wauwt/assets/67530394/7c7eaaf7-9f88-45b0-84b0-2e0da589f74c">
  <img width="500" alt="스크린샷 2023-05-26 오전 11 32 55" src="https://github.com/seungmin-dev/wauwt/assets/67530394/8d44511b-82a9-4b07-8fe4-555dcd670f0c">
</div>

현재 로그인 정보와 같은 익명 아이디로 저장된 글은 푸른색 배경으로 표시됩니다. 마찬가지로 같은 아이디로 저장된 글은 삭제가 가능합니다.  
<br/><br/>
  
<div>
  <img width="500" alt="스크린샷 2023-05-26 오전 11 33 30" src="https://github.com/seungmin-dev/wauwt/assets/67530394/5657d332-734d-477b-bcb3-6a50d1f8f4b2">
  <img width="500" alt="스크린샷 2023-05-26 오전 11 33 33" src="https://github.com/seungmin-dev/wauwt/assets/67530394/f5ccb8ab-0601-4d16-ace6-808c890113e0">
</div>

타인의 글은 흰 배경으로 보이고, 신고버튼이 노출됩니다.
<br/><br/>

<p align="center">
  <img width="350" alt="스크린샷 2023-05-26 오후 12 10 27" src="https://github.com/seungmin-dev/wauwt/assets/67530394/5d646ec3-8d9c-4089-806b-476bbc28b96b">
</p>
적절하지 못한 글에 대해 신고를 하게 되면, 누적신고가 3회 이상일 시 글 내용이 가려집니다.

